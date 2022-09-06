import {Box, Button} from "@mui/material";
import {styled} from "@mui/system";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTransaction from "./AddTransaction";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";


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
    const theme = useTheme();

    const navigate = useNavigate();


    return (
        <Box maxWidth={"xs"} sx={{
            margin: 1,
            padding: '1rem',
            display: 'flex',
            justifyContent: "space-between"
        }}>
            <Box>
                <Button sx={{background: theme.palette.linkButtonColor, color: theme.palette.linkButtonFontColor}}
                        variant="contained">Transaktion</Button>
                <Button sx={{background: theme.palette.linkButtonColor, color: theme.palette.linkButtonFontColor}}
                        variant="contained" onClick={() => navigate("/users/statistic")}>Statistik</Button>
                <Button sx={{background: theme.palette.linkButtonColor, color: theme.palette.linkButtonFontColor}}
                        variant="contained">Einkommen</Button>
                <Button sx={{background: theme.palette.linkButtonColor, color: theme.palette.linkButtonFontColor}}
                        variant="contained">Ausgaben</Button>
            </Box>
            <AddTransaction/>

        </Box>

    )
}
