import { Box, Button, Container, Divider, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GenericActionEnum, ICenterBase } from '~/core/types/centerTypes';
import appTool from '~/helpers/appTool';
import useResources from '~/hooks/useResources';
import AppIcon from '../common/AppIcon';
import stylesResources from '~/resources/stylesResources';
import AppCenterSearch from './AppCenterSearch';
import { Bold, Regular } from '../common/Text';
import Modal from '../common/Modal';
import { Trans } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import InputImportFile from '../formMaker/elements/InputImportFIle';
import AppAlert from '../common/AppAlert';
import useNavigation from '~/hooks/useNavigation';
import NavigationResource from '~/resources/navigationResources';

/**
 *
 * @param {ICenterBase} props
 * @returns Center layout
 */
export default function CenterBase(props: ICenterBase) {
    const [isBulkVisible, setIsBulkVisible] = useState<boolean>(false);
    const [bulkType, setBulkType] = useState<'new' | 'update'>(null);
    const [isTemplateDisabled, setIsTemplateDisabled] = useState<boolean>(false);
    const [bulkValue, setIsBulkValue] = useState<File[]>(null);
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const Resources = useResources();

    const onClickBulkNew = () => {
        setIsBulkVisible(!isBulkVisible);
        setBulkType('new');
    };
    const onClickBulkUpdate = () => {
        setIsBulkVisible(!isBulkVisible);
        setBulkType('update');
    };

    const handleBulkTemplateClick = () => {
        props.onBulkTemplateClick(bulkType);
        setIsTemplateDisabled(true);
    };

    const checkFiles = () => {
        if (!bulkValue) {
            setIsAlertVisible(true);
            setAlertMessage('un fichier est requis');
            return;
        }
        props.onBulkSend(bulkValue, bulkType);
    };

    useEffect(() => {
        if (props.action === GenericActionEnum.TABLE) {
            appTool.changeTitle(props.grammar.plural);
        } else {
            appTool.changeTitle(props.prefix ? props.prefix + ' ' + props.grammar.singular : props.grammar.singular);
        }
    }, []);

    useEffect(() => {
        if (isTemplateDisabled) {
            setTimeout(() => {
                setIsTemplateDisabled(false);
            }, 2000);
        }
    }, [isTemplateDisabled]);

    return (
        <Container className='my-4'>
            <Box display="flex" alignItems="center" marginBottom={2}>
                {props.icon && <AppIcon name={props.icon} sx={{ fontSize: '3.3rem' }} className="me-2" color="primary" />}
                <Typography variant="h3" color={stylesResources.theme.palette.primary.main} component="h2">
                    {props.prefix ? props.prefix + ' ' + props.grammar.singular : props.grammar.plural}
                </Typography>
            </Box>
            {props.action === GenericActionEnum.TABLE && (
                <Box marginBottom={2}>
                    <Box display={'flex'} marginBottom={{ xs: 1, md: 0 }} flexWrap={'wrap'} justifyContent={'space-between'}>
                        <AppCenterSearch grammar={props.grammar} onSubmitSearchForm={props.onSubmitSearchForm} searchFormStruct={props.searchForm} needToQuery={props.needToQuery} />
                        {(props.bulkNew || props.bulkUpdate) ? (
                            <Box marginBlock={2} display={'flex'}>
                                {props.bulkNew && (
                                    <Button onClick={onClickBulkNew} sx={{ marginRight: props.bulkUpdate ? 2 : 0 }} variant="outlined">
                                        {Resources.translate('center.bulk.bulkAdd')}
                                    </Button>
                                )}
                                {props.bulkUpdate && (
                                    <Button onClick={onClickBulkUpdate} variant="outlined">
                                        {Resources.translate('center.bulk.bulkUpdate')}
                                    </Button>
                                )}
                            </Box>
                        ) : null}
                    </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link component="a" href={`${NavigationResource.routesPath.center}?Table=${props.entity}&action=new`}>
                                <Bold>
                                    {Resources.translate('common.add')} {props.grammar.singular.toLowerCase()}
                                </Bold>
                            </Link>
                        </Box>
                    <Modal
                        modalTitle={Resources.translate('center.bulk.bulkTitle', { grammar: props.grammar.plural.toLowerCase(), action: bulkType === 'new' ? Resources.translate('common.add') : Resources.translate('common.update') })}
                        closable
                        isOpen={isBulkVisible}
                        onClose={() => {
                            setIsBulkVisible(!isBulkVisible);
                            setIsAlertVisible(false);
                        }}
                        modalAction={() => checkFiles()}
                        modalActionLabel={bulkType === 'new' ? Resources.translate('common.add') : Resources.translate('common.update')}
                        dismissLabel={Resources.translate('common.dismiss')}
                        isModalActionLoading={props.isBulkLoading}
                    >
                        <Box marginBottom={2}>
                            <Trans i18nKey="center.bulk.bulkAddMessage" values={{ grammar: props.grammar.plural.toLowerCase(), action: bulkType === 'new' ? Resources.translate('common.youAdd') : Resources.translate('common.youUpdate') }} />
                            <Divider sx={{ marginBlock: 3 }} />
                            <LoadingButton loading={props.isTemplateLoading} size="large" disabled={isTemplateDisabled} onClick={handleBulkTemplateClick} variant="outlined">
                                {Resources.translate('center.bulk.downloadTemplate')}
                            </LoadingButton>
                        </Box>
                        <AppAlert title={alertMessage} onClose={() => setIsAlertVisible(false)} severity="error" isVisible={isAlertVisible} />
                        <InputImportFile onChange={(e) => setIsBulkValue(e)} dropzoneText={Resources.translate('center.bulk.importXlsx')} typeFile={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']} filesLimit={4} />
                    </Modal>
                    <Typography>
                        <b>{props.totalCount}</b> {props.totalCount > 1 ? props.grammar.plural : props.grammar.singular}
                    </Typography>
                    <Divider />
                </Box>
            )}
            <AppAlert onClose={props.onCloseAlert} isVisible={props.isAlertVisible} severity={props.alertContent?.severity ?? 'error'} title={props.alertContent?.title ?? ''} subtitle={props.alertContent?.subtitle ?? ''} />
            <Box>{props.children}</Box>
            {props.action === GenericActionEnum.VIEW && <SubmitSubFooter />}
            <Modal isOpen={props.isValidateModalVisible} closable onClose={props.validateModaleOnClose} modalTitle={props.validateModalContent?.title ?? ''}>
                <Regular dangerouslySetInnerHTML={{ __html: props.validateModalContent?.message ?? '' }}></Regular>
            </Modal>
        </Container>
    );
}

function SubmitSubFooter() {
    const navigation = useNavigation();
    const Resources = useResources();
    return (
        <Box display="flex" justifyContent="center">
            <Button variant="contained" className="ms-3" color="secondary" onClick={() => navigation.goBack()}>
                {Resources.translate("common.back")}
            </Button>
        </Box>
    );
}
