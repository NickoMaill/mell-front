// #region IMPORTS -> /////////////////////////////////////
import 'leaflet/dist/leaflet.css';
import { Box, Button, CircularProgress, Container, Divider, IconButton, Link, Paper, Rating, SxProps } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Bold, Bolder, Italic, Regular } from '../common/Text';
import useShowsService from '~/hooks/services/useShowsService';
import { Comment, FullShow } from '~/models/shows';
import AppIcon from '../common/AppIcon';
import useModal from '~/hooks/useModal';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import moment from 'moment';
import SectionLayout from '../Layout/SectionLayout';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const duration = 3;
// #endregion SINGLETON --> /////////////////////////////////

export default function CurrentShow() {
    // #region STATE --> ///////////////////////////////////////
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<FullShow>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const ShowService = useShowsService();
    const Modal = useModal();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getCurrentShow = async () => {
        setIsLoading(true);
        await ShowService.getCurrentShow()
            .then((res) => {
                if (res.totalRecords > 0) {
                    setData(res.records[0]);
                }
            })
            .finally(() => setIsLoading(false));
    };

    const openMap = () => {
        Modal.openModal('Carte', <MapArea lat={data.lat} address={data.address + ', ' + data.postalCode} place={data.place} lon={data.long} />, 'xl');
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getCurrentShow();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <SectionLayout title="Mon dernier spectacle">
            <Box className="d-flex flex-column align-items-center">
                {isLoading ? (
                    <Box className="d-flex justify-content-center align-items-center flex-column" sx={{ height: '200px' }}>
                        <CircularProgress size={60} />
                        <Regular className="mt-4">Chargement du spectacle en cours...</Regular>
                    </Box>
                ) : data ? (
                    <Box className="mt-4" sx={{ maxWidth: '858px' }}>
                        <Paper elevation={3}>
                            <Box className="p-2 justify-content-between d-flex flex-wrap">
                                <Box>
                                    <Bolder fontSize={25}>{data.title}</Bolder>
                                    <Box className="d-flex align-items-center">
                                        <Bold fontSize={18} className="text-decoration-underline">
                                            <Link component="a" href={data.areaLink} target="_blank" rel="noreferrer" className="text-dark cursor-pointer">
                                                {data.place}
                                            </Link>
                                        </Bold>
                                        <IconButton onClick={() => openMap()} className="ms-1 p-1">
                                            <AppIcon name="LocationOn" size="large" />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box position="relative">
                                    {new Date(data.endDate).getTime() > Date.now() ? (
                                        <Button href={data.ticketLink} component={'a'} role="button" target="_blank" rel="noreferrer" variant="contained">
                                            Réserver
                                        </Button>
                                    ) : (
                                        <Italic>Terminé depuis le {moment(data.endDate).format('DD/MM/YYYY')}</Italic>
                                    )}
                                </Box>
                            </Box>
                            <Divider />

                            <Box className="p-4 d-flex justify-content-between align-items-center" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                                <Box>
                                    <Regular>{data.subDescription}</Regular>
                                </Box>
                                <Box sx={{ display: { xs: 'flex', sm: 'block' }, width: { xs: '100%', sm: '200px' }, justifyContent: { xs: 'center', sm: 'normal' } }}>
                                    <Box component="img" src={data.cover.url} title={`Affiche de ${data.title}`} width={'200px'} />
                                </Box>
                            </Box>
                            <CommentScroller comments={data.comments} />
                        </Paper>
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </SectionLayout>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #enderegion IPROPS --> //////////////////////////////////
function CommentScroller({ comments = [] }: { comments: Comment[] }) {
    return (
        <Box className="card-scroller">
            <Box>
                {comments.map((c, i) => {
                    return <CommentRating key={i} total={comments.length} data={c} sx={i > 0 ? { zIndex: 7 - i + '!important', animationDelay: duration * i + 's!important' } : null} />;
                })}
            </Box>
        </Box>
    );
}
function CommentRating({ data, sx, total }: IComment) {
    return (
        <Box sx={{ borderBottomLeftRadius: '10%', borderBottomRightRadius: '10%', padding: 4, zIndex: 7, ...sx, animation: `opaqTransition ${total * duration}s cubic-bezier(0, 0, 0, 0.97) infinite` }} className="card-part">
            <Box sx={{ display: 'flex' }}>
                <Bold sx={{ fontSize: 17 }}>{data.title}</Bold>
                <Rating value={data.rating / 2} sx={{ ml: 2 }} />
            </Box>
            <Bold sx={{ textDecoration: 'underline', fontSize: 11 }}>{data.name}</Bold>
            <Regular sx={{ fontSize: 12 }}>{data.description}</Regular>
        </Box>
    );
}

function MapArea({ lat, lon, address, place }) {
    const ref = useRef(null);
    return (
        <MapContainer ref={ref} style={{ height: '80vh', width: '100%' }} center={[lat, lon]} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lon]}>
                <Popup>
                    <Regular>
                        <b>{address}</b>
                        <br />
                        <u>{place}</u>
                    </Regular>
                </Popup>
            </Marker>
        </MapContainer>
    );
}

interface IComment {
    data: Comment;
    sx: SxProps;
    total: number;
}
