
export type LogsApiModel = {
    id: number;
    action: string;
    description: string;
    target: string;
    call: string;
    userId: number;
    ipAddress: string;
    addedAt: Date;
    updatedAt: Date;
}