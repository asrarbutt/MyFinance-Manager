import React, {FormEvent, useContext, useEffect, useRef, useState} from 'react';
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
import {toast} from "react-toastify";
import {convertDateToNumber, incomeExpanseList, stringToNumberWithDot} from "../util/Util";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import TransactionContext from "../context/transaction/TransactionContext";
import TransactionCreationDto from "../model/TransactionCreationDto";
import {MenuButton} from './ui/Button.styled';
import {AddIconStyled} from './ui/Icons.styled';

export default function AddTransaction() {

    const {getAllTransactions} = useContext(TransactionContext);
    const [isIncome, setIsIncome] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [category, setCategory] = useState<string>("");
    const [pictureId, setPictureId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [newTransactionToAdd, setNewTransactionToAdd] = useState<TransactionCreationDto>();
    const imageRef = useRef<any>();

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

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (newTransactionToAdd)
            await addTransaction(newTransactionToAdd);
    }

    const addTransaction = (newTransaction: TransactionCreationDto) => {

        const formData = new FormData();

        formData.append('TransactionCreationDto',
            new Blob([JSON.stringify(newTransaction)],
                {type: "application/json"}));

        formData.append("file", imageRef.current.files[0]);

        return axios.post("/api/transactions", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => response.data)
            .then(getAllTransactions)
            .then(() => {
                toast.success("Transaction added");
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
            <MenuButton
                variant="addBtn"
                onClick={handleClickOpen}>
                <AddIconStyled></AddIconStyled>
            </MenuButton>

            <Dialog
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}>
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
                            width: "70vmin"
                        }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="description"
                                name="description"
                                label="Beschreibung"
                                onChange={e => setDescription(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                variant="standard"
                                id="amount"
                                name="amount"
                                label="Betrag"
                                onChange={e => setAmount(stringToNumberWithDot(e.target.value))}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    inputFormat="dd/MM/yyyy"
                                    label="Datum ausw??hlen"
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                            <FormControl fullWidth>
                                <InputLabel id="category-select">Kategorie ausw??hlen</InputLabel>
                                <Select
                                    labelId="category-select"
                                    id="category-select"
                                    name="category"
                                    value={category}
                                    label="Kategorie ausw??hlen"
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
                                <InputLabel id="transaction-label">Transaktionsart</InputLabel>
                                <Select
                                    labelId="transaction-label"
                                    id="transaction"
                                    value={isIncome}
                                    label="Kategorie ausw??hlen"
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
                                <AddAPhotoIcon/>Bild Uploaden
                                <input
                                    type="file"
                                    ref={imageRef}
                                    onChange={(e) => {
                                        if (e.target.files !== null) {
                                            setPictureId(URL.createObjectURL(e.target.files[0]))
                                        }
                                    }} hidden
                                />
                            </Button>

                            <DialogActions>
                                <Button
                                    color="warning"
                                    variant="contained"
                                    onClick={handleClose}>Abbrechen
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                    onClick={handleClose}>Hinzuf??gen
                                </Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
