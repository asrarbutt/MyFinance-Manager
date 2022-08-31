import React, {FormEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import TransactionData from "../model/TransactionData";
import {toast} from "react-toastify";

import {convertDateToNumber, stringToNumberWithDot} from "../util/Util";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";


type AddTransactionProps = {
    addTransaction: (userEmail: string, description: string, amount: number, category: string, transactionDate: number | null, isIncome: boolean, pictureId: string) => Promise<TransactionData>;
}

export default function AddTransaction(props: AddTransactionProps) {

    const [isIncome, setIsIncome] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [category, setCategory] = useState<string>("");
    const [pictureId, setPictureId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);


    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        props.addTransaction("asrar@gmailaaaaa.com", description, amount, category, convertDateToNumber(date), isIncome, pictureId).then(() => {
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
            <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon/> Transaktion
            </Button>
            <Dialog maxWidth={"xl"} open={open} onClose={handleClose}>
                <DialogTitle>Neue Transaktion erstellen</DialogTitle>

                <DialogContent>

                    <form onSubmit={submitHandler}>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "400px",
                            alignItems: "space-between",
                            marginTop: 6,
                            marginBottom: 7,
                            width: 900

                        }}>
                            <TextField id="standard-basic" onChange={e => setDescription(e.target.value)}
                                       label="Beschreibung"
                                       variant="standard"/>
                            <TextField id="standard-basic"
                                       onChange={e => setAmount(stringToNumberWithDot(e.target.value))} label="Betrag"
                                       variant="standard"/>

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

                                    onChange={e => {
                                        setIsIncome(e.target.value as any)

                                    }}
                                >
                                    <MenuItem value={true as any}>Einkommen</MenuItem>
                                    <MenuItem value={false as any}>Ausgabe</MenuItem>
                                </Select>

                            </FormControl>

                            <Button variant="contained" component="label" color="primary">
                                {" "}
                                <AddAPhotoIcon/> Bild hochladen
                                <input type="file" onChange={(e) => {

                                    if (e.target.files !== null) {

                                        setPictureId(URL.createObjectURL(e.target.files[0]))
                                        console.log(pictureId);
                                    }

                                }} hidden/>
                            </Button>
                            <DialogActions>
                                <Button color='warning' variant="contained" onClick={handleClose}>Abbrechen</Button>
                                <Button variant='contained' color="success" type="submit"
                                        onClick={handleClose}>Erstellen</Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    );
}
