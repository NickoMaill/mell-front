export type ShowApiModel = {
    id: number;
    title: string;
    place: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    lat: number;
    long: number;
    startDate: Date;
    endDate: Date;
    schedule: Date;
    addedAt: Date;
    updatedAt: Date;
}

export type ShowPayloadType = {
    title: string;
    place: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    lat: number;
    long: number;
    startDate: Date;
    endDate: Date;
    schedule: Date;
    showUrl: string;
}

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
}