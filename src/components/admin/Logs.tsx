// #region IMPORTS -> /////////////////////////////////////
import AppCenter from '../center/AppCenter';
import { LogsApiModel } from '~/models/logs';
import { AppTableStructure } from '../common/AppTable';
import moment from 'moment';
import { Box, Grid } from '@mui/material';
import { Regular } from '../common/Text';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Logs({ id, action }) {
    // #region STATE --> ///////////////////////////////////////
    const col: AppTableStructure<LogsApiModel> = {
        defaultSort: { field: 'addedAt', sort: 'desc' },
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
                headerField: 'userId',
                headerLabel: 'Utilisateur',
                sortable: true,
                type: 'string',
                width: 200,
            },
            {
                headerField: 'action',
                headerLabel: 'Action',
                sortable: true,
                type: 'string',
                width: 100,
            },
            {
                headerField: 'addedAt',
                headerLabel: 'Date & Heure',
                sortable: true,
                type: 'dateTime',
                defaultSorted: true,
                defaultSortedOrder: 'desc',
                width: 150,
                valueFormatter: (e) => moment(e).format('DD/MM/YYYY'),
            },
            {
                headerField: 'description',
                headerLabel: 'Détails',
                sortable: false,
                type: 'string',
                width: 400,
                valueFormatter: (e) => <Regular dangerouslySetInnerHTML={{ __html: e }} />,
            },
        ],
    };

    const searchForm: FormMakerContentType<FormMakerPartEnum.SEARCH>[] = [
        {
            title: '',
            // type: FormMakerPartEnum.SEARCH,
            content: [
                {
                    id: 'userId',
                    label: 'Utilisateur',
                    index: 1,
                    type: 'number',
                    size: 12,
                },
                {
                    id: 'action',
                    label: 'Action',
                    index: 1,
                    type: 'text',
                    size: 12,
                },
                {
                    id: 'addedAt',
                    label: 'Date & heure',
                    index: 1,
                    type: 'date',
                    size: 12,
                },
            ],
        },
    ];
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
            <AppCenter<LogsApiModel>
                id={id}
                genericAction={action}
                entity="Logs"
                grammar={{ plural: "Journal d'Activités", singular: 'Log' }}
                specifiers={{ singular: 'le', plural: 'les' }}
                listStruct={col}
                icon="ManageSearch"
                searchFormStruct={searchForm}
                viewComponent={(data) => <LogView data={data} />}
            />
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

function LogView({ data }: { data: LogsApiModel }) {
    const content: { label: string; value: keyof LogsApiModel }[] = [
        { label: 'ID', value: 'id' },
        { label: 'Utilisateur', value: 'userId' },
        { label: 'Date & Heure', value: 'addedAt' },
        { label: 'Adresse IP', value: 'ipAddress' },
        { label: 'Action', value: 'action' },
        { label: 'Détails', value: 'description' },
    ];

    const renderContent = (element: { label: string; value: keyof LogsApiModel }) => {
        switch (element.value) {
            case 'addedAt':
                return (
                    <Regular>
                        <b>{element.label}</b> : {moment(data[element.value]).format('DD/MM/YYYY HH:mm:ss')}
                    </Regular>
                );
            case 'description':
                return (
                    <Box display={'flex'}>
                        <Regular marginRight={0.6}>
                            <b>{element.label}</b> :{' '}
                        </Regular>
                        <Regular>{data[element.value] ?? ''}</Regular>
                    </Box>
                );
            default:
                return (
                    <Regular>
                        <b>{element.label}</b> : {(data[element.value] ?? '').toString()}
                    </Regular>
                );
        }
    };

    return (
        <Box>
            <Grid container wrap="wrap" flexWrap="wrap" spacing={2} columns={2}>
                {content.map((d, i) => {
                    return (
                        <Grid key={i} item xs={3}>
                            {renderContent(d)}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
