import MyCard from "./MyCard";
import {Box} from "@mui/system";
import {useContext, useEffect} from "react";
import TransactionContext from "../context/transaction/TransactionContext";

export default function MyCardList() {

    const {getAllTransactions} = useContext(TransactionContext);


    useEffect(() => {
        getAllTransactions().then(data => console.log(data));
    }, [])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <MyCard/>


        </Box>

    );


}