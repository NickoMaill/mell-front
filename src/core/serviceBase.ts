import { ResultStatusEnum } from '~/core/types/serverCoreType';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { ApiErrorType } from '~/core/types/ApiError';

class ServiceBase {
    protected appError: AppError;

    protected async asServicePromise<T>(request: Promise<T>) {
        return await request.then(
            (apiResponse) => Promise.resolve<T>(apiResponse),
            (error) => this.reject<T>(error as unknown)
        );
    }

    protected reject<TResult>(error): Promise<TResult> {
        if (error && error.type) return Promise.reject(error);

        if (!error.status) return Promise.reject(new AppError(ErrorTypeEnum.Undefined, error.message));

        let type = ErrorTypeEnum.Undefined;

        switch (error.status) {
            case ResultStatusEnum.Forbidden:
                type = ErrorTypeEnum.NotAllowed;
                break;
            case ResultStatusEnum.UnAuthorized:
                type = ErrorTypeEnum.SessionRequired;
                break;
            case ResultStatusEnum.NotAcceptable:
                type = ErrorTypeEnum.Maintenance;
                break;
            case ResultStatusEnum.BadRequest || ResultStatusEnum.Fatal || ResultStatusEnum.NotFound:
                type = ErrorTypeEnum.Technical;
                break;
            default:
                type = ErrorTypeEnum.Undefined;
                break;
        }

        const apiError = error.result as ApiErrorType;
        console.error('error', apiError);
        return Promise.reject(new AppError(type, apiError.message, apiError.code, apiError.data));
    }
}

export default ServiceBase;
