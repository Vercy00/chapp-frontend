import { useState } from "react";
import { login } from "../service/chat-service";
import Chat from "./Chat";
import ColorPicker from "./ColorPicker";
import LoginForm from "./LoginForm";
import Spinner from "./Spinner";
import {
  StyledAccentLeftRec,
  StyledAccentRec,
  StyledAccentUsername,
  StyledApp,
  StyledBgWrapper,
  StyledLoading,
  StyledMiddleWrapper,
} from "./Styles";

const App = () => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("user") || '{ "username": "" }').username
  );
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (value: string) => {
    if (!value) return;

    try {
      setLoading(true);
      await login(value);
      setUsername(value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Ta nazwa jest już zajęta.");
      console.log(error);
    }
  };

  return (
    <StyledApp>
      <StyledMiddleWrapper>
        <ColorPicker />
        <StyledBgWrapper active={!!username}>
          {!!username ? (
            <Chat />
          ) : (
            <LoginForm onLogin={handleLogin} error={error} />
          )}
        </StyledBgWrapper>
      </StyledMiddleWrapper>

      <StyledAccentUsername animate={!!username}>
        <span>{username}</span>
      </StyledAccentUsername>

      <StyledAccentLeftRec size={30} active={!!username} />
      <StyledAccentRec size={50} rotate={45} top={0} active={!!username} />
      <StyledAccentRec size={30} rotate={45} bottom={20} active={!!username} />

      {isLoading && (
        <StyledLoading>
          <Spinner />
        </StyledLoading>
      )}
    </StyledApp>
  );
};

export default App;
