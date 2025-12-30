import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";


export class LoanAccount extends Account {
    interestRate: number; // Annual interest rate
    termMonths: number;   // Loan term in months
    principal: number;    // Original loan principal amount

    constructor(params: BaseAccountParams & { interestRate: number; termMonths: number; principal: number }) {
        super({ ...params, accountType: AccountType.Loan });
        this.interestRate = params.interestRate;
        this.termMonths = params.termMonths;
        this.principal = params.principal;
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

    /**
     * Calculates monthly payment based on principal, interest rate, and term
     * @returns Monthly payment amount
     */
    calculateMonthlyPayment(): number {
        const monthlyRate = this.interestRate / 100 / 12;
        return (this.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -this.termMonths));
    }
}