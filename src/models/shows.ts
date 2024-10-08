import { Media } from './medias';

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
    ticketLink: string;
    areaLink: string;
    subDescription: string;
    description: string;
    addedAt: Date;
    updatedAt: Date;
};

export type FullShow = ShowApiModel & {
    media: Media[];
    cover: Media;
    comments: Comment[];
};

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
    showOnLanding: boolean;
    description: string;
    subDescription: string;
    areaLink: string;
    ticketLink: string;
    [key: string]: any;
};

export type Comment = {
    id: number;
    showId: number;
    name: string;
    title: string;
    rating: number;
    description: string;
    addedAt: Date;
    updatedAt: Date;
};

export type CommentPayload = {
    showId: number;
    name: string;
    title: string;
    rating: number;
    description: string;
    date: Date;
};
