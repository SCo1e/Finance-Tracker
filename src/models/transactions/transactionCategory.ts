/**
 * Primary Categories for transaction Types
 */
export const TransactionCategories = {
    Essential: {
        Housing: null,
        Transportation: null,
        Insurance: null,
    },
    Discretionary: {
        Entertainment: null,
        Dining: null,
        Travel: null,
        Fitness: null,
    },
    Incidentals: {
        Copay: null,
        Repairs: null,
        Deductibles: null,
    },
    Gifts: {
        Charity: null,
        Tithes: null,
        Personal: null,
    },
} as const;


export type MainCategory = keyof typeof TransactionCategories;

export type SubCategory = {
    [K in MainCategory]: keyof typeof TransactionCategories[K];
}[MainCategory];
