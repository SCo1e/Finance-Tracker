import { AccountType } from "models/accounts/AccountType"

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
    meta?: Record<string | unknown>;
}