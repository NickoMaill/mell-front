// #region IMPORTS -> /////////////////////////////////////
import AppCenter from '../center/AppCenter';
import AppTable, { AppTableStructure } from '../common/AppTable';
import moment from 'moment';
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { FormMakerContentType, FormMakerPartEnum, SelectOptionsType } from '~/core/types/FormMakerCoreTypes';
import useMapService from '~/hooks/services/useMapService';
import { MapType } from '~/models/map';
import { ShowApiModel } from '~/models/shows';
import { QueryResult } from '~/core/types/serverCoreType';
import { Box, Button, Container, Grid, IconButton, Link, Paper, Typography } from '@mui/material';
import { Bold, Italic } from '../common/Text';
import AppFullPageModal from '../common/AppFullPageModal';
import ImagePlaceHolder from '~/assets/pictures/image_placeholder.webp';
import { MuiFileInput } from 'mui-file-input';
import AppIcon from '../common/AppIcon';
import { Media, MediaGroupEnum, MediaPayloadType, MediaStatus } from '~/models/medias';
import InputSelectField from '../formMaker/elements/InputSelectField';
import InputBase from '../formMaker/elements/InputBase';
import useNotification from '~/hooks/useNotification';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import useModal from '~/hooks/useModal';
import useMediasService from '~/hooks/services/useMediasService';
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
    const [options, setOptions] = useState<{ label: string; value: any }[]>([]);
    const [resultAddress, setResultAddress] = useState<MapType[]>([]);
    const [lat, setLat] = useState<number>(null);
    const [long, setLong] = useState<number>(null);
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

    const formStructure: FormMakerContentType<FormMakerPartEnum.TAB>[] = [
        {
            title: 'Informations générales',
            type: FormMakerPartEnum.TAB,
            content: [
                {
                    title: 'Informations',
                    icon: 'FormatListBulleted',
                    content: [
                        {
                            id: 'title',
                            label: 'Titre',
                            index: 1,
                            type: 'text',
                            size: 12,
                            icon: 'Title',
                            required: true,
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
                                onSelect(v.value);
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
                            type: 'date',
                            size: 2,
                            icon: 'CalendarViewDay',
                        },
                        {
                            id: 'endDate',
                            label: 'Fini le',
                            index: 5,
                            type: 'date',
                            size: 2,
                            icon: 'CalendarViewDay',
                        },
                        {
                            id: 'schedule',
                            label: 'Horaires',
                            index: 6,
                            type: 'time',
                            size: 2,
                            icon: 'LockClock',
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
                            id: 'lat',
                            label: '',
                            index: 1,
                            type: 'hidden',
                            size: 1,
                            value: lat,
                        },
                        {
                            id: 'long',
                            label: '',
                            index: 1,
                            type: 'hidden',
                            size: 1,
                            value: long,
                        },
                    ],
                },
            ],
        },
        {
            title: 'Visuels',
            icon: 'InsertPhoto',
            type: FormMakerPartEnum.TAB,
            hide: action === 'new',
            content: [
                {
                    title: 'Gestion des visuels',
                    icon: 'InsertPhoto',
                    content: [
                        {
                            id: 'picImport',
                            index: 1,
                            type: 'htmlContent',
                            htmlContent: <PicturesImport showId={id} />,
                        },
                    ],
                },
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
            await MapService.search(e.target.value).then((res) => {
                setResultAddress(res);
                let list: { label: string; value: number }[] = res.map((data) => {
                    return {
                        label: `${data.properties.housenumber ?? ''} ${data.properties.street ?? ''}, ${data.properties.postcode ?? ''}, ${data.properties.city ?? ''}, ${data.properties.country ?? ''}, ${data.properties.countrycode ?? ''}`.trim(),
                        value: data.properties.osm_id,
                    };
                });
                list = [...new Map(list.map((p) => [p.label, p])).values()];
                setOptions(list);
            });
        } else {
            setResultAddress([]);
            setOptions([]);
        }
    };

    const onSelect = (value: number) => {
        const obj = resultAddress.find((o) => o.properties.osm_id === value);
        if (obj) {
            (document.getElementById('address') as HTMLInputElement).value = `${obj.properties.housenumber ?? ''} ${obj.properties.street ?? ''}`;
            (document.getElementById('postalCode') as HTMLInputElement).value = obj.properties.postcode;
            (document.getElementById('city') as HTMLInputElement).value = obj.properties.city;
            (document.getElementById('country') as HTMLInputElement).value = obj.properties.country;
            (document.getElementById('lat') as HTMLInputElement).value = obj.geometry.coordinates[1].toString();
            (document.getElementById('long') as HTMLInputElement).value = obj.geometry.coordinates[0].toString();
            setLat(obj.geometry.coordinates[1]);
            setLong(obj.geometry.coordinates[0]);
            setOptions([]);
            setResultAddress([]);
        }
        // if (values.length === 5) {

        // }
    };
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
                actions={['view', 'update', 'delete']}
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

function PicturesImport({ showId }: IPicturesImport) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [rows, setRows] = useState<QueryResult<Media>>({ totalRecords: 0, records: [], offset: 0, limit: 5 });
    const [currentPage, setCurrentPage] = useState<number>(1);

    const Modal = useModal();
    const MediaService = useMediasService();

    const handleCloseOpen = (id?: number) => {
        Modal.openModal("Ajouter un visuel", <PhotoForm showId={showId} id={id} />, "sm", "body", false, true);
    };

    const fetchPhotos = async () => {
        setIsLoading(true);
        await MediaService.getShowPic(showId)
        .then((res) => setRows(res))
        .finally(() => setIsLoading(false));
    };
    const header: AppTableStructure<any, any> = {
        colStruct: [
            { headerField: 'id', headerLabel: 'ID', width: 90, type: 'number', sortable: false },
            { headerField: 'url', headerLabel: 'Aperçu', type: 'string', sortable: false },
            { headerField: 'isVideo', headerLabel: 'Type', type: 'string', sortable: false },
            { headerField: 'addedAt', headerLabel: 'Ajouté le', type: 'date', sortable: false },
        ],
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <AppTable
                entity="Medias"
                // actions={props.listStruct.actions}
                // onSort={(e) => setSort(e)}
                // onPaginationChange={handleRowsPerPage}
                
                onPageChange={(e) => setCurrentPage(e)}
                currentPage={currentPage}
                rowsPerPage={5}
                rows={rows}
                columns={header}
                isTableLoading={isLoading}
                onExportClick={() => null}
                onRowClick={(e) => handleCloseOpen(e.row.id)}
                
            />
            <Link component="a" onClick={() => handleCloseOpen()} role={'button'} sx={{ mt: 2, cursor: 'pointer' }}>
                <Bold>Ajouter visuel</Bold>
            </Link>
            {/* <AppFullPageModal modalTitle="Ajouter un visuel" isOpen={isModalOpen} onClose={handleCloseOpen}>
                <PhotoForm />
            </AppFullPageModal> */}
        </Container>
    );
}

