interface PairHistory {
    pair: string;
    date: number;
    partner: string;
}

export interface Developer {
    id: string;
    name: string;
    fullName: string;
    email: string;
    createdAt: number;
    pairHistory: PairHistory[];
}
