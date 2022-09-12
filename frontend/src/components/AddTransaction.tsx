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
import {toast} from "react-toastify";
import {convertDateToNumber, incomeExpanseList, stringToNumberWithDot} from "../util/Util";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import TransactionContext from "../context/transaction/TransactionContext";
import TransactionCreationDto from "../model/TransactionCreationDto";
import {MenuButton} from './ui/Button.styled';
import {AddIconStyled} from './ui/Icons.styled';

export default function AddTransaction() {

    const {setAllTransactions, allTransactions} = useContext(TransactionContext);
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

        /* if (newTransactionToAdd)
             addTransaction(newTransactionToAdd);*/


        uploadImages(event.target as HTMLFormElement)


    }

    const uploadImages = (htmlForm: HTMLFormElement) => {
        const formData = new FormData(htmlForm);
        console.log(formData);

        formData.append('TransactionCreationDto', new Blob([JSON.stringify(newTransactionToAdd)], {
            type: "application/json"
        }));

        return axios.post("/api/transactions", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        ).then(data => data.data)
            .then(response => {
                toast.info("Bild wurde gespeichert")

                return response;
            }).then((respone) => console.log(respone))
            .catch(() => {
                    toast.warn("Bild konnte nicht auf die Cloud geladen werden.");
                    return [];
                }
            );
    }


    const addTransaction = (newTransaction: TransactionCreationDto) => {


        return axios.post("/api/transactions", newTransaction)
            .then(response => response.data)
            .then(data => {
                setAllTransactions([...allTransactions, data]);
            })
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
            <MenuButton variant="addBtn" onClick={handleClickOpen}>
                <AddIconStyled></AddIconStyled>
            </MenuButton>
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
                                    value={category}
                                    label="Kategorie auswählen "
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
                                    name="file"
                                    onChange={(e) => {
                                        if (e.target.files !== null) {
                                            setPictureId(e.target.value);


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
    );
}
