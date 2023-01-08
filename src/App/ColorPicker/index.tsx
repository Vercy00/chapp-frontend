import {
  StyledButton,
  StyledColor,
  StyledColorList,
  StyledColorPicker,
  StyledPaletteIcon,
} from "./Styles";
import { useEffect, useRef, useState } from "react";

const colors = ["#5DD98F", "#EEA958", "#8FC35A", "#9162C0", "#C14949"];

const ColorPicker = () => {
  const [currColor, setCurrColor] = useState("#5DD98F");
  const [isActive, setActive] = useState(false);
  const handleChangeActive = () => setActive((cur) => !cur);

  useEffect(() => {
    document.body.style.setProperty("--accent-color", currColor);
  }, [currColor]);

  return (
    <StyledColorPicker>
      <StyledButton onClick={handleChangeActive}>
        <StyledPaletteIcon />
      </StyledButton>
      <StyledColorList active={isActive} colorCount={colors.length}>
        {colors.map((color, i) => (
          <StyledColor
            color={color}
            active={color === currColor}
            onClick={() => setCurrColor(color)}
            key={i}
          />
        ))}
      </StyledColorList>
    </StyledColorPicker>
  );
};

export default ColorPicker;
