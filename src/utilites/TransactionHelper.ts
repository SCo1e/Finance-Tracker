import { Transaction } from "../models/transactions/Transaction";

/**function to find a transaction given its id.*/
export function getTransactionById(transactions: Transaction[], id: string): Transaction | undefined {
    return transactions.find(tx => tx.transactionId === id);
}