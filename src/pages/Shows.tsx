// #region IMPORTS -> /////////////////////////////////////
import { Box, Button, Divider, Grid } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import TabsView from '~/components/common/TabsView';
import { Bold, Regular } from '~/components/common/Text';
import { QueryResult } from '~/core/types/serverCoreType';
import useShowsService from '~/hooks/services/useShowsService';
import { FullShow } from '~/models/shows';
import ImgPLaceholder from '~/assets/pictures/image_placeholder.webp';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import stylesResources from '~/resources/stylesResources';
import AppGridContainer from '~/components/common/AppGridContainer';
import PhotoGallery from '~/components/shows/PhotoGallery';
import useNavigation from '~/hooks/useNavigation';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Shows() {
    // #region STATE --> ///////////////////////////////////////
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<QueryResult<FullShow>>(null);
    const [views, setViews] = useState<ReactNode[]>([]);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const ShowService = useShowsService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const fetchShows = async () => {
        await ShowService.getFullShowsList()
            .then((res) => setData(res))
            .finally(() => setIsLoading(false));
    };

    const buildViews = () => {
        if (data) {
            data.records.forEach((s) => {
                setViews((prevState) => [...prevState, <ShowDetails data={s} />]);
            });
        } else {
            return <></>;
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        fetchShows();
    }, []);
    useEffect(() => {
        buildViews();
    }, [data]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {isLoading ? (
                <AppFullPageLoader isLoading />
            ) : (
                <Box className="mt-4">
                    <TabsView tabTitles={data.records.map((s) => s.title)} content={views} />
                </Box>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
function ShowDetails({ data }: IShowsDetails) {
    const [imgError, setImgError] = useState<boolean>(false);
    return (
        <>
            <AppGridContainer sx={{ marginTop: 0, marginBottom: 4, '& > div': { paddingTop: 0 } }}>
                <Grid xs={12} md={9} item sx={{ paddingLeft: '0!important', paddingRight: 8 }} className="pt-0">
                    {/* <Bold fontSize={18}>{data.title.toUpperCase()}</Bold> */}
                    <Regular>{data.description}</Regular>
                </Grid>
                <Grid item xs={12} md={3} display="flex" className="p-0" justifyContent={'center'}>
                    <Box component={'img'} onError={() => setImgError(true)} maxWidth={'300px'} src={imgError ? ImgPLaceholder : data.cover.url} />
                </Grid>
            </AppGridContainer>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: 4 }}>
                <PhotoGallery medias={data.media} />
            </Box>
        </>
    );
}
interface IShowsDetails {
    data: FullShow;
}
// #enderegion IPROPS --> //////////////////////////////////
