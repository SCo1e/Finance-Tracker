import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";

//TODO: add loan specific methods 


export class LoanAccount extends Account {
    interestRate: number; // Annual interest rate
    termMonths: number;   // Loan term in months
    principal: number;    // Original loan principal amount
    monthlyPayment: number; // monthly payment

    constructor(params: BaseAccountParams & { interestRate: number; termMonths: number; principal: number, monthlyPayment: number }) {
        super({ ...params, accountType: AccountType.Loan });
        this.interestRate = params.interestRate;
        this.termMonths = params.termMonths;
        this.principal = params.principal;
        this.monthlyPayment = params.monthlyPayment
    }

    /**
     * Calculates remaining loan balance based on transactions
     * @param txStore Transaction store
     * @returns Remaining principal balance
     */
    calculateRemainingBalance(txStore: TransactionStore): number {
        const paid = this.calculateBalance(this.getTransactionIds(), txStore);
        return Math.max(this.principal - paid, 0);
    }

}