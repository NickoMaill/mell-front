// #region IMPORTS -> /////////////////////////////////////
import AppCenter from '../center/AppCenter';
import { AppTableStructure } from '../common/AppTable';
import moment from 'moment';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
import useMapService from '~/hooks/services/useMapService';
import { ShowApiModel, ShowPayloadType } from '~/models/shows';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Shows({ id, action }) {
    const [address, setAddress] = useState<string>(null);
    const [postalCode, setPostalCode] = useState<string>(null);
    const [coordinate, setCoordinate] = useState<number[]>([]);
    const [city, setCity] = useState<string>(null);
    const [country, setCountry] = useState<string>(null);
    const [place, setPlace] = useState<string>(null);
    const [options, setOptions] = useState<{ label: string; value: any }[]>([])
    // #region STATE --> ///////////////////////////////////////
    const col: AppTableStructure<ShowApiModel> = {
        defaultSort: { field: 'startDate', sort: 'desc' },
        actions: ['view', 'update', 'delete'],
        colStruct: [
            {
                headerField: 'id',
                headerLabel: 'ID',
                sortable: true,
                type: 'number',
                width: 90,
            },
            {
                headerField: 'title',
                headerLabel: 'Titre',
                sortable: true,
                type: 'string',
                width: 200,
            },
            {
                headerField: 'startDate',
                headerLabel: 'Commence le',
                sortable: true,
                type: 'date',
                width: 100,
                valueFormatter: (e) => moment(e).format('DD/MM/YYYY hh:mm:ss'),
            },
            {
                headerField: 'endDate',
                headerLabel: 'Se termine le',
                sortable: true,
                type: 'dateTime',
                defaultSorted: true,
                defaultSortedOrder: 'desc',
                width: 150,
                valueFormatter: (e) => moment(e).format('DD/MM/YYYY hh:mm:ss'),
            },
            {
                headerField: 'schedule',
                headerLabel: 'Horaire',
                sortable: true,
                type: 'date',
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
                    id: 'title',
                    label: 'Titre',
                    index: 1,
                    type: 'text',
                    size: 12,
                },
                {
                    id: 'city',
                    label: 'Ville',
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

    const formStructure: FormMakerContentType<FormMakerPartEnum.PANEL>[] = [
        {
            title: 'Informations',
            type: FormMakerPartEnum.PANEL,
            content: [
                {
                    id: 'title',
                    label: 'Titre',
                    index: 1,
                    type: 'text',
                    size: 12,
                    icon: 'Title',
                    required: true,
                    onChange(e) {
                        console.log(e);
                    },
                },
                {
                    id: 'place',
                    label: "Lieu de l'évènement",
                    index: 1,
                    type: 'text',
                    size: 6,
                    icon: 'TheaterComedy',
                    required: true,
                },
                {
                    id: 'address',
                    label: 'Adresse',
                    index: 2,
                    type: 'autocomplete',
                    size: 6,
                    icon: 'Place',
                    value: address,
                    onChange(e: ChangeEvent<HTMLInputElement>) {
                        searchAddress(e);
                    },
                    onSelectAutocompleteInput(e, v) {
                        onSelect(v);
                    },
                    selectOptions: options,
                },
                {
                    id: 'postalCode',
                    label: 'Code postal',
                    index: 1,
                    type: 'text',
                    size: 2,
                    value: postalCode,
                    icon: 'Place',
                },
                {
                    id: 'city',
                    label: 'Ville',
                    index: 2,
                    type: 'text',
                    size: 2,
                    value: city,
                    icon: 'LocationCity',
                },
                {
                    id: 'country',
                    label: 'Pays',
                    index: 3,
                    type: 'text',
                    size: 2,
                    value: country,
                    icon: 'Public',
                },
                {
                    id: 'startDate',
                    label: 'Commence le',
                    index: 4,
                    type: "dateTime",
                    dateViews: ['day'],
                    size: 2,
                    icon: 'CalendarViewDay',
                },
                {
                    id: 'endDate',
                    label: 'Fini le',
                    index: 5,
                    type: "dateTime",
                    dateViews: ['day'],
                    size: 2,
                    icon: 'CalendarViewDay',
                },
                {
                    id: 'subDescription',
                    label: 'Description sommaire',
                    index: 1,
                    type: 'textarea',
                    size: 12,
                    icon: 'Notes',
                },
                {
                    id: 'description',
                    label: 'Description',
                    index: 1,
                    type: 'textarea',
                    size: 12,
                    icon: 'Notes',
                },
                {
                    id: 'showOnLanding',
                    label: "Mettre en avant sur la page d'accueil ?",
                    index: 1,
                    type: 'radio',
                    size: 3,
                    radioOptions: [
                        { label: 'Oui', value: true },
                        { label: 'Non', value: false },
                    ],
                },
                {
                    id: 'areaLink',
                    label: 'Lien de la salle',
                    index: 2,
                    type: 'url',
                    size: 3,
                    icon: 'Link',
                },
                {
                    id: 'ticketLink',
                    label: 'Lien des tickets',
                    index: 3,
                    type: 'url',
                    size: 3,
                    icon: 'Euro',
                },
                {
                    id: "latitude",
                    label: "",
                    index: 1,
                    type: "hidden",
                    size: 1,
                },
                {
                    id: "longitude",
                    label: "",
                    index: 1,
                    type: "hidden",
                    size: 1,
                }
            ],
        },
    ];
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const MapService = useMapService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const searchAddress = async (e) => {
        if (e.target.value.length > 4) {
            await MapService.search(e.target.value)
            .then(res => {
                let list: { label: string; value: number }[] = res.map(data => {
                    return { 
                        label: `${data.properties.housenumber ?? ""} ${data.properties.street ?? ""}, ${data.properties.postcode ?? ""}, ${data.properties.city ?? ""}, ${data.properties.country ?? ""}, ${data.properties.countrycode ?? ""}`.trim(),
                        value: data.properties.osm_id
                    };
                });
                list = [...new Map(list.map(p => [p.label, p])).values()];
                setOptions(list);
            })
        } else {
            setOptions([]);
        }
    }

    const onSelect = (value: string) => {
        const values = value.split(",");
        if (values.length === 5) {
            (document.getElementById("address") as HTMLInputElement).value = values[0].trim();
            (document.getElementById("postalCode") as HTMLInputElement).value = values[1].trim();
            (document.getElementById("city") as HTMLInputElement).value = values[2].trim();
            (document.getElementById("country") as HTMLInputElement).value = values[3].trim();
        }
    }
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
                grammar={{ plural: 'Spectacles', singular: 'Spectacle', isFem: false }}
                specifiers={{ singular: 'le', plural: 'les' }}
                listStruct={col}
                icon="TheaterComedy"
                actions={["view", "update", "delete"]}
                searchFormStruct={searchForm}
                formStruct={formStructure}
                allowUpdate
                allowAdd
                allowDelete
            />
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}
