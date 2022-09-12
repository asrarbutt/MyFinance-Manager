import {MenuButton, StlyeEditIcon} from "./ui/Button.styled";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {convertDateToNumber, stringToNumberWithDot} from "../util/Util";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DialogActions from "@mui/material/DialogActions";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import TransactionCreationDto from "../model/TransactionCreationDto";
import axios from "axios";
import {toast} from "react-toastify";
import TransactionDto from "../model/TransactionDto";

type UpdateTransactionProps = {
    formType: string,
    selectTransaction?: TransactionDto;
}

export default function Form(props: UpdateTransactionProps) {

    const {getAllTransactions} = useContext(TransactionContext);
    const [isIncome, setIsIncome] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [category, setCategory] = useState<string>("");
    const [pictureId, setPictureId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [newTransactionToAdd, setNewTransactionToAdd] = useState<TransactionCreationDto>();

    useEffect(() => {
        setNewTransactionToAdd({
            "description": description,
            "amount": amount,
            "category": category,
            "transactionDate": convertDateToNumber(date),
            "isIncome": isIncome,
            "pictureId": pictureId,
        });

    }, [date, description, amount, isIncome, pictureId, category])

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (newTransactionToAdd)
            addTransaction(newTransactionToAdd);
    }

    const addTransaction = (newTransaction: TransactionCreationDto) => {

        return axios.post("/api/transactions", newTransaction)
            .then(response => response.data)
            .then(getAllTransactions)
            .then(() => {
                toast.success("Transaktion hinzugefügt");
                setIsIncome(true);
                setDate(null);
                setCategory("");
                setDescription("");
                setAmount(0);
            })
            .catch(error => toast(error));
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            {props.formType === "AddTransaction" ? (
                <MenuButton variant="addBtn" onClick={handleClickOpen}>
                    <StlyeEditIcon/>
                </MenuButton>
            ) : (

                <Button onClick={handleClickOpen}>
                    <StlyeEditIcon/>
                </Button>

            )}


            <Dialog maxWidth={"xl"} open={open} onClose={handleClose}>
                <DialogTitle>Neue Transaktion erstellen</DialogTitle>
                <DialogContent>
                    <form onSubmit={submitHandler}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "30rem",
                            alignItems: "space-between",
                            marginTop: 6,
                            marginBottom: 7,
                            width: '70vmin'
                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="standard-basic"
                                label="Beschreibung"
                                onChange={e => setDescription(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="standard-basic"
                                label="Betrag"
                                onChange={e => setAmount(stringToNumberWithDot(e.target.value))}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Datum auswählen"
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField
                                        {...params} />}
                                />
                            </LocalizationProvider>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Kategorie auswählen</InputLabel>
                                <Select
                                    labelId="category-select"
                                    id="category-select"
                                    value={category}
                                    label="Kategorie auswählen "
                                    onChange={e => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"Essen"}>Essen</MenuItem>
                                    <MenuItem value={"Miete"}>Miete</MenuItem>
                                    <MenuItem value={"Strom/Gas"}>Strom/Gas</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Transaktionsart</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isIncome}
                                    label="Kategorie auswählen "

                                    onChange={(e: any) => {
                                        setIsIncome(e.target.value)
                                    }}
                                >
                                    <MenuItem value={true as any}>Einkommen</MenuItem>
                                    <MenuItem value={false as any}>Ausgabe</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                component="label"
                                color="secondary">
                                {" "}
                                <AddAPhotoIcon/> Bild Uploaden
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files !== null) {
                                            setPictureId(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} hidden/>
                            </Button>
                            <DialogActions>
                                <Button color='warning' variant="contained" onClick={handleClose}>Abbrechen</Button>
                                <Button variant='contained' color="success" type="submit"
                                        onClick={handleClose}>Hinzufügen</Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )

}