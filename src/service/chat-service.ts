import { CompatClient, Stomp } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";
import {
  decryptMessage,
  encryptMessage,
  keyToString,
  stringToKey,
} from "../util/encrypt-util";

export interface Message {
  id: number;
  message: string;
  author: string;
  sentAt: string;
}

export interface MessagePage {
  content: Message[];
  last: boolean;
}

interface LoginResponse {
  username: string;
  key: string;
  publicKey: string;
}

export const login = async (username: string) => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const response = await axios.post("https://api.chapp.pl/v1/login", {
    username,
    publicKey: await keyToString(keyPair.publicKey, "public"),
  });
  const data: LoginResponse = response.data;

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.username,
      key: data.key,
      publicKey: data.publicKey,
      privateKey: await keyToString(keyPair.privateKey, "private"),
    })
  );
};

export const getMessages: (page: number) => Promise<MessagePage> = async (
  page: number
) => {
  try {
    const reposnse = await axios.get("https://api.chapp.pl/v1/messages", {
      params: {
        page,
      },
      headers: {
        Key: JSON.parse(localStorage.getItem("user") || "").key,
      },
    });

    for (var i = 0; i < reposnse.data.content.length; i++) {
      reposnse.data.content[i].message = await decryptMessage(
        reposnse.data.content[i].message,
        await stringToKey(
          JSON.parse(localStorage.getItem("user") || "").privateKey,
          "private"
        )
      );
    }

    return reposnse.data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("user");
    location.reload();
  }
};

export const sendMessage = async (message: string) => {
  if (!message) return;

  const user = JSON.parse(localStorage.getItem("user") || "");

  if (!user) throw Error("Something went wrong.");

  const publicKey = await stringToKey(user.publicKey, "public");
  const encryptedMessage = await encryptMessage(message, publicKey);

  const response = await axios.post(
    "https://api.chapp.pl/v1/messages",
    {
      message: encryptedMessage,
    },
    {
      headers: {
        Key: JSON.parse(localStorage.getItem("user") || "").key,
      },
    }
  );
};

var client: CompatClient;

export const webSocketSend = async (message: string) => {
  if (!message) return;

  const user = JSON.parse(localStorage.getItem("user") || "");

  if (!user) throw Error("Something went wrong.");

  const publicKey = await stringToKey(user.publicKey, "public");
  const encryptedMessage = await encryptMessage(message, publicKey);

  client.send(
    "/app/chat",
    {} as any,
    JSON.stringify({
      message: encryptedMessage,
      key: JSON.parse(localStorage.getItem("user") || "").key,
    })
  );
};

export const webSocketConnect = (callback: (message: Message) => void) => {
  const socket = new SockJS("https://api.chapp.pl/chat");
  client = Stomp.over(socket);

  client.connect({}, () => {
    webSocketSend("!@#$%^&*())(*&^%$#@!");

    client.subscribe(
      `/user/${
        JSON.parse(localStorage.getItem("user") || "").key
      }/topic/messages`,
      async (e) => {
        const data: Message = JSON.parse(e.body);

        data.message = await decryptMessage(
          data.message,
          await stringToKey(
            JSON.parse(localStorage.getItem("user") || "").privateKey,
            "private"
          )
        );

        callback(data);
      }
    );
  });
};
