import {Box, Button, Container} from "@mui/material";
import {styled} from "@mui/system";

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #3B9AE1 50%, #FF8E53 95%);
  border-radius: 2px;
  border: 0;
  border-radius:230px;
  color: white;
  height: 5rem;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .30);
  margin:3px
   
`;
export default function MyMenu() {

    return (
        <Box sx={{mt: 1, padding: '1rem'}}>
            <Container>
                <div>
                    <StyledButton>Statistik</StyledButton>
                    <StyledButton>Transaktion Hinzufügen</StyledButton>
                    <StyledButton>Einkommen</StyledButton>
                    <StyledButton>Ausgaben</StyledButton>
                </div>
            </Container>
        </Box>
    )
}


