import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";

export class RetirementAccount extends Account {
    planType: string; // e.g., "401k", "IRA", "Roth IRA"

    constructor(params: BaseAccountParams & { planType: string }) {
        super({ ...params, accountType: AccountType.Retirement });
        this.planType = params.planType;
    }

    /**
     * Calculates current retirement account balance
     * @param txStore Transaction store
     * @returns Current account balance
     */
    calculateRetirementBalance(txStore: TransactionStore): number {
        return this.calculateBalance(this.getTransactionIds(), txStore);
    }
}