interface IPicturesImport {
    showId: number;
    id?: number;
}

function PhotoForm({ showId, id }: IPicturesImport) {
    const [imageSrc, setImageSrc] = useState<string>(ImagePlaceHolder);
    const [imageValue, setImageValue] = useState<File>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const [isMain, setIsMain] = useState<boolean>(false);

    const Notification = useNotification();
    const MediaService = useMediasService();

    const typeSelOptions: SelectOptionsType[] = [
        { value: true, label: "Oui" },
        { value: false, label: "Non" },
    ]
    const types = ["image/png", "image/jpg", "image/webp"];

    const handleChangeInput = (e: File) => {
        if (!types.includes(e.type.toLowerCase())) {
            setIsError(true);
            setErrorMessage("Votre fichier doit être au format .jpg, .jpeg, .png, ou .webp");
        } else if (e.size > 2000000) {
            setIsError(true);
            setErrorMessage("Votre fichier doit faire moins de 2mo");
        } else {
            setImageValue(e);
            setIsError(false);
            setErrorMessage(null);
        } 
    };

    const fetchVisu = async () => {
        if (id) {
            await MediaService.getPic(id)
            .then(res => {
                setImageSrc(res.records[0].url);
                setIsMain(res.records[0].isMain);
            })
        }
    }

    const monitorImage = () => {
        if (imageValue) {
            const src = URL.createObjectURL(imageValue);
            setImageSrc(src);
        } else {
            setImageSrc(ImagePlaceHolder);
        }
    };

    const deleteImg = () => {
        setImageValue(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isError || imageValue === null) {
            Notification.error("Veuillez fournir une image valide pour continuer");
            setIsError(true);
            throw new AppError(ErrorTypeEnum.Functional, "Veuillez fournir une image valide pour continuer", "invalid_file");
        }

        const payload: MediaPayloadType = {
            type: "image",
            isVideo: false, 
            status: MediaStatus.SHOWS,
            sortOrder: 1,
            mediaGroupId: showId,
            mediaGroup: MediaGroupEnum.SHOWS,
            name: ""
        }
        const form = new FormData(e.currentTarget);

        for (const p in payload) {
            form.append(p, payload[p])
        }
        await MediaService.addPic(form);
    }

    useEffect(() => {
        monitorImage();
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageValue]);

    useEffect(() => {
        fetchVisu();
    }, []);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: "relative", height: "80vh" }}>
            <Grid container spacing={2} alignItems="center" sx={{ margin: "auto" }}>
                {/* Input Column */}
                <Grid item lg={6}>
                        <Container onSubmit={handleSubmit} component={"form"} id="visualForm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", width: "fit-content" }}>
                            <InputSelectField value={isMain} size={12} sx={{ width: "100%" }} required options={typeSelOptions} label='Visuel principal ?' helpText='Si "Oui", ce visuel sera utilisé en tant que visuel de couverture' id='isMain' />
                                <InputBase error={isError} errorMessage={errorMessage} id='pic' label='Importer votre visuel' size={12} helpText="pour importer votre visuel cliquez sur le champs ci-dessous">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <MuiFileInput
                                            value={imageValue}
                                            onChange={handleChangeInput}
                                            id="pic"
                                            name='file'
                                            multiple={false}
                                            variant="outlined"
                                            error={isError}
                                            InputProps={{
                                                inputProps: {
                                                    accept: 'image/*',
                                                },
                                                startAdornment: <AppIcon name="AttachFile" />,
                                            }}
                                        />
                                        {imageValue && (
                                            <IconButton onClick={deleteImg} sx={{ marginLeft: 1 }}>
                                                <AppIcon name="Close" />
                                            </IconButton>
                                        )}
                                    </Box>
                                </InputBase>
                                <Italic fontSize={12} marginTop={2} textAlign="center">Votre visuel doit faire moins de 2mo<br/>Privilégiez le format <b>.webp</b> (optimisé pour le web),<br/> voici une <Link component="a" title="lien vers Online Image Tool" target='_blank' rel="noreferrer" href='https://www.onlineimagetool.com/fr/convert-png-jpg-webp-gif'>plateforme</Link> qui vous aidera convertir vos fichier</Italic>
                            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Enregistrer la photo</Button>
                        </Container>
                </Grid>

                {/* Image Display Column */}
                <Grid item lg={6}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper sx={{ width: 'fit-content' }}>{imageSrc && <Box component="img" src={imageSrc} alt="Selected" sx={{ maxWidth: '100%', maxHeight: '100%' }} />}</Paper>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}
