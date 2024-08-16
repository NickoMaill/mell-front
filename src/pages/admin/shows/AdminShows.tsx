// #region IMPORTS -> /////////////////////////////////////
import { useEffect, useState } from 'react';
import AppTable, { AppTableStructure } from '~/components/common/AppTable';
import { QueryResult } from '~/core/types/serverCoreType';
import useShowsService from '~/hooks/services/useShowsService';
import { ShowApiModel } from '~/models/shows';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const tableStruct: AppTableStructure<ShowApiModel> = {
    colStruct: [
        {
            headerLabel: 'id',
            headerField: 'id',
            type: 'number',
            sortable: true,
        },
        {
            headerLabel: 'Titre',
            headerField: 'title',
            type: 'string',
            sortable: true,
        },
        {
            headerLabel: 'Commence le',
            headerField: 'startDate',
            type: 'date',
            sortable: true,
        },
        {
            headerLabel: 'Se termine le',
            headerField: 'endDate',
            type: 'date',
            sortable: true,
        },
    ],
};
// #endregion SINGLETON --> /////////////////////////////////

export default function AdminShows() {
    // #region STATE --> ///////////////////////////////////////
    const [shows, setShows] = useState<QueryResult<ShowApiModel>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const ShowService = useShowsService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getShows = async () => {
        const data = await ShowService.getShowsList().finally(() => setIsLoading(false));
        setShows(data);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getShows();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <AppTable<ShowApiModel> rows={shows} isTableLoading={isLoading} rowsPerPage={5} columns={tableStruct} />;
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAdminShows {}
// #enderegion IPROPS --> //////////////////////////////////
