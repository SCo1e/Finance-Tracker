import { MainCategory, SubCategory } from "./transactionCategory";
/**
 * Transaction Object  
 * Represent a single monetary movement from an account
 */
export class Transaction {
    /** Transaction ID: String **/
    id: string;

    /** Recurring eventid */
    recurringEventId?: string;

    /** Account Number for account -- as key */
    accountNumber: string;

    /** counter party*/
    counterParty?: string;

    /** Transaction type --> transer, debit (money out), credit (money in)  will determine the context*/
    type: "debit" | "credit" | "transfer";

    /** date transaction occured*/
    date?: Date;

    /** transaction Main Category: Essential, Discretionary, Incidental, Gift */
    category: MainCategory;

    /** Subcategory */
    subCategory: SubCategory;

    /** amount */
    amount: number;

    /* Notes*/
    notes?: string;


    constructor(
        acctNum: string,
        type: "debit" | "credit" | "transfer",
        category: MainCategory,
        subCategory: SubCategory,
        amount: number,
        notes?: string,
        date?: Date,
        recurringEventId?: string,
        counterParty?: string,
    ) {
        this.id = crypto.randomUUID();
        this.accountNumber = acctNum;
        this.type = type;
        this.category = category;
        this.subCategory = subCategory;
        this.amount = amount;
        this.notes = notes ?? notes;
        this.date = date ?? date;
        this.recurringEventId = recurringEventId ?? recurringEventId;
        this.counterParty = counterParty ?? counterParty;
    }


}
