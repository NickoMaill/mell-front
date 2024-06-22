export type PostApiModel = {
    id: number;
    postId: string;
    pictureUrl: string;
    isVideo: boolean;
    likeCount: number;
    commentCount: number;
    postText: string;
    date: Date;
    sortOrder?: number;
    addedAt: Date;
    updatedAt: Date;
}