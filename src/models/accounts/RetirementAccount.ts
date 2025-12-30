import { InvestmentAccount } from "./InvestmentAccount";
import { AccountType } from "./AccountType";

export class RetirementAccount extends InvestmentAccount {
    accountType = AccountType.Retirement;
    taxAdvantaged = true;
    contributionLimit?: number;

    supportsStatements(): boolean {
        return true;
    }
}
