// #region IMPORTS -> /////////////////////////////////////
import { Box, Button, Dialog, Divider, MobileStepper, Paper } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import TabsView from '~/components/common/TabsView';
import { Bold, Bolder, Regular } from '~/components/common/Text';
import { QueryResult } from '~/core/types/serverCoreType';
import useShowsService from '~/hooks/services/useShowsService';
import { FullShow } from '~/models/shows';
import ImgPLaceholder from '~/assets/pictures/image_placeholder.webp';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Media } from '~/models/medias';
import AppIcon from '~/components/common/AppIcon';
import stylesResources from '~/resources/stylesResources';
import Modal from '~/components/common/Modal';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const grey = stylesResources.theme.palette.grey[300];
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
                <Box sx={{ marginTop: 3 }}>
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
            <Bold fontSize={18}>{data.title.toUpperCase()}</Bold>
            <Divider />
            <Box sx={{ display: 'flex', marginTop: 2, alignItems: 'center' }}>
                <Box sx={{ paddingRight: 4 }}>
                    <Regular>{data.description}</Regular>
                </Box>
                <Box>
                    <Box component={'img'} onError={() => setImgError(true)} maxWidth={'280px'} src={imgError ? ImgPLaceholder : data.cover.url} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Carrousel medias={data.media} />
            </Box>
        </>
    );

    function Carrousel({ medias }: ICarousel) {
        const [activeStep, setActiveStep] = useState<number>(0);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [selected, setSelected] = useState<string>(null);
        const maxSteps = medias.length;

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleStepChange = (step: number) => {
            setActiveStep(step);
        };
        const handleOpenClose = (src: string = null) => {
            setIsOpen(!isOpen);
            setSelected(src);
        };
        return (
            <Paper elevation={5} sx={{ flexGrow: 1, maxWidth: '800px', backgroundColor: grey, padding: 2 }}>
                <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                    {medias.map((m, i) => (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }} key={m.id}>
                            {Math.abs(activeStep - i) <= 2 ? (
                                <Box
                                    component="img"
                                    onClick={() => handleOpenClose(m.url)}
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        maxWidth: '800px',
                                        maxHeight: '500px',
                                    }}
                                    src={m.url}
                                    alt={`photo n° ${i}`}
                                />
                            ) : null}
                        </Box>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    sx={{ backgroundColor: grey }}
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            <AppIcon name="ArrowForwardRounded" />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <AppIcon name="ArrowBackRounded" />
                        </Button>
                    }
                />
                <Dialog open={isOpen} maxWidth="xl" sx={{ maxWidth: null }} onClose={handleOpenClose}>
                    <Box
                        component={'img'}
                        src={selected}
                        sx={{
                            display: 'block',
                            overflow: 'hidden',
                            maxWidth: '1000px',
                            maxHeight: '700px',
                        }}
                    />
                </Dialog>
            </Paper>
        );
    }
}

interface IShowsDetails {
    data: FullShow;
}

interface ICarousel {
    medias: Media[];
}
// #enderegion IPROPS --> //////////////////////////////////
