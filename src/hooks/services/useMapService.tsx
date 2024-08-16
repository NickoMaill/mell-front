// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import useService from '../useService';
import useServiceBase from '../useServiceBase';
import { MapType } from '~/models/map';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function useMapService(): IUseMapService {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Service = useService();
    const { asServicePromise } = useServiceBase();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const search = async (query: string): Promise<MapType[]> => {
        const address = await asServicePromise<MapType[]>(Service.get(`map/search?q=${query}`));
        return address;
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { search };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseMapService {
    search: (query: string) => Promise<MapType[]>;
}
// #enderegion IPROPS --> //////////////////////////////////
