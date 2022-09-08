import {Box, Button} from "@mui/material";
import AddTransaction from "./AddTransaction";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

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
