// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import useServiceBase from '../useServiceBase';
import { QueryResult } from '~/core/types/serverCoreType';
import { NewsPaperProvider } from '~/models/articles';
import useService from '../useService';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useToolService(): IUseToolService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const { asServicePromise } = useServiceBase();
    const Service = useService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getNewsPapersProviderList = async (): Promise<QueryResult<NewsPaperProvider>> => {
        const response = await asServicePromise<QueryResult<NewsPaperProvider>>(Service.get('newsPaperProvider'));
        return response;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getNewsPapersProviderList };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseToolService {
    getNewsPapersProviderList: () => Promise<QueryResult<NewsPaperProvider>>;
}
// #enderegion IPROPS --> //////////////////////////////////
