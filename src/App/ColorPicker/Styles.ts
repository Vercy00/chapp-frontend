import styled, { css, keyframes } from "styled-components";
import PalletteIcon from "../../assets/palette-icon";

export const StyledColorPicker = styled.div`
  width: 100%;
  height: 3.5rem;
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;

  @media only screen and (max-width: 600px) {
    margin-top: 0.4rem;
  }
`;

export const StyledButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  aspect-ratio: 1 / 1;
  background-color: var(--overlay-color);
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
`;

export const StyledPaletteIcon = styled(PalletteIcon)`
  & * {
    fill: var(--accent-color);
    transition: fill 0.2s ease-out;
  }
`;

const opacityAnimation = keyframes`
    100% {
        opacity: 1;
    }
`;

export const StyledColorList = styled.div<{
  active: boolean;
  colorCount: number;
}>`
  height: 3.5rem;
  background-color: var(--overlay-color);
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  opacity: ${(props) => (props.active ? "1" : "0")};
  width: ${(props) => (props.active ? `calc(100% - 4rem)` : "0px")};
  transition: width 0.2s ease-out;

  & > * {
    ${(props) =>
      props.active &&
      css`
        animation: forwards 0.2s 0.1s ${opacityAnimation} ease-out;
      `}
  }
`;

export const StyledColor = styled.button<{ color: string; active: boolean }>`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${(props) => props.color};
  border-radius: 0.5rem;
  padding: 3px;
  opacity: 0;
  ${(props) => props.active && `border: 3px solid #e4e4e4;`}
`;
