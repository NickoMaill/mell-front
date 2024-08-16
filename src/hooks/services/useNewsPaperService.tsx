// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import useService from '../useService';
import useServiceBase from '../useServiceBase';
import { QueryResult } from '~/core/types/serverCoreType';
import { Article, NewsPaperProvider } from '~/models/articles';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useNewsPaperService(): IUseNewsPaperService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    const { asServicePromise } = useServiceBase();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getNewsPaper = async (): Promise<QueryResult<NewsPaperProvider>> => {
        const response = await asServicePromise<QueryResult<NewsPaperProvider>>(Service.get('newsPaperProvider'));
        return response;
    };
    const getArticle = async (): Promise<QueryResult<Article>> => {
        const response = await asServicePromise<QueryResult<Article>>(Service.get('articles'));
        return response;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getNewsPaper, getArticle };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseNewsPaperService {
    getNewsPaper: () => Promise<QueryResult<NewsPaperProvider>>;
    getArticle: () => Promise<QueryResult<Article>>;
}
// #enderegion IPROPS --> //////////////////////////////////
