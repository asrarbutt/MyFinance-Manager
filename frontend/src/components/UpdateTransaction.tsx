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
import {convertDateToNumber, stringToNumberWithDot} from "../util/Util";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import EditIcon from '@mui/icons-material/Edit';
import {styled} from "@mui/system";
import TransactionDto from "../model/TransactionDto";
import axios from "axios";
import {toast} from "react-toastify";
import TransactionContext from "../context/transaction/TransactionContext";


const StlyeEditIcon = styled(EditIcon)`

  font-size: 2rem;
 `;

type UpdateTransactionProps = {
    allTransaction: TransactionDto;
}

export default function UpdateTransaction(props: UpdateTransactionProps) {

    const {getAllTransactions} = useContext(TransactionContext);

    const [isIncome, setIsIncome] = useState<boolean>(props.allTransaction.isIncome || true);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [category, setCategory] = useState<string>(props.allTransaction.category || "");
    const [pictureId, setPictureId] = useState<string>(props.allTransaction.pictureId || "");
    const [description, setDescription] = useState<string>(props.allTransaction.description || "");
    const [amount, setAmount] = useState<number>(props.allTransaction.amount || 0);
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

    if (!props.allTransaction) {
        return <>Nicht Gefunden</>
    }


    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (transactionToUpdate)
            updateTransaction(transactionToUpdate, props.allTransaction.id)

    }

    const updateTransaction = (editTransaction: TransactionCreationDto, id: string) => {
        axios.put(`/transactions/update/${id}`, editTransaction).then(() => {
            toast.success("Transaktion erfolgreich geändert");
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
                <StlyeEditIcon/>
            </Button>
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
                            width: 500

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
                                    name={"income"}
                                    label="Type auswählen "

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
                                <input type="file"
                                       name={"pictureId"}
                                       onChange={(e) => {

                                           if (e.target.files !== null) {
                                               setPictureId(URL.createObjectURL(e.target.files[0]))
                                           }
                                       }} hidden/>
                            </Button>
                            <DialogActions>
                                <Button color='warning' variant="contained" onClick={handleClose}>Zurück</Button>
                                <Button variant='contained' color="success" type="submit"
                                        onClick={handleClose}>Updaten</Button>
                            </DialogActions>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
