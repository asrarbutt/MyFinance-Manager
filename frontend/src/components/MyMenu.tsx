import {Box, Button, Container} from "@mui/material";
import {styled} from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTransaction from "./AddTransaction";


const StyleAddCircleIcon = styled(AddCircleIcon)`
font-size:5rem;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #3B9AE1 70%, #FF8E53 99%);
  border-radius: 2px;
  border: 0;
  border-radius:230px;
  color: white;
  height: 5rem;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
  margin:3px;
  font-size: 1rem;
 `;


export default function MyMenu() {



    return (
        <Box sx={{mt: 1, padding: '1rem'}}>
            <Container sx={{display: 'flex'}}>
                <Box>
                    <StyledButton>Transaktion</StyledButton>
                    <StyledButton>Statistik</StyledButton>
                    <StyledButton>Einkommen</StyledButton>
                    <StyledButton>Ausgaben</StyledButton>
                </Box>
                <Button>


                </Button>
                <AddTransaction/>
            </Container>
        </Box>
    )
}
