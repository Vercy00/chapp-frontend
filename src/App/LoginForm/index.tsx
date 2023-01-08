import { FC, useState } from "react";
import {
  StyledButton,
  StyledErrorText,
  StyledInput,
  StyledLabel,
  StyledLabelWrapper,
  StyledLoginform,
} from "./Styles";

interface LoginFormProps {
  onLogin: (value: string) => any;
  error: string;
}

const LoginForm: FC<LoginFormProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = () => onLogin?.(username);

  return (
    <StyledLoginform>
      <StyledLabelWrapper>
        <StyledLabel htmlFor="username">Username</StyledLabel>
        <StyledInput
          name="username"
          id="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        {!!error && <StyledErrorText>{error}</StyledErrorText>}
      </StyledLabelWrapper>
      <StyledButton type="button" onClick={handleUsernameChange}>
        Przejdź dalej
      </StyledButton>
    </StyledLoginform>
  );
};

export default LoginForm;
