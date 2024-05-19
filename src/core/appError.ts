export enum ErrorTypeEnum {
    Undefined = 0,
    Functional = 1,
    NotAllowed = 2,
    Technical = 3,
    SessionRequired = 4,
    Maintenance = 5,
}

export class AppError {
    public readonly type: ErrorTypeEnum;
    public readonly code?: string;
    public readonly message: string;
    public readonly stack?: string;
    public readonly data?: any;

    constructor(type: ErrorTypeEnum, message: string, code?: string, data?: any) {
        this.type = type;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static fromAppError(error: AppError): AppError {
        return new AppError(error.type, error.message, error.code, error.data);
    }
}
