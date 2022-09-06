export default interface TransactionCreationDto {


    "description": string,
    "amount": number,
    "category": string,
    "transactionDate": number | null,
    "isIncome": boolean,
    "pictureId": string,
}
