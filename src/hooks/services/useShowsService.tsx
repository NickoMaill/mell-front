// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import useService from '../useService';
import { QueryResult } from '~/core/types/serverCoreType';
import { ShowApiModel } from '~/models/shows';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useShowsService(): IShowsService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    // #endregion HOOKS --> ////////////////////////////////////
    
    // #region METHODS --> /////////////////////////////////////
    const getShowsList = async (offset: number = 50): Promise<QueryResult<ShowApiModel>> => {
        const shows = await Service.get<QueryResult<ShowApiModel>>(`shows/list?offset=${offset}`);
        return shows;
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getShowsList };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IShowsService {
    getShowsList: (offset?: number) => Promise<QueryResult<ShowApiModel>>
}
// #enderegion IPROPS --> //////////////////////////////////