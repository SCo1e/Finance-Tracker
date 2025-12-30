
import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";

/**
 * Parameters required to create a base account.
 * Used internally by the abstract Account class and its subclasses.
 */
export type BaseAccountParams = {
    id: string;
    name: string;
    accountNumber: string;
    institution: string;
    currency?: string;
    notes?: string;
};

/**
 * Abstract parent class for all types of financial accounts.
 *
 * Description: 
 * Encapsulates shared identity, transaction tracking, balance calculation,
 * and recurring event linkage. Concrete account types (e.g., Checking,
 * Savings, Credit Card) should extend this class and implement any
 * subclass-specific behavior or fields.
 * 
 * --- Internally used properties
 * @property id: Unique id associated with account. [INTERNAL]
 * @property isActive: Indicates if the account should be acknowledged. [INTERNAL]
 * 
 * --- Information about the account
 * @property institution: Financial establishment where account resides.  
 * @property name: Name assigned to an account by user.
 * @property type: Type of account [Checking,Savings,Credit Card, etc ...]
 * @property currency: ISO code of the currency held within account 
 * @property accountNumber: Last x4 digits of an account number.  
 * @property notes: [OPTIONAL] User provided notes about account.
 * 
 * --- Info for the account 
 * @property transactionIds: List of ids referencing transactions associated with account.
 * @property recurringEventIds: List of ids referencing recurring events associated with account: income, expenses, transfers. 
 * 
 * -- Info derevied from account
 * @property balance: Balance of the account from transactions.
 * @property balanceAsOf: Date at which the balance was updated. 
 * 
 */
export abstract class Account {
    id: string;
    isActive: boolean = true;

    institution: string;
    name: string;
    type: AccountType;
    currency: string;
    accountNumber: string;
    notes?: string;

    transactionIds: string[] = [];
    recurringEventIds: string[] = [];

    balance: number = 0;
    balanceAsOf: Date = new Date();



    /**
     * Constructs a new Account instance.
     * 
     * @param params - Parameters to initialize the account
     * @throws Error if `accountNumber` is not exactly 4 digits
     */
    protected constructor(params: BaseAccountParams & { accountType: AccountType }) {
        this.id = crypto.randomUUID();
        this.name = params.name;
        this.type = params.accountType;
        this.institution = params.institution;
        this.notes = params.notes;
        this.currency = params.currency ?? "USD";

        // Validate account number format
        if (!/^\d{4}$/.test(params.accountNumber)) {
            throw new Error(
                `accountNumber must be exactly 4 digits. Received: ${params.accountNumber}`
            );
        }
        this.accountNumber = params.accountNumber;
    }

    /**
     * Calculates the current balance of the account by summing the amounts
     * of the provided transactions.
     * 
     * @param txIds - Array of transaction IDs to calculate balance for
     * @param txStore - Transaction store used to retrieve transaction objects
     * @returns Total balance as a number
     */
    calculateBalance(txIds: string[], txStore: TransactionStore): number {
        return txStore.getMany(txIds).reduce((sum, tx) => sum + tx.amount, 0);
    }

    /**
     * Adds a transaction ID to this account if it is not already included.
     * 
     * @param txId - Transaction ID to add
     */
    addTransactionId(txId: string): void {
        if (!this.transactionIds.includes(txId)) {
            this.transactionIds.push(txId);
        }
    }

    /**
     * Retrieves all transaction IDs associated with this account.
     * 
     * @returns Array of transaction IDs
     */
    getTransactionIds(): string[] {
        return [...this.transactionIds];
    }

    /**
     * Removes a transaction ID from the account's transaction list.
     * 
     * @param txId - Transaction ID to remove
     */
    removeTransactionId(txId: string): void {
        this.transactionIds = this.transactionIds.filter(id => id !== txId);
    }

    /**
     * Adds a recurring event ID to this account if it is not already included.
     * 
     * @param eventId - Recurring event ID to add
     */
    addRecurringEventId(eventId: string): void {
        if (!this.recurringEventIds.includes(eventId)) {
            this.recurringEventIds.push(eventId);
        }
    }

    /**
     * Retrieves all recurring event IDs associated with this account.
     * 
     * @returns Array of recurring event IDs
     */
    getRecurringEventIds(): string[] {
        return [...this.recurringEventIds];
    }

    /**
     * Removes a recurring event ID from the account's recurring event list.
     * 
     * @param eventId - Recurring event ID to remove
     */
    removeRecurringEventId(eventId: string): void {
        this.recurringEventIds = this.recurringEventIds.filter(id => id !== eventId);
    }
}
