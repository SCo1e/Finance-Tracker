import { AccountType } from "./AccountType";
import { TransactionStore } from "models/transactions/TransactionStore";

/**
 * Parameters required to create a base account.
 * Used internally by the abstract Account class and its subclasses.
 */
export type BaseAccountParams = {
    /** User-defined display name for the account */
    name: string;

    /** Last 4 digits of the account number (used as reference/display only) */
    accountNumber: string;

    /** Name of the financial institution (e.g., Bank of America, Fidelity) */
    institution: string;

    /** ISO currency code (e.g., "USD", "CAD"). Defaults to "USD" if omitted */
    currency?: string;

    /** Optional notes attached to the account */
    notes?: string;
};

/**
 * Abstract parent class for all types of financial accounts.
 *
 * Encapsulates shared identity, transaction tracking, balance calculation,
 * and recurring event linkage. Concrete account types (e.g., Checking,
 * Savings, Credit Card) should extend this class and implement any
 * subclass-specific behavior or fields.
 */
export abstract class Account {
    /** Institution where the account is held (e.g., Bank of America, Fidelity) */
    institution: string;

    /** Last 4 digits of the account number (display/reference only) */
    accountNumber: string;

    /** User-assigned display name for the account */
    name: string;

    /** Classification of the account (e.g., Checking, Savings, Credit Card) */
    type: AccountType;

    /** ISO currency code (e.g., USD, CAD). Defaults to "USD" */
    currency: string;

    /** Cached account balance derived from transactions */
    balance: number = 0;

    /** Timestamp of the last balance calculation */
    balanceAsOf: Date = new Date();

    /** IDs referencing transactions associated with this account */
    transactionIds: string[] = [];

    /** IDs referencing recurring events linked to this account */
    recurringEventIds: string[] = [];

    /** Optional user notes */
    notes?: string;

    /** Indicates whether the account is currently active */
    isActive: boolean = true;

    /** Determines whether the account is included in total balance calculations */
    includeInTotalBalance: boolean = true;

    /**
     * Constructs a new Account instance.
     * 
     * @param params - Parameters to initialize the account
     * @throws Error if `accountNumber` is not exactly 4 digits
     */
    protected constructor(params: BaseAccountParams & { accountType: AccountType }) {
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
