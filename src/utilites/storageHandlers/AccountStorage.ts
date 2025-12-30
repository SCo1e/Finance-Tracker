import { AccountType } from "models/accounts/AccountType"

// Meta info about account--> helps select which sub-class to instantiate.
export interface AccountMeta {
    kind: AccountType;    // Which subclass to instantiate
    version: number;      // Schema version
    createdAt: string;    // ISO timestamp
    updatedAt: string;    // ISO timestamp
}

// this is subclass level details specific to each particular account type. 
export interface AccountDetails {
    //CheckingAccount-specific
    overdraftLimit?: number;

    // CreditCard-specific
    creditLimit?: number;
    apr?: number;
    dueDay?: number;

    // Savings-specific
    interestRate?: number;
    withdrawalLimit?: number;

    // Loan-specific
    principalAmount?: number;
    interestRateLoan?: number;
    termMonths?: number;

    // Investment-specific
    //holdings?:Holding[]
    //portfolioValue?: number;

    // Retirement-specific
    //contributionRate?: number;
    planType?: string; // e.g., 401k, IRA
}

// What is actually stored. 
export interface AccountRecord {
    id: string;
    name: string;
    type: AccountType;
    institution: string;
    accountNumber: string;
    currency: string;
    notes?: string;
    isActive: boolean;
    transactionIds: string[];
    recurringEventIds: string[];
    //Subclass specific info.
    meta: AccountMeta;
    details?: AccountDetails;
}