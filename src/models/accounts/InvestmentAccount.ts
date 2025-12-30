//import { TransactionStore } from "models/transactions/TransactionStore";
import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";


export interface Holding {
    symbol: string;
    quantity: number;
    marketPrice: number;
}

export class InvestmentAccount extends Account {
    holdings?: Holding[] = [];
    constructor(params: BaseAccountParams & { holdings?: Holding[] }) {
        super({ ...params, accountType: AccountType.Investment });
        this.holdings = params.holdings;
    }


    //TODO: add calcInvestmentWorth
}