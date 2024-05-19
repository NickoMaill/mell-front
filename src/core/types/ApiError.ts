export type ApiErrorType = {
    key: string;
    status: number;
    stack: string;
    code: string;
    message: string;
    detailedMessage?: string | null;
    targetUrl: string;
    data?: any | any[];
};
