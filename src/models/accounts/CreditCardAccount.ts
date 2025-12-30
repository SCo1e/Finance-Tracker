import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";

export class CreditCardAccount extends Account {
    creditLimit: number;
    apr?: number;
    dueDay?: number;

    constructor(params: BaseAccountParams & { creditLimit: number; apr?: number; dueDay?: number }) {
        super({ ...params, accountType: AccountType.CreditCard });
        this.creditLimit = params.creditLimit;
        this.apr = params.apr;
        this.dueDay = params.dueDay;
    }

    /**
     * Calculate the current credit utilization.
     * @param txStore Transaction store to calculate balance from transaction IDs
     * @returns utilization percentage (0-100)
     */
    calculateCreditUtilization(txStore: TransactionStore): number {
        const balance = this.calculateBalance(this.getTransactionIds(), txStore);
        return this.creditLimit > 0 ? (balance / this.creditLimit) * 100 : 0;
    }

    /**
     * Returns the ideal credit utilization amount (30% of credit limit)
     * @returns ideal utilization in currency units
     */
    showIdealUtilization(): number {
        return this.creditLimit * 0.3;
    }
}
