import styled from "styled-components";

export const StyledLoginform = styled.div`
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
`;

export const StyledLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.9rem;
`;

export const StyledLabel = styled.label`
  font-weight: 600;
`;

export const StyledInput = styled.input`
  font-size: 1.5rem;
  border: none;
  border-radius: 0.3rem;
  padding: 0.3rem 0.6rem;
`;

export const StyledErrorText = styled.span`
  color: red;
  font-weight: 600;
  height: 1em;
`;

export const StyledButton = styled.button`
  background-color: var(--accent-color);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  color: #fff !important;
  transition: background-color 0.2s ease-out;
`;
