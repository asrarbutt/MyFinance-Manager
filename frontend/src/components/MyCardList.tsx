import MyCard from "./MyCard";
import {useContext, useState} from "react";
import TransactionContext from "../context/transaction/TransactionContext";
import TransactionsContainerStyled from "./ui/TransactionsContainer.styled";
import TitleStyled from "./ui/Title.styled";
import {MenuButton} from "./ui/Button.styled";
import AddTransaction from "./AddTransaction";
import {useNavigate} from "react-router-dom";
import ShowIncomeExpanse from "./ShowIncomeExpanse";
import {CardContainerStyled, MyMenuButtonContainerStyled} from "./ui/CommonContainer.styled";


type MyCardListProps = {
    sumOfIncome: number,
    sumOfExpanse: number
}

export default function MyCardList(props: MyCardListProps) {

    const {deleteTransaction, allTransactions} = useContext(TransactionContext);
    const navigate = useNavigate();
    const [isIncome, setIsIncome] = useState<boolean>();

    return (
        <TransactionsContainerStyled>
            <MyMenuButtonContainerStyled>

                <div>
                    <MenuButton
                        variant={"myMenuBtn"}
                        onClick={() => setIsIncome(undefined)}
                    >
                        Transaktion
                    </MenuButton>
                    <MenuButton
                        variant={"myMenuBtn"}

                        onClick={() => navigate("/users/statistic")}
                    >
                        Statistik
                    </MenuButton>
                    <MenuButton
                        variant={"myMenuBtn"}
                        onClick={() => setIsIncome(true)}
                    >
                        Einkommen
                    </MenuButton>
                    <MenuButton
                        variant={"myMenuBtn"}
                        onClick={() => setIsIncome(false)}
                    >
                        Ausgaben
                    </MenuButton>
                    <MenuButton
                        variant={"myMenuBtn"}
                        onClick={() => navigate("/users/images")}
                    >
                        Images
                    </MenuButton>
                </div>

                <AddTransaction/>
            </MyMenuButtonContainerStyled>

            <div><ShowIncomeExpanse
                sumOfIncome={props.sumOfIncome}
                sumOfExpanse={props.sumOfExpanse}
            />
            </div>

            <TitleStyled>
                {isIncome === undefined ?
                    ("Alle Transaktionen")
                    :
                    isIncome ?
                        "Alle Einnahmen"
                        :
                        "Alle Ausgaben"
                }
            </TitleStyled>
            <CardContainerStyled>
                {
                    allTransactions.length !== 0 ? (
                        allTransactions
                            .filter(t => {
                                if (isIncome === undefined) {
                                    return t;
                                }
                                if (isIncome) {
                                    return t.isIncome;
                                }
                                if (!isIncome) {
                                    return !t.isIncome
                                }
                                return false;

                            })
                            .map(t =>
                                <MyCard key={t.id} allTransaction={t} deleteTransaction={deleteTransaction}/>
                            )
                    ) : (<p>Keine Transaktion vorhanden</p>)
                }
            </CardContainerStyled>
        </TransactionsContainerStyled>
    );
}
