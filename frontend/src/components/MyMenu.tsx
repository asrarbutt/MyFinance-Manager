import {Box, Button, Container} from "@mui/material";


export default function MyMenu() {

    return (
        <Box sx={{mt: 1, padding: '1rem'}}>
            <Container>
                <div>

                    <Button>Statistik</Button>
                    <Button>Transaktion Hinzufügen</Button>
                    <Button>Einkommen</Button>
                    <Button>Ausgaben</Button>

                </div>

            </Container>


        </Box>
    )
}



