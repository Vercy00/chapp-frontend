import { StyledPath, StyledSpinner } from "./Styles";

const Spinner = () => (
  <StyledSpinner
    width="65px"
    height="65px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledPath
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx={33}
      cy={33}
      r={30}
    />
  </StyledSpinner>
);

export default Spinner;
