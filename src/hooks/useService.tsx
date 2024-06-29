// #region IMPORTS -> /////////////////////////////////////
import { useContext } from 'react';
import useStorage from './useStorage';
import useModal from './useModal';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import configManager from '~/managers/configManager';
import SessionContext from '~/context/sessionContext';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// export const apiHost = 'http://localhost:5155';
export const apiHost = configManager.getConfig.API_BASEURL;
const HTTP_TIMEOUT = 50000;
const currentUrl = window.location.href;
// #endregion SINGLETON --> /////////////////////////////////

export default function useService(): IUseServiceApi {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Storage = useStorage();
    const Modal = useModal();
    const Session = useContext(SessionContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    /**
     * @description hook that send GET request to API SERVER
     * @param route route without base url
     * @param headersRequest additional headers
     * @throws a timeout error
     * @returns json response
     */
    const get = async <T,>(route: string, headersRequest?: HeadersInit): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }
        const options: RequestInit = {
            method: 'GET',
            signal: AbortSignal.timeout(HTTP_TIMEOUT),
            credentials: 'include',
            headers,
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);
        const response = await request.json();

        if (response.errorCode) {
            //Modal.openModal('Erreur', <StandardError error={response} />);
            throw new AppError(ErrorTypeEnum.Functional, response.message, response.errorCode);
        }

        return response as T;
    };
    /**
     * @description hook that send GET request to API SERVER for file downloading
     * @param route route without base url
     * @param headersRequest additional headers
     * @throws a timeout error
     * @returns a file in any extension type
     */
    const getFile = async (route: string, headersRequest?: HeadersInit): Promise<Blob> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers,
        };

        const url = `${route}`;

        const request = await fetch(url, options);
        if (request.redirected) {
            return;
        }
        const response = await request.blob();
        return response;
    };

    const downloadFile = async (route: string, name: string, headersRequest?: HeadersInit) => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers,
        };

        const url = `${apiHost}/${route}`;

        const request = await fetch(url, options);
        if (request.redirected) {
            return;
        }
        const contentType = request.headers.get('content-type');
        if (contentType.indexOf('application/json') !== -1) {
            const response = await request.json();
            if (response.errorCode && response.errorCode.toLowerCase() === 'error_happened') {
                //Modal.openModal('Erreur', <StandardError error={response} />);
                throw new AppError(ErrorTypeEnum.Functional, '', '');
            }
        }
        const response = await request.blob();
        const a = document.createElement('a');
        const href = URL.createObjectURL(response);
        a.href = href;
        a.download = name;
        a.click();
        URL.revokeObjectURL(href);
    };

    /**
     * @description hook that send POST request to API SERVER
     * @param route route without base url
     * @param body JSON object
     * @param formData FormData object (highly recommended for file transfert)
     * @param headersRequest Additional headers
     * @throws a timeout error
     * @returns json response
     */
    const post = async <T, B>(route: string, body: B, formData?: FormData, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }
        if (!formData) {
            headers.set('Content-Type', 'application/json');
        } else {
            if (!formDataContainsFile(formData)) {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        headers.set('Accept', '*/*');

        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            signal: AbortSignal.timeout(HTTP_TIMEOUT * 10),
            headers,
            body: formData ? formDataContainsFile(formData) ? formData : formDataToUrlEncoded(formData) : JSON.stringify(body),
        };
        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);
        const response = await request.json();

        if (response.errorCode) {
            //Modal.openModal('Erreur', <StandardError error={response} />);
            throw new AppError(ErrorTypeEnum.Functional, response.message, response.errorCode);
        }
        return response as T;
    };
    /**
     * @description hook that send PUT request to API SERVER
     * @param route route without base url
     * @param body JSON object
     * @param formData FormData object (highly recommended for file transfert)
     * @param headersRequest Additional headers
     * @throws a timeout error
     * @returns json response
     */
    const put = async <T, B>(route: string, body: B, formData?: FormData, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        if (!formData) {
            headers.set('Content-Type', 'application/json');
        } else {
            if (!formDataContainsFile(formData)) {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        headers.set('Accept', '*/*');

        const options: RequestInit = {
            method: 'PUT',
            credentials: 'include',
            signal: AbortSignal.timeout(HTTP_TIMEOUT * 2),
            headers,
            body: formData ? formDataContainsFile(formData) ? formData : formDataToUrlEncoded(formData) : JSON.stringify(body),
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);
        if (request.redirected) {
            window.location.href = request.url;
            return;
        }
        const response = await request.json();

        if (response.errorCode) {
            //Modal.openModal('Erreur', <StandardError error={response} />);
            throw new AppError(ErrorTypeEnum.Functional, response.message, response.errorCode);
        }
        return response as T;
    };
    /**
     * @description hook that send DELETE request to API SERVER
     * @param route route without base url
     * @param body JSON object
     * @param headersRequest Additional headers
     * @throws a timeout error
     * @returns json response
     */
    const del = async <T, B>(route: string, body?: B, headersRequest?: object): Promise<T> => {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${Session.token}`);
        headers.set('X-Client-URL', currentUrl);
        headers.set('X-Client-Annonces', Storage.getSessionItem('annonces') ?? '');
        for (const header in headersRequest) {
            headers.set(header, headersRequest[header]);
        }

        body && headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const options: RequestInit = {
            method: 'DELETE',
            credentials: 'include',
            signal: AbortSignal.timeout(HTTP_TIMEOUT),
            headers,
            body: body ? JSON.stringify(body) : null,
        };

        const url = `${apiHost}/${route}`;
        const request = await fetch(url, options);
        if (request.redirected) {
            window.location.href = request.url;
            return;
        }
        const response = await request.json();
        if (response.errorCode) {
            //Modal.openModal('Erreur', <StandardError error={response} />);
            throw new AppError(ErrorTypeEnum.Functional, response.message, response.errorCode);
        }
        return response as T;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { get, getFile, downloadFile, post, put, del };
    // #endregion RENDER --> ///////////////////////////////////
}
const formDataContainsFile = (formData) => {
    for (let entry of formData.entries()) {
      const [key, value] = entry;
      if (value instanceof File) {
        return true;
      }
    }
    return false;
  };
  const formDataToUrlEncoded = (formData) => {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value);
    });
    return params.toString();
  };
// #region IPROPS -->  /////////////////////////////////////
interface IUseServiceApi {
    get: <T>(url: string, headers?: HeadersInit) => Promise<T>;
    getFile: (route: string, headersRequest?: HeadersInit) => Promise<Blob>;
    downloadFile: (route: string, name: string, headersRequest?: HeadersInit) => Promise<void>;
    post: <T, B>(url: string, body?: B, formData?: FormData, headers?: object) => Promise<T>;
    put: <T, B>(url: string, body?: B, formData?: FormData, headers?: object) => Promise<T>;
    del: <T, B>(url: string, body?: B, formData?: FormData, headers?: object) => Promise<T>;
}
// #endregion IPROPS --> //////////////////////////////////
