// #region IMPORTS -> /////////////////////////////////////
import { Box, Button, CircularProgress, Container, Divider, IconButton, Link, Paper, Rating, SxProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bold, Bolder, Regular } from '../common/Text';
import useShowsService from '~/hooks/services/useShowsService';
import { Comment, FullShow } from '~/models/shows';
import AppIcon from '../common/AppIcon';
import useModal from '~/hooks/useModal';
// import { MapContainer, Marker, Popup } from 'react-leaflet';
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
        // Modal.openModal("", <MapArea lat={data.lat} lon={data.long}/>, "xl", "paper");
    }
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getCurrentShow();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isLoading ? (
                <Box height={200} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <CircularProgress size={60} />
                </Box>
            ) : data ? (
                <Box sx={{ maxWidth: '858px', marginTop: 4 }}>
                    <Paper elevation={3}>
                        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Bolder fontSize={25}>{data.title}</Bolder>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Bold fontSize={18} sx={{ textDecoration: 'underline' }}>
                                        <Link component="a" href={data.areaLink} target="_blank" rel="noreferrer" sx={{ cursor: 'pointer', color: 'black' }}>
                                            {data.place}
                                        </Link>
                                    </Bold>
                                    <IconButton onClick={openMap} sx={{ ml: 0.5, padding: 0.3 }}>
                                        <AppIcon name="LocationOn" size="large" />
                                    </IconButton>
                                </Box>
                            </Box>
                            {new Date(data.endDate).getTime() < Date.now() && (
                                <Box>
                                    <Button href={data.ticketLink} component={'a'} role="button" target="_blank" rel="noreferrer" variant="contained">
                                        Réserver
                                    </Button>
                                </Box>
                            )}
                        </Box>
                        <Divider />

                        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Regular>{data.subDescription}</Regular>
                            </Box>
                            <Box>
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
                    return <CommentRating total={comments.length} data={c} sx={i > 0 ? { zIndex: 7 - i + '!important', animationDelay: duration * i + 's!important' } : null} />;
                })}
            </Box>
        </Box>
    );
}
function CommentRating({ data, sx, total }: IComment) {
    return (
        <Box sx={{ borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%', padding: 4, zIndex: 7, ...sx, animation: `opaqTransition ${total * duration}s cubic-bezier(0, 0, 0, 0.97) infinite` }} className="card-part">
            <Box sx={{ display: 'flex' }}>
                <Bold sx={{ fontSize: 17 }}>{data.title}</Bold>
                <Rating value={data.rating / 2} sx={{ ml: 2 }} />
            </Box>
            <Bold sx={{ textDecoration: 'underline', fontSize: 11 }}>{data.name}</Bold>
            <Regular sx={{ fontSize: 12 }}>{data.description}</Regular>
        </Box>
    );
}

// function MapArea({ lat, lon }) {
//     return (
//         <MapContainer zoom={13} center={[lat, lon]} scrollWheelZoom={false}>
//             <Marker position={[lat, lon]}>
//                 <Popup>
//                     A pretty CSS3 popup. <br /> Easily customizable.
//                 </Popup>
//             </Marker>
//         </MapContainer>
//     );
// }

interface IComment {
    data: Comment;
    sx: SxProps;
    total: number;
}
