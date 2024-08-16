// #region IMPORTS -> /////////////////////////////////////
import { Box, Button, CircularProgress, Divider, Link, MobileStepper, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { QueryResult } from '~/core/types/serverCoreType';
import useNewsPaperService from '~/hooks/services/useNewsPaperService';
import { Article, ArticleAttachementTypeEnum } from '~/models/articles';
import { Bold, Italic, Regular } from '../common/Text';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AppIcon from '../common/AppIcon';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import SectionLayout from '../Layout/SectionLayout';
import ToolTips from '../common/AppTooltips';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function NewsPapers() {
    // #region STATE --> ///////////////////////////////////////
    const [data, setData] = useState<QueryResult<Article>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeStep, setActiveStep] = useState<number>(0);
    const maxSteps = data ? data.records.length : 0;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const NewsPaperService = useNewsPaperService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getNews = async () => {
        setIsLoading(true);
        await NewsPaperService.getArticle()
            .then((res) => setData(res))
            .finally(() => setIsLoading(false));
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getNews();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            {isLoading ? (
                <Box className="d-flex justify-content-center align-items-center flex-column" sx={{ height: '200px' }}>
                    <CircularProgress size={60} />
                    <Regular className="mt-4" sx={{ marginTop: 3 }}>
                        Chargement des article de press en cours...
                    </Regular>
                </Box>
            ) : (
                <SectionLayout title="Ils en parlent">
                    <Box className="d-flex justify-content-center align-items-center mb-4 flex-column mt-3">
                        <Paper elevation={3} sx={{ maxWidth: '950px', minWidth: '0%' }} className="p-3">
                            <NewsPaperDetails data={data.records[activeStep]} />
                            <MobileStepper
                                variant="text"
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                        <AppIcon name="ArrowForwardIos" />
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        <AppIcon name="ArrowBackIos" />
                                    </Button>
                                }
                            />
                        </Paper>
                    </Box>
                </SectionLayout>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

function NewsPaperDetails({ data }: IDetails) {
    const renderMedia = (url: string, type: ArticleAttachementTypeEnum) => {
        if (url) {
            switch (type) {
                case ArticleAttachementTypeEnum.AUDIO:
                    return <AudioPlayer src={url} />;
                case ArticleAttachementTypeEnum.VIDEO:
                    return <></>;
                case ArticleAttachementTypeEnum.YOUTUBE:
                    return <></>;
                default:
                    return <></>;
            }
        } else {
            return <></>;
        }
    };

    return (
        <>
            <Box sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: { xs: 'center', sm: 'normal' } }} className="d-flex align-items-center">
                <Box className="me-3">
                    <ToolTips textContent="Accéder à l'article">
                        <Link variant="h5" href={data.url} target="_blank" rel="noreferrer" sx={{ fontWeight: 'bold' }} className="d-flex align-items-center">
                            {data.title}
                            <AppIcon sx={{ display: { xs: 'none', md: 'block' } }} name="Link" className="ms-2" />
                        </Link>
                    </ToolTips>
                    <Italic fontSize={15} className="my-2">
                        <b style={{ fontSize: 25 }}>«</b> {data.description} <b style={{ fontSize: 25 }}>»</b>
                    </Italic>
                </Box>
                <Box>
                    <Box component="img" width={'100px'} src={data.providerImg} />
                </Box>
            </Box>
            <Box className="my-4">{renderMedia(data.attachementUrl, data.attachementType)}</Box>
        </>
    );
}

// #region IPROPS -->  /////////////////////////////////////
interface IDetails {
    data: Article;
}
// #enderegion IPROPS --> //////////////////////////////////
