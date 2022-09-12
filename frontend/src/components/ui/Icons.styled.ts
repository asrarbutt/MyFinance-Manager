import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeIcon from '@mui/icons-material/Mode';

export const AddIconStyled = styled(AddIcon)`
  border-radius: 2.5px;
  background: none;
  font-weight: bold;
`;

export const DeleteIconStyled = styled(DeleteForeverIcon)`
  font-size: 2rem;
`;

export const EditIconStyled = styled(ModeIcon)`
  font-size: 2rem;
  background: none;
  border-radius: 2.5px;
  font-weight: bold;
`;
