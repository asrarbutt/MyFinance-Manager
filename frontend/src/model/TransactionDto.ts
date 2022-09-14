export default interface TransactionDto {
    "id": string,
    "userEmail": string,
    "description": string,
    "amount": number,
    "category": string,
    "transactionDate": number | null,
    "isIncome": boolean,
    "pictureId": string,
}