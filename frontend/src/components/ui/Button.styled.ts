import styled, {css} from 'styled-components';

const ButtonStyled = styled.button<{ variant: string }>`
  border-radius: 20px;
  background: none;

  &:hover {
    box-shadow: 2px 2px 5px #282c34;
    cursor: pointer;
  }

  &:focus {
    background: var(--MenuButtonHoverColor);
    color: var(--FontColor);
  }

  ${({variant}) =>
    variant === "myMenuBtn" &&
    css`
            border: 1px solid #e5b16f;
            background: #c6c6d9;
            padding: 1rem;
            width: 10rem;
            font-weight: bold;`
  };
  ${({variant}) =>
    variant === "home" &&
    css`
            background: var(--MenuButtonColor);
            color: Black;
            box-shadow: 0 3px 5px 2px rgba(182, 31, 61, 0.3);
            font-size: 1rem;
            padding: 0.8rem;`
  };

  ${({variant}) =>
    variant === "addBtn" &&
    css`
            border: 1px solid #e5b16f;
            height: 4rem;
            width: 8rem;
            font-weight: bold;`
  };

  ${({variant}) =>
    variant === "login" &&
    css`
            background: linear-gradient(to right, #795303 0%, #03217b 79%);
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            width: 30%;
            height: 3rem;
            border: none;
            color: var(--FontColor);
            border-radius: 2rem;
            cursor: pointer;
            margin-top: 1rem;`
  };
`;
export default ButtonStyled;

export const MenuButton = styled(ButtonStyled)`
  background: var(--MenuButtonColor);
  color: Black;
  box-shadow: 0 3px 5px 2px rgba(182, 31, 61, 0.3);
  margin: 4px;
  font-size: 1.2rem;`
;
