import { Account } from "./Account";
import { AccountType } from "./AccountType";

export interface Holding {
    symbol: string;
    quantity: number;
    marketPrice: number;
}
export class InvestmentAccount extends Account {
    accountType = AccountType.Investment;
    holdings: Holding[] = [];

    supportsInterest(): boolean { return false; }

    calculateBalance(): number {
        this.balance = this.holdings.reduce(
            (sum, h) => sum + h.quantity * h.marketPrice,
            0
        );
        this.balanceAsOf = new Date();
        return this.balance;
    }

}