// #region IMPORTS -> /////////////////////////////////////
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
    const updatePic = async (id: number, form: FormData): Promise<boolean> => {
        await asServicePromise(Service.put(`medias/${id}`, null, form));
        return true;
    }
    const deletePic = async (id: number) => {
        await asServicePromise(Service.del(`medias/${id}`));
        return true;
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return { getShowPic, addPic, getPic, updatePic, deletePic };
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IUseMediasService {
    getShowPic: (showId: number) => Promise<QueryResult<Media>>
    addPic: (form: FormData) => Promise<boolean>;
    getPic: (id: number) => Promise<QueryResult<Media>>;
    updatePic: (id: number, form: FormData) => Promise<boolean>
    deletePic: (id: number) => Promise<boolean>;
}
// #enderegion IPROPS --> //////////////////////////////////