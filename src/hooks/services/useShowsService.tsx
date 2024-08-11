// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import useService from '../useService';
import { QueryResult } from '~/core/types/serverCoreType';
import { FullShow, ShowApiModel } from '~/models/shows';
import useServiceBase from '../useServiceBase';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useShowsService(): IShowsService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    const { asServicePromise } = useServiceBase();
    // #endregion HOOKS --> ////////////////////////////////////
    
    // #region METHODS --> /////////////////////////////////////
    const getShowsList = async (offset: number = 0): Promise<QueryResult<ShowApiModel>> => {
        const shows = await Service.get<QueryResult<ShowApiModel>>(`shows/list?offset=${offset}`);
        return shows;
    }

    const getFullShowsList = async (offset: number = 0): Promise<QueryResult<FullShow>> => {
        const shows = await Service.get<QueryResult<FullShow>>(`shows/full?offset=${offset}`);
        return shows;
    }

    const getCurrentShow = async (): Promise<QueryResult<FullShow>> => {
        const show = await asServicePromise<QueryResult<FullShow>>(Service.get("shows/current"));
        return show
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getShowsList, getCurrentShow, getFullShowsList };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IShowsService {
    getShowsList: (offset?: number) => Promise<QueryResult<ShowApiModel>>
    getFullShowsList: (offset?: number) => Promise<QueryResult<FullShow>>
    getCurrentShow: () => Promise<QueryResult<FullShow>>;
}
// #enderegion IPROPS --> //////////////////////////////////