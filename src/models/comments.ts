export type Comment = {
    id: number;
    showId: number;
    name: string;
    title: string;
    rating: number;
    description: string;
    addedAt: Date;
    updatedAt: Date;
}

export type CommentPayload = {
    showId: number;
    name: string;
    title: string;
    rating: number;
    description: string;
    date: Date;
    rawDate: string;
}