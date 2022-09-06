import PieChart from "../components/PieChart";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Statistic.css"
import {useContext, useState} from "react";
import TransactionContext from "../context/transaction/TransactionContext";

export default function Statistic() {


    const {allTransaction} = useContext(TransactionContext);
    const category = ["Miete", "Strom/Gas", "Essen"];
    const [transactionsType, setTransactionsType] = useState<string>("");


    return (
        <div className="statistic">
            <header>
                <h1>Ein- und Ausgabebericht</h1>
            </header>

            <section>
                <div className="statistic-selection">

                    <Box sx={{minWidth: 120, mr: '1rem'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Art</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={transactionsType}
                                label="Art"
                                onChange={(e) => setTransactionsType(e.target.value)}


                            >
                                <MenuItem value={"einkommen"}>Einkommen</MenuItem>
                                <MenuItem value={"ausgabe"}>Ausgabe</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>

                </div>

                <div className="statistic-charts">
                    <div className="statistic-pieChart">
                        <PieChart allTransactions={allTransaction} categoryType={category}
                                  incomeType={transactionsType}/>
                    </div>

                    <div>
                        <h1>11</h1>
                    </div>

                </div>

            </section>


        </div>
    )
}
