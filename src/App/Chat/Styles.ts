import styled, { keyframes } from "styled-components";

const fadeInAnimation = keyframes`
  100% {
    opacity: 1;
  }
`;

export const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: forwards 0.4s 0.5s ${fadeInAnimation};
  padding: 0.5rem 1rem;
`;

export const StyledMessages = styled.div`
  width: 100%;
  height: 85%;
  overflow: auto;

  @media only screen and (min-width: 601px) {
    ::-webkit-scrollbar {
      width: 14px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
      border: 4px solid hsla(0, 0%, 18%, 100);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
`;

const formAnimation = keyframes`
  100% {
    margin-top: 0;
  }
`;

export const StylePadWrapper = styled.div`
  padding-top: 0.5rem;
  margin-top: 120px;
  animation: forwards 1.2s 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28)
    ${formAnimation};
`;

export const StyledSendForm = styled.form`
  position: relative;
  width: 100%;
  border: 2px solid var(--accent-color);
  border-radius: 0.6rem;
  padding: 0.6rem 0.6rem;
  display: flex;
  transition: background-color 0.2s ease-out;
`;

export const StyledSendInput = styled.input`
  font-size: 1.5rem;
  padding: 0.3rem 0.6rem;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
`;

export const StyledSendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: fit-content;
  width: fit-content;

  & > img {
    aspect-ratio: 1 / 1;
    height: 1.8rem;
  }
`;

export const StyledMessage = styled.div`
  padding: 0.4rem 0;
`;

export const StyledMessHeader = styled.div`
  opacity: 0.7;
  display: flex;
  align-items: baseline;
  gap: 0.4rem;

  & > * {
    color: var(--accent-color) !important;
    transition: background-color 0.2s ease-out;
  }
`;

export const StyledMessAuthor = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
`;

export const StyledMessDate = styled.span`
  font-size: 0.8rem;
`;

export const StyledMessContent = styled.div`
  font-weight: 600;
  word-break: break-all;
`;
