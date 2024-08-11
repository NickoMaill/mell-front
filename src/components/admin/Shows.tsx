// #region IMPORTS -> /////////////////////////////////////
import AppCenter from '../center/AppCenter';
import AppTable, { AppTableStructure } from '../common/AppTable';
import moment from 'moment';
import { ChangeEvent, FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react';
import { FormMakerContentType, FormMakerPartEnum, SelectOptionsType } from '~/core/types/FormMakerCoreTypes';
import useMapService from '~/hooks/services/useMapService';
import { MapType } from '~/models/map';
import { ShowApiModel } from '~/models/shows';
import { QueryResult } from '~/core/types/serverCoreType';
import { Box, Button, Container, Grid, IconButton, Link, Paper, setRef, Typography } from '@mui/material';
import { Bold, Italic, Regular } from '../common/Text';
import AppFullPageModal from '../common/AppFullPageModal';
import ImagePlaceHolder from '~/assets/pictures/image_placeholder.webp';
import LoaderPlaceHolder from '~/assets/pictures/loader_visu_placeholder.gif';
import { MuiFileInput } from 'mui-file-input';
import AppIcon from '../common/AppIcon';
import { Media, MediaGroupEnum, MediaPayloadType, MediaStatus } from '~/models/medias';
import InputSelectField from '../formMaker/elements/InputSelectField';
import InputBase from '../formMaker/elements/InputBase';
import useNotification from '~/hooks/useNotification';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import useModal from '~/hooks/useModal';
import useMediasService from '~/hooks/services/useMediasService';
import ModalContext from '~/context/modalContext';
import { LoadingButton } from '@mui/lab';
import useResources from '~/hooks/useResources';
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
    const Resources = useResources();
    
    const col: AppTableStructure<ShowApiModel> = {
        defaultSort: { field: 'startDate', sort: 'desc' },
        actions: ['view', 'update', 'delete'],
        colStruct: [
            { headerField: 'id', headerLabel: 'ID', sortable: true, type: 'number', width: 90 },
            { headerField: 'title', headerLabel: Resources.translate("shows.form.field.title"), sortable: true, type: 'string', width: 200 },
            { headerField: 'startDate', headerLabel: Resources.translate("shows.form.field.startedAt"), sortable: true, defaultSorted: true, defaultSortedOrder: "desc", type: 'date', width: 150, valueFormatter: (e) => moment(e).format('DD/MM/YYYY') },
            { headerField: 'endDate', headerLabel: Resources.translate("shows.form.field.endDate"), sortable: true, type: 'dateTime', width: 150, valueFormatter: (e) => moment(e).format('DD/MM/YYYY') },
            { headerField: "place", headerLabel: "Salle", sortable: true, type: "string" },
            { headerField: "country", headerLabel: "Pays", sortable: true, type: "string" },
            { headerField: "city", headerLabel: "Ville", sortable: true, type: "string" }
        ],
    };

    const searchForm: FormMakerContentType<FormMakerPartEnum.SEARCH>[] = [
        {
            title: '',
            content: [
                {
                    id: 'title',
                    label: Resources.translate("shows.form.field.title"),
                    index: 1,
                    type: 'text',
                    size: 12,
                },
                {
                    id: 'city',
                    label: Resources.translate("shows.form.field.city"),
                    index: 1,
                    type: 'text',
                    size: 12,
                },
                {
                    id: 'addedAt',
                    label: Resources.translate("shows.form.field.addedAt"),
                    index: 1,
                    type: 'date',
                    size: 12,
                },
            ],
        },
    ];

    const formStructure: FormMakerContentType<FormMakerPartEnum.TAB>[] = [
        {
            title: Resources.translate("shows.form.tab.info"),
            type: FormMakerPartEnum.TAB,
            content: [
                {
                    title: Resources.translate("shows.form.panel.info"),
                    icon: 'FormatListBulleted',
                    content: [
                        {
                            id: 'title',
                            label: Resources.translate("shows.form.field.title"),
                            index: 1,
                            type: 'text',
                            size: 12,
                            icon: 'Title',
                            required: true,
                        },
                        {
                            id: 'place',
                            label: Resources.translate("shows.form.field.place"),
                            index: 1,
                            type: 'text',
                            size: 6,
                            icon: 'TheaterComedy',
                            required: true,
                        },
                        {
                            id: 'address',
                            label: Resources.translate("shows.form.field.address"),
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
                            label: Resources.translate("shows.form.field.postalCode"),
                            index: 1,
                            type: 'text',
                            size: 2,
                            value: postalCode,
                            icon: 'Place',
                        },
                        {
                            id: 'city',
                            label: Resources.translate("shows.form.field.city"),
                            index: 2,
                            type: 'text',
                            size: 2,
                            value: city,
                            icon: 'LocationCity',
                        },
                        {
                            id: 'country',
                            label: Resources.translate("shows.form.field.country"),
                            index: 3,
                            type: 'text',
                            size: 2,
                            value: country,
                            icon: 'Public',
                        },
                        {
                            id: 'startDate',
                            label: Resources.translate("shows.form.field.startedAt"),
                            index: 4,
                            type: 'date',
                            size: 2,
                            icon: 'CalendarViewDay',
                        },
                        {
                            id: 'endDate',
                            label: Resources.translate("shows.form.field.endDate"),
                            index: 5,
                            type: 'date',
                            size: 2,
                            icon: 'CalendarViewDay',
                        },
                        {
                            id: 'schedule',
                            label: Resources.translate("shows.form.field.schedule"),
                            index: 6,
                            type: 'time',
                            size: 2,
                            icon: 'LockClock',
                        },
                        {
                            id: 'subDescription',
                            label: Resources.translate("shows.form.field.subDescription"),
                            index: 1,
                            type: 'textarea',
                            size: 12,
                            icon: 'Notes',
                        },
                        {
                            id: 'description',
                            label: Resources.translate("shows.form.field.description"),
                            index: 1,
                            type: 'textarea',
                            size: 12,
                            icon: 'Notes',
                        },
                        {
                            id: 'showOnLanding',
                            label: Resources.translate("shows.form.field.showOnLanding"),
                            index: 1,
                            type: 'radio',
                            size: 3,
                            radioOptions: [
                                { label: Resources.translate("common.yes"), value: true },
                                { label: Resources.translate("common.no"), value: false },
                            ],
                        },
                        {
                            id: 'areaLink',
                            label: Resources.translate("shows.form.field.areaLink"),
                            index: 2,
                            type: 'url',
                            size: 3,
                            icon: 'Link',
                        },
                        {
                            id: 'ticketLink',
                            label: Resources.translate("shows.form.field.ticketLink"),
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
            title: Resources.translate("shows.form.tab.visual"),
            icon: 'InsertPhoto',
            type: FormMakerPartEnum.TAB,
            hide: action === 'new',
            content: [
                {
                    title: Resources.translate("shows.form.panel.visual"),
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
                grammar={{ plural: Resources.translate("shows.plural"), singular: Resources.translate("shows.singular"), isFem: false }}
                specifiers={{ singular: Resources.translate("common.specifiers.masc"), plural: Resources.translate("common.specifiers.plural") }}
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

    const handleCloseOpen = (id?: number, del: boolean = false) => {
        Modal.openModal(id ? (del ? 'Supprimer le visuel' : 'Modifier le visuel') : 'Ajouter un visuel', <PhotoForm showId={showId} id={id} onSubmitted={() => fetchPhotos()} mode={id ? (del ? 'delete' : 'update') : 'new'} />, 'sm', 'body', false, true);
    };

    const fetchPhotos = async () => {
        setIsLoading(true);
        await MediaService.getShowPic(showId)
            .then((res) => setRows(res))
            .finally(() => setIsLoading(false));
    };
    const header: AppTableStructure<Media, any> = {
        colStruct: [
            { headerField: 'id', headerLabel: 'ID', width: 90, type: 'number', sortable: false },
            { headerField: 'url', headerLabel: 'Aperçu', width: 90, type: 'custom', sortable: false, valueFormatter: (e) => <Box component="img" src={e} width={40} /> },
            { headerField: 'isVideo', headerLabel: 'Catégorie', width: 100, type: 'boolean', sortable: false, valueFormatter: (e) => ((e as boolean).toString() === 'true' ? 'Vidéo' : 'Image') },
            { headerField: 'isMain', headerLabel: 'Visuel de couverture', type: 'boolean', sortable: false, valueFormatter: (e) => ((e as boolean).toString() === 'true' ? <AppIcon name="Check" color="success" /> : <></>) },
            { headerField: 'height', headerLabel: 'Dimension (hauteur)', type: 'number', sortable: false, valueFormatter: (e) => `${e}px` },
            { headerField: 'width', headerLabel: 'Dimension (largeur)', type: 'number', sortable: false, valueFormatter: (e) => `${e}px` },
            { headerField: 'type', headerLabel: 'Format', type: 'string', sortable: false },
            { headerField: 'addedAt', headerLabel: 'Ajouté le', type: 'date', sortable: false, valueFormatter: (e) => moment(e).format('DD/MM/YYYY') },
        ],
        actions: [
            {
                title: 'Modifier',
                icon: 'CreateRounded',
                onClick: (e) => handleCloseOpen(e.row.id),
            },
            {
                title: 'Supprimer',
                icon: 'Delete',
                onClick: (e) => handleCloseOpen(e.row.id, true),
            },
        ],
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
            <AppTable
                entity="Medias"
                onPageChange={(e) => setCurrentPage(e)}
                currentPage={currentPage}
                rowsPerPage={5}
                rows={rows}
                columns={header}
                isTableLoading={isLoading}
                onExportClick={() => null}
                isRowsCheckable={false}
                onRowClick={(e) => handleCloseOpen(e.row.id)}
                actions={header.actions}
            />
            <Link component="a" onClick={() => handleCloseOpen()} role={'button'} sx={{ mt: 2, cursor: 'pointer' }}>
                <Bold>Ajouter visuel</Bold>
            </Link>
        </Container>
    );
}

interface IPicturesImport {
    showId: number;
    id?: number;
    onSubmitted?: () => void;
    mode?: 'new' | 'update' | 'delete';
}

function PhotoForm({ showId, id, onSubmitted, mode }: IPicturesImport) {
    const [imageSrc, setImageSrc] = useState<string>(id ? LoaderPlaceHolder : ImagePlaceHolder);
    const [imageValue, setImageValue] = useState<File>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(null);
    const [isMain, setIsMain] = useState<string>('false');
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

    const Notification = useNotification();
    const MediaService = useMediasService();
    const ModalCtx = useContext(ModalContext);

    const typeSelOptions: SelectOptionsType[] = [
        { value: 'true', label: 'Oui' },
        { value: 'false', label: 'Non' },
    ];
    const types = ['image/png', 'image/jpg', 'image/webp', 'image/jpeg'];

    const handleChangeInput = (e: File) => {
        if (!types.includes(e.type.toLowerCase())) {
            setIsError(true);
            setErrorMessage('Votre fichier doit être au format .jpg, .jpeg, .png, ou .webp');
        } else if (e.size > 2000000) {
            setIsError(true);
            setErrorMessage('Votre fichier doit faire moins de 2mo');
        } else {
            setImageValue(e);
            setIsError(false);
            setErrorMessage(null);
        }
    };

    const fetchVisu = async () => {
        if (id) {
            await MediaService.getPic(id).then((res) => {
                setImageSrc(res.records[0].url);
                setIsMain(res.records[0].isMain.toString());
            });
        }
    };

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
        setIsError(false);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        setIsBtnLoading(true);
        switch (mode) {
            case 'new':
                await create(form);
                break;
            case 'delete':
                await del();
                break;
            case 'update':
                await update(form);
                break;
            default:
                throw new AppError(ErrorTypeEnum.Functional, 'unknown mode', 'unknown_mode');
        }
    };

    const update = async (form: FormData) => {
        await MediaService.updatePic(id, form)
            .then((res) => {
                if (res) {
                    onSubmitted();
                    ModalCtx.setIsOpen(false);
                }
            })
            .finally(() => setIsBtnLoading(false));
    };
    const del = async () => {
        await MediaService.deletePic(id)
            .then((res) => {
                if (res) {
                    onSubmitted();
                    ModalCtx.setIsOpen(false);
                }
            })
            .finally(() => setIsBtnLoading(false));
    };
    const create = async (form: FormData) => {
        if (isError || imageValue === null) {
            Notification.error('Veuillez fournir une image valide pour continuer');
            setIsError(true);
            throw new AppError(ErrorTypeEnum.Functional, 'Veuillez fournir une image valide pour continuer', 'invalid_file');
        }

        const payload: MediaPayloadType = {
            type: 'image',
            isVideo: false,
            status: MediaStatus.SHOWS,
            sortOrder: 1,
            mediaGroupId: showId,
            mediaGroup: MediaGroupEnum.SHOWS,
            name: '',
        };

        for (const p in payload) {
            form.append(p, payload[p]);
        }
        await MediaService.addPic(form)
            .then((res) => {
                if (res) {
                    onSubmitted();
                    ModalCtx.setIsOpen(false);
                }
            })
            .finally(() => setIsBtnLoading(false));
    };

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
        <Container sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative', height: '80vh' }}>
            <Grid container spacing={2} alignItems="center" sx={{ margin: 'auto', justifyContent: { xs: 'center' } }}>
                <Grid item lg={6} sx={{ marginBottom: 2 }}>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper sx={{ width: 'fit-content', padding: 2 }}>{imageSrc && <Box component="img" src={imageSrc} alt="Selected" sx={{ maxWidth: '100%', maxHeight: '100%' }} />}</Paper>
                    </Container>
                </Grid>
                <Grid item lg={6} sx={{ marginBottom: { xs: 2 } }}>
                    <Container onSubmit={handleSubmit} component={'form'} id="visualForm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 'fit-content' }}>
                        {mode === 'delete' && (
                            <Box>
                                <Regular display={'flex'} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
                                    <AppIcon sx={{ mr: 1 }} name="WarningRounded" color="warning" />
                                    <b>Attention, vous êtes sur le point du supprimer ce visuel</b>
                                    <AppIcon sx={{ ml: 1 }} name="WarningRounded" color="warning" />.
                                </Regular>
                                <Regular textAlign={'center'}>Si celui est un couverture pour votre spectacle, n'oubliez d'en assigner une nouvelle</Regular>
                            </Box>
                        )}
                        {mode !== 'delete' && <InputSelectField value={isMain} size={12} sx={{ width: '100%' }} required options={typeSelOptions} label="Visuel principal ?" helpText='Si "Oui", ce visuel sera utilisé en tant que visuel de couverture' id="isMain" />}
                        {mode === 'new' && (
                            <>
                                <InputBase error={isError} errorMessage={errorMessage} id="pic" label="Importer votre visuel" size={12} helpText="pour importer votre visuel cliquez sur le champs ci-dessous">
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <MuiFileInput
                                            value={imageValue}
                                            onChange={handleChangeInput}
                                            id="pic"
                                            name="file"
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
                                <Italic fontSize={12} marginTop={2} textAlign="center">
                                    Votre visuel doit faire moins de 2mo
                                    <br />
                                    Privilégiez le format <b>.webp</b> (optimisé pour le web),
                                    <br /> voici une{' '}
                                    <Link component="a" title="lien vers Online Image Tool" target="_blank" rel="noreferrer" href="https://www.onlineimagetool.com/fr/convert-png-jpg-webp-gif">
                                        plateforme
                                    </Link>{' '}
                                    qui vous aidera convertir vos fichier
                                </Italic>
                            </>
                        )}
                        <LoadingButton loading={isBtnLoading} type="submit" variant="contained" sx={{ marginTop: 2 }}>
                            {mode === 'delete' ? 'Supprimer le visuel' : mode === 'update' ? 'Modifier le visuel' : 'Ajouter le visuel'}
                        </LoadingButton>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
}

function CommentsTable() {
    
}