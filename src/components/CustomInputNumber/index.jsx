import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 8px;
`;

const Button = styled.button`
  cursor: pointer;
  position: relative;
  padding: 0;
  width: 48px;
  height: 48px;
  background-color: #fff;
  border-width: 1px;
  border-style: solid;
  border-color: #5faad3;
  border-radius: 4px;
  font-size: 0;

  &:focus,
  &:hover {
    border-color: #7ebbdb;
  }

  &:active {
    border-color: #4c88a8;
  }

  &:disabled,
  &[disabled] {
    pointer-events: none;
    filter: grayscale(1);
    opacity: 0.8;
  }
`;

const SubtractionButton = styled(Button)`
  &::after {
    content: "";
    display: block;
    width: 55%;
    height: 1px;
    background-color: #5faad3;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus,
  &:hover {
    &::after {
      background-color: #7ebbdb;
    }
  }

  &:active {
    &::after {
      background-color: #4c88a8;
    }
  }
`;

const AdditionButton = styled(Button)`
  &::before,
  &::after {
    content: "";
    display: block;
    width: 55%;
    height: 1px;
    background-color: #5faad3;
    position: absolute;
    left: 50%;
    top: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &::after {
    transform: translate(-50%, -50%);
  }

  &:focus,
  &:hover {
    &::before,
    &::after {
      background-color: #7ebbdb;
    }
  }

  &:active {
    &::before,
    &::after {
      background-color: #4c88a8;
    }
  }
`;

const Input = styled.input`
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #c7c7c7;
  border-radius: 4px;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:disabled,
  &[disabled] {
    background-color: field;
    pointer-events: none;
    filter: grayscale(1);
    opacity: 0.8;
  }
`;

function CustomInputNumber({
  min = 0,
  max,
  step = 1,
  name,
  value: propValue = 0,
  onChange: propOnChange = () => {},
  onBlur: propOnBlur = () => {},
  disabled: propDisabled = false,
}) {
  const [value, setValue] = useState(propValue);
  const isMounted = useRef(false);
  const inputRef = useRef();
  const intervalRef = useRef(null);

  const subtraction = useCallback(() => {
    setValue((v) => {
      let result = v - step;
      if (result < min) result = min;
      if (result > max) result = max;
      return result;
    });
  });

  const addition = useCallback(() => {
    setValue((v) => {
      let result = v + step;
      if (result < min) result = min;
      if (result > max) result = max;
      return result;
    });
  });

  const startEvent = (func) => {
    clearInterval(intervalRef.current);
    func();
    intervalRef.current = setInterval(func, 300);
  };

  const clearEvent = useCallback(() => {
    clearInterval(intervalRef.current);
  });

  const handleChange = (event) => {
    setValue(() => {
      let result = parseInt(event.target.value, 10);
      if (Number.isNaN(result)) result = propValue;
      if (result < min) result = min;
      if (result > max) result = max;
      return result;
    });
  };

  const handleBlur = (event) => {
    propOnBlur(event);
  };

  useEffect(() => {
    if (isMounted.current) {
      propOnChange({ target: inputRef.current });
    } else {
      isMounted.current = true;
    }
  }, [value]);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  useEffect(() => {
    if (value === min || value === max) clearEvent();
  }, [value, clearEvent]);

  return (
    <Container>
      <SubtractionButton
        onMouseDown={() => startEvent(subtraction)}
        onTouchStart={() => startEvent(subtraction)}
        onMouseUp={() => clearEvent()}
        onTouchEnd={() => clearEvent()}
        disabled={propDisabled || value === min}
      >
        -
      </SubtractionButton>
      <Input
        type="number"
        onKeyDown={(event) => (event.key === 'e' || event.key === '.') && event.preventDefault()}
        {...{
          min,
          max,
          step,
          name,
          value: Number(value).toString(),
          onChange: handleChange,
          onBlur: handleBlur,
          disabled: propDisabled,
          ref: inputRef,
        }}
      />
      <AdditionButton
        onMouseDown={() => startEvent(addition)}
        onTouchStart={() => startEvent(addition)}
        onMouseUp={() => clearEvent()}
        onTouchEnd={() => clearEvent()}
        disabled={propDisabled || value === max}
      >
        +
      </AdditionButton>
    </Container>
  );
}

export default CustomInputNumber;
