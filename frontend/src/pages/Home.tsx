import MyMenu from "../components/MyMenu";
import MyCardList from "../components/MyCardList";
import {Box} from "@mui/system";


export default function Home() {


    return (
        <>

            <h1>Home Page</h1>

            <MyMenu/>

            <Box>
                <MyCardList/>
            </Box>

        </>
    )
}
