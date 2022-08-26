import MyCard from "./MyCard";
import {Box} from "@mui/system";
import {useContext, useEffect} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import {toast} from "react-toastify";

export default function MyCardList() {

    const {getAllTransactions} = useContext(TransactionContext);


    useEffect(() => {

        getAllTransactions()
            .catch(error => {

                toast.error(error.message)

            });

    }, [])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <MyCard/>


        </Box>

    );


}