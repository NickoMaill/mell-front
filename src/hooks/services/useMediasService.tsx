// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import { QueryResult } from '~/core/types/serverCoreType';
import { Media } from '~/models/medias';
import useServiceBase from '../useServiceBase';
import useService from '../useService';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useMediasService(): IUseMediasService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const { asServicePromise } = useServiceBase();
    const Service = useService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getShowPic = async (showId: number): Promise<QueryResult<Media>> => {
        const response = await asServicePromise<QueryResult<Media>>(Service.get(`medias?groupId=${showId}&mediaGroup=show`));
        return response;
    }

    const addPic = async (form: FormData): Promise<boolean> => {
        await asServicePromise(Service.post(`medias`, null, form));
        return true;
    }

    const getPic = async (id: number): Promise<QueryResult<Media>> => {
        const response = await asServicePromise<QueryResult<Media>>(Service.get(`medias/${id}`));
        return response;
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getShowPic, addPic, getPic };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseMediasService {
    getShowPic: (showId: number) => Promise<QueryResult<Media>>
    addPic: (form: FormData) => Promise<boolean>;
    getPic: (id: number) => Promise<QueryResult<Media>>;
}
// #enderegion IPROPS --> //////////////////////////////////