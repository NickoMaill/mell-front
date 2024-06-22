// #region IMPORTS -> /////////////////////////////////////
import React from 'react'
import useService from '../useService';
import useServiceBase from '../useServiceBase';
import { QueryResult } from '~/core/types/serverCoreType';
import { PostApiModel } from '~/models/posts';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useSocialMediaService(): IUseSocialMediaService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    const { asServicePromise } = useServiceBase();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getPosts = async (offset: number = 0): Promise<QueryResult<PostApiModel>> => {
        const posts = await asServicePromise<QueryResult<PostApiModel>>(Service.get(`social?offset=${offset}`));
        return posts;
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getPosts };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseSocialMediaService {
    getPosts: (offset: number) => Promise<QueryResult<PostApiModel>>;
}
// #enderegion IPROPS --> //////////////////////////////////