// #region IMPORTS -> /////////////////////////////////////
import AppCenter from '../center/AppCenter';
import { AppTableStructure } from '../common/AppTable';
import moment from 'moment';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
import { ShowApiModel, ShowPayloadType } from '~/models/shows';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Shows({ id, action }) {
    // #region STATE --> ///////////////////////////////////////
    const col: AppTableStructure<ShowApiModel> = {
        defaultSort: { field: "startDate", sort: 'desc' },
        actions: ['view'],
        colStruct: [
            {
                headerField: 'id',
                headerLabel: 'ID',
                sortable: true,
                type: 'number',
                width: 90,
            },
            {
                headerField: "title",
                headerLabel: 'Titre',
                sortable: true,
                type: 'string',
                width: 200,
            },
            {
                headerField: "startDate",
                headerLabel: 'Commence le',
                sortable: true,
                type: "date",
                width: 100,
                valueFormatter: (e) => moment(e).format('DD/MM/YYYY hh:mm:ss'),
            },
            {
                headerField: "endDate",
                headerLabel: "Se termine le",
                sortable: true,
                type: "dateTime",
                defaultSorted: true,
                defaultSortedOrder: 'desc',
                width: 150,
                valueFormatter: (e) => moment(e).format('DD/MM/YYYY hh:mm:ss'),
            },
            {
                headerField: "schedule",
                headerLabel: "Horaire",
                sortable: true,
                type: "date",
                width: 400,
                valueFormatter: (e) => moment(e).format('hh:mm'),
            },
        ],
    };

    const searchForm: FormMakerContentType<FormMakerPartEnum.SEARCH>[] = [
        {
            title: '',
            content: [
                {
                    id: "title",
                    label: "Titre",
                    index: 1,
                    type: "text",
                    size: 12
                },
                {
                    id: "city",
                    label: "Ville",
                    index: 1,
                    type: "text",
                    size: 12,
                },
                {
                    id: "addedAt",
                    label: "Date & heure",
                    index: 1,
                    type: "date",
                    size: 12
                }
            ]
        }
    ]
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            <AppCenter<ShowApiModel>
                id={id}
                genericAction={action}
                entity="Shows"
                grammar={{ plural: "Spectacles", singular: 'Spectacle' }}
                specifiers={{ singular: 'le', plural: 'les' }}
                listStruct={col}
                icon="ManageSearch"
                searchFormStruct={searchForm}
            />
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

