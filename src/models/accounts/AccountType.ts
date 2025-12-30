/**
 * Enumerates the supported financial account categories.
 * Used to determine account behavior and calculations.
 */
export enum AccountType {
    /** Standard checking account */
    Checking = "checking",

    /** Interest-bearing savings account */
    Savings = "savings",

    /** Revolving credit card account */
    CreditCard = "credit_card",

    /** Installment-based loan account */
    Loan = "loan",

    /** Brokerage or taxable investment account */
    Investment = "investment",

    /** Tax-advantaged retirement account (401k, IRA, etc.) */
    Retirement = "retirement"
}