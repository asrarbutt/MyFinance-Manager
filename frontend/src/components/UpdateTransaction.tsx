import React, {FormEvent, useContext, useEffect, useState} from 'react';
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
import TransactionCreationDto from "../model/TransactionCreationDto";
import {convertDateToNumber, incomeExpanseList, stringToNumberWithDot} from "../util/Util";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import TransactionDto from "../model/TransactionDto";
import axios from "axios";
import {toast} from "react-toastify";
import TransactionContext from "../context/transaction/TransactionContext";
import {EditIconStyled} from './ui/Icons.styled';

type UpdateTransactionProps = {
    allTransactions: TransactionDto;
}

export default function UpdateTransaction(props: UpdateTransactionProps) {

    const {getAllTransactions} = useContext(TransactionContext);
    const [isIncome, setIsIncome] = useState<boolean>(props.allTransactions.isIncome || true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date(props.allTransactions.transactionDate || ""));
    const [category, setCategory] = useState<string>(props.allTransactions.category || "");
    const [pictureId, setPictureId] = useState<string>(props.allTransactions.pictureId || "");
    const [description, setDescription] = useState<string>(props.allTransactions.description || "");
    const [amount, setAmount] = useState<number>(props.allTransactions.amount || 0);
    const [transactionToUpdate, setTransactionToUpdate] = useState<TransactionCreationDto>();

    useEffect(() => {
        setTransactionToUpdate({
                "description": description,
                "amount": amount,
                "category": category,
                "transactionDate": convertDateToNumber(date),
                "isIncome": isIncome,
                "pictureId": pictureId,
            }
        )
    }, [date, description, amount, isIncome, pictureId, category])

    if (!props.allTransactions) {
        return <p>Nicht Gefunden</p>
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (transactionToUpdate)
            updateTransaction(transactionToUpdate, props.allTransactions.id)

    }

    const updateTransaction = (editTransaction: TransactionCreationDto, id: string) => {
        axios.put(`/api/transactions/${id}`, editTransaction).then(() => {
            toast.success("Transaction updated");
            getAllTransactions();
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <EditIconStyled/>
            </Button>
            <Dialog maxWidth={"xl"} open={open} onClose={handleClose}>
                <DialogTitle>Update Transaktion</DialogTitle>
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
                            width: "70vmin"

                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="standard-basic"
                                label="Beschreibung"
                                name={"description"}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="standard-basic"
                                label="Betrag"
                                name={"amount"}
                                value={amount}
                                onChange={e => setAmount(stringToNumberWithDot(e.target.value))}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
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
                                    name={"category"}
                                    label="Kategorie auswählen "
                                    value={category}
                                    onChange={e => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    {incomeExpanseList.map((c) => (
                                        <MenuItem
                                            value={c}
                                            key={c}
                                        >
                                            {c}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Transaktionsart</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={isIncome}
                                    name={"income"}
                                    label="Type auswählen"
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
                                color="primary">
                                {" "}
                                <AddAPhotoIcon/> Bild Uploaden
                                <input
                                    type="file"
                                    name={"pictureId"}
                                    onChange={(e) => {
                                        if (e.target.files !== null) {
                                            setPictureId(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} hidden/>
                            </Button>
                            <DialogActions>
                                <Button
                                    color="warning"
                                    variant="contained"
                                    onClick={handleClose}
                                >Zurück
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    onClick={handleClose}
                                >Updaten
                                </Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
