import { Account, BaseAccountParams } from "./Account";
import { AccountType } from "./AccountType";
/**
 * Checking Account subclass 
 * 
 * - No interest rate 
 * - No limit to transactions
 * - Can overdraft 
 */
export class CheckingAcccount extends Account {
    overdraftLimit?: number; /** Limit on amount of money you can overdraft from account*/

    constructor(params: BaseAccountParams & { overdraftLimit?: number }) {
        super({ ...params, accountType: AccountType.Checking });
        this.overdraftLimit = params.overdraftLimit;
    }
}

