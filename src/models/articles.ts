export type Article = {
    id: number;
    title: number;
    newsPaperId: number;
    description: string;
    url: string;
    attachementUrl: string;
    attachementType: ArticleAttachementTypeEnum;
    providerName: string;
    providerImg: string;
    updatedAt: Date;
    addedAt: Date;
};

export type ArticlePayload = {
    title: number;
    newsPaperId: number;
    description: string;
    url: string;
    attachementUrl: string;
    attachementType: ArticleAttachementTypeEnum;
    newsPaperProvider: NewsPaperProvider;
};

export enum ArticleAttachementTypeEnum {
    VIDEO = 0,
    AUDIO = 1,
    YOUTUBE = 2,
}

export type NewsPaperProvider = {
    id: number;
    name: string;
    mediaId: number;
    updatedAt: Date;
    addedAt: Date;
};

export type NewsPaperProviderPayload = {
    name: string;
};
