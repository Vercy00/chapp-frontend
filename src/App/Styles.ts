import styled, { css, keyframes } from "styled-components";

export const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAccentLeftRec = styled.div<{
  size: number;
  active?: boolean;
}>`
  width: ${(props) => props.size}vh;
  height: ${(props) => props.size}vh;
  position: absolute;
  rotate: 45deg;
  background-color: var(--accent-color);
  border-radius: 12px;
  left: 5%;
  transition: width 1.6s ease-in-out, height 1.6s ease-in-out,
    translate 1.6s ease-in-out, background-color 0.2s ease-out;

  @keyframes topLeftAnFull {
    50% {
      width: ${(props) => props.size - 10}vh;
      height: ${(props) => props.size - 10}vh;
      rotate: 135deg;
    }
    100% {
      width: ${(props) => props.size + 20}vh;
      height: ${(props) => props.size + 20}vh;
      rotate: 45deg;
      left: 30%;
    }
  }

  @keyframes topLeftAnSmall {
    50% {
      width: ${(props) => props.size - 20}vh;
      height: ${(props) => props.size - 20}vh;
      rotate: 135deg;
    }
    100% {
      width: ${(props) => props.size}vh;
      height: ${(props) => props.size}vh;
      rotate: 45deg;
      left: 0;
    }
  }

  ${(props) =>
    props.active && `animation: forwards 1.6s ease-in-out topLeftAnFull;`}

  @media only screen and (max-width: 600px) {
    ${(props) =>
      props.active && `animation: forwards 1.6s ease-in-out topLeftAnSmall;`}
  }
`;

export const StyledAccentRec = styled.div<{
  size: number;
  rotate: number;
  top?: number;
  bottom?: number;
  active?: boolean;
}>`
  width: ${(props) => props.size}vh;
  height: ${(props) => props.size}vh;
  position: absolute;
  rotate: ${(props) => props.rotate}deg;
  background-color: var(--accent-color);
  border-radius: 12px;
  right: 0;
  transition: width 1.6s ease-in-out, height 1.6s ease-in-out,
    translate 1.6s ease-in-out, background-color 0.2s ease-out;
  ${(props) =>
    props.top !== undefined &&
    css`
      @keyframes topRightAnFull {
        100% {
          height: ${props.size + 60}vh;
          width: ${props.size + 60}vh;
          translate: 55% -30%;
        }
      }

      @keyframes topRightAnSmall {
        100% {
          height: ${props.size + 20}vh;
          width: ${props.size + 20}vh;
          translate: 55% -30%;
        }
      }

      ${props.active && `animation: forwards 1.6s ease-in-out topRightAnFull;`}
      top: ${props.top}vh;
      translate: 55% -55%;

      @media only screen and (max-width: 600px) {
        ${props.active &&
        `animation: forwards 1.6s ease-in-out topRightAnSmall;`}
      }
    `}

  ${(props) =>
    props.bottom !== undefined &&
    css`
      @keyframes bottomRightAnFull {
        100% {
          height: ${props.size + 60}vh;
          width: ${props.size + 60}vh;
        }
      }

      @keyframes bottomRightAnSmall {
        100% {
          height: ${props.size + 20}vh;
          width: ${props.size + 20}vh;
        }
      }

      ${props.active &&
      `animation: forwards 1.6s ease-in-out bottomRightAnFull;`}
      bottom: ${props.bottom}vh;
      translate: 60% 55%;

      @media only screen and (max-width: 600px) {
        ${props.active &&
        `animation: forwards 1.6s ease-in-out bottomRightAnSmall;`}
      }
    `}
`;

const animateAccentUsernameFull = keyframes`
  50% {
    height: 400px;
  }
  100% {
    border-radius: 0 0 12px 0;
    bottom: 100%;
    height: 20px;
    translate: 0 100%;
  }
`;

const animateAccentUsernameSmall = keyframes`
  50% {
    height: 400px;
  }
  100% {
    border-radius: 0;
    bottom: 100%;
    height: 20px;
    translate: 0 100%;
  }
`;

const animateAccentUsernameTextFull = keyframes`
  100% {
    width: 250px;
    height: 70px;
  }
`;

const animateAccentUsernameTextSmall = keyframes`
  100% {
    width: 100%;
    height: 4.4rem;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.4);
  }
`;

const animeOpacity = keyframes`
  100% {
    opacity: 1;
  }
`;

export const StyledAccentUsername = styled.div<{ animate?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 20px;
  background-color: var(--accent-color);
  border-radius: 0 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  translate: 0 0;
  font-weight: 600;
  font-size: 2rem;
  padding: 1.5rem 4rem;
  z-index: 1;
  transition: background-color 0.2s ease-out;
  ${(props) =>
    props.animate &&
    css`
      animation: forwards 0.8s ease-in-out ${animateAccentUsernameFull},
        forwards 0.8s 0.8s ease-in-out ${animateAccentUsernameTextFull};
    `}

  @media only screen and (max-width: 600px) {
    ${(props) =>
      props.animate &&
      css`
        animation: forwards 0.8s ease-in-out ${animateAccentUsernameSmall},
          forwards 0.8s 0.8s ease-in-out ${animateAccentUsernameTextSmall};
      `}
  }

  & > span {
    color: #000;
    opacity: 0;
    ${(props) =>
      props.animate &&
      css`
        animation: forwards 1s 1s ease-in-out ${animeOpacity};
      `}
  }
`;

export const StyledMiddleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 450px;
  z-index: 2;
  height: 100%;

  @media only screen and (max-width: 600px) {
    width: 95vw;
  }
`;

export const StyledBgWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  background-color: var(--overlay-color);
  border-radius: ${(props) => (props.active ? "0.5rem 0.5rem 0 0" : "0.5rem")};
  min-height: 190px;
  ${(props) =>
    props.active
      ? css`
          height: calc(100% - 3.5rem);
        `
      : css`height 20%;
       margin-top: 0;`}
  transition: height 0.6s ease-out, border-radius 0.6s ease-out, margin-top 0.6s ease-out;
`;

export const StyledLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;
