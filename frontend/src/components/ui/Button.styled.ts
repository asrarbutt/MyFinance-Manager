import styled, {css} from 'styled-components';
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const ButtonStyled = styled.button<{ variant: string }>`
  border-radius: 2.5px;
  background: none;

  &:hover {
    box-shadow: 2px 2px 5px #282c34;
    cursor: pointer;
  }

  &:active {
    border-color: #cb1e28;
  }

  ${({variant}) =>
          variant === 'myMenuBtn' &&
          css`
            border: 1px solid #e5b16f;
            background: #c6c6d9;
            height: 2.5rem;
            width: 9rem;
            font-weight: bold;`
  };

  ${({variant}) =>
          variant === 'addBtn' &&
          css`
            border: 1px solid #e5b16f;
            height: 4rem;
            width: 8rem;
            font-weight: bold;
          `};

  ${({variant}) =>
          variant === 'login' &&
          css`
            background: linear-gradient(to right, #795303 0%, #03217b 79%);
            text-transform: uppercase;
            letter-spacing: 0.2rem;
            width: 65%;
            height: 3rem;
            border: none;
            color: white;
            border-radius: 2rem;
            cursor: pointer;
          `};
`;
export default ButtonStyled;


export const MenuButton = styled(ButtonStyled)`

  background: #f57b29;
  color: Black;
  box-shadow: 0 3px 5px 2px rgba(182, 31, 61, 0.3);
  margin: 4px;
  font-size: 1.2rem;
`;

export const AddIconStyled = styled(AddIcon)`
  border-radius: 2.5px;
  background: none;
  font-weight: bold;
`;

export const DeleteIconStyled = styled(DeleteForeverIcon)`

  font-size: 2rem;
`;
