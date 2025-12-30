import { Transaction } from "./Transaction";

/***
 * 
 * Single source of truth for all transactions regardless of account.
 * using mapping for reduce query times. 
 */
export class TransactionStore {
    private readonly transactions = new Map<string, Transaction>(); //transactions[var] --> does not change but content can

    //Add a transaction to the map
    add(tx: Transaction): void {
        this.transactions.set(tx.id, tx);
    }

    //get a transaction from map if provided its id
    get(id: string): Transaction | undefined {
        return this.transactions.get(id);
    }

    //get various transactions using their ids 
    getMany(ids: readonly string[]): Transaction[] {
        return ids
            .map(id => this.transactions.get(id))
            .filter((tx): tx is Transaction => tx !== undefined);
    }






}