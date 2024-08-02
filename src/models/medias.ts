export type Media = {
    id: number;
    externalId: string;
    mediaGroup: MediaGroupEnum;
    mediaGroupId: number;
    isMain: boolean;
    url: string;
    type: MediaType;
    size: number;
    isVideo: boolean;
    width: number;
    height: number;
    sortOrder: number;
    addedAt: Date;
    updatedAt: Date;
}

export interface MediaPayloadType {
    name?: string;
    type: string;
    sortOrder: number;
    isVideo: boolean;
    status: MediaStatus;
    mediaGroup: MediaGroupEnum;
    mediaGroupId: number;
    isMain?: boolean;
};

export enum MediaType {
    JPEG = 'jpeg',
    PNG = 'png',
    WEBP = 'webp',
}

export enum MediaStatus {
    BACKGROUND = 1,
    REGULAR_PIC = 2,
    SHOWS = 3,
}

export enum MediaGroupEnum {
    SHOWS = "show",
    CARROUSEL = "carrousel"
}