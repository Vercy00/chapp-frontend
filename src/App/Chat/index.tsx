import { useEffect, useRef, useState } from "react";
import {
  StyledChat,
  StyledMessage,
  StyledMessages,
  StyledMessAuthor,
  StyledMessContent,
  StyledMessDate,
  StyledMessHeader,
  StyledSendButton,
  StyledSendForm,
  StyledSendInput,
  StylePadWrapper,
} from "./Styles";
import sendIcon from "../../assets/send-icon.svg";
import {
  getMessages,
  MessagePage,
  webSocketConnect,
  webSocketSend,
} from "../../service/chat-service";
import { formatDateElapsed } from "../../util/time-util";

const Chat = () => {
  const [messages, setMessages] = useState<MessagePage>();
  const [time, setTime] = useState(new Date());
  const $messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessaged = async () => {
      const data = await getMessages(0);
      data.content = data.content.reverse();

      setMessages(data);
    };
    const interval = setInterval(() => setTime(new Date()), 5000);

    loadMessaged();
    webSocketConnect((message) =>
      setMessages((mess) => ({
        ...mess!,
        content: [...mess!.content, message],
      }))
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!$messageContainer.current) return;

    const scrollHeight = $messageContainer.current.scrollHeight;

    $messageContainer.current.scrollTo({
      behavior: "smooth",
      top: scrollHeight,
    });
  }, [messages]);

  const handleSend: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    webSocketSend((event.target as any).message.value);
    (event.target as any).message.value = "";
  };

  return (
    <StyledChat>
      <StyledMessages ref={$messageContainer}>
        {messages?.content.map((mess, i) => (
          <StyledMessage key={i}>
            <StyledMessHeader>
              <StyledMessAuthor>{mess.author}</StyledMessAuthor>
              <StyledMessDate>{formatDateElapsed(mess.sentAt)}</StyledMessDate>
            </StyledMessHeader>
            <StyledMessContent>{mess.message}</StyledMessContent>
          </StyledMessage>
        ))}
      </StyledMessages>
      <StylePadWrapper>
        <StyledSendForm onSubmit={handleSend} tabIndex={0}>
          <StyledSendInput
            name="message"
            placeholder="Napisz coś..."
            autoComplete="off"
          />
          <StyledSendButton type="submit">
            <img src={sendIcon} alt="" />
          </StyledSendButton>
        </StyledSendForm>
      </StylePadWrapper>
    </StyledChat>
  );
};

export default Chat;
