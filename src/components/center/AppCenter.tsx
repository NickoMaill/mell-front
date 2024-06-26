// #region IMPORTS -> /////////////////////////////////////
import { useContext, useEffect, useState } from 'react';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import { GenericActionEnum, ICenter, ICenterBase } from '~/core/types/centerTypes';
import FormMaker from '../formMaker/FormMaker';
import appTool from '~/helpers/appTool';
import { QueryResult } from '~/core/types/serverCoreType';
import AppTable from '../common/AppTable';
import { GridPaginationModel, GridRowSelectionModel } from '@mui/x-data-grid';
import AppFullPageLoader from '../common/AppFullPageLoader';
import useNavigation from '~/hooks/useNavigation';
import useServiceBase from '~/hooks/useServiceBase';
import useService from '~/hooks/useService';
import { ApiErrorType } from '~/core/types/ApiError';
import SearchContext, { SearchField } from '~/context/searchContext';
import moment from 'moment';
import AppContext, { AlertContextType } from '~/context/appContext';
import CenterBase from './CenterBase';
import SessionContext from '~/context/sessionContext';
import useResources from '~/hooks/useResources';
import NavigationResource from '~/resources/navigationResources';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const centerBasePath = NavigationResource.routesPath.center;
type CenterLoader = {
    isLoading: boolean;
    isBulkTemplateLoading: boolean;
    isBulkSending: boolean;
    isSubmitLoading: boolean;
};
type CenterGlobalBool = {
    isValidateModalVisible: boolean;
    gotQuery: boolean;
    isAccessGranted: boolean;
    isAlertVisible: boolean;
    isAllRowSelected: boolean;
};
const initLoader = {
    isLoading: true,
    isBulkTemplateLoading: false,
    isBulkSending: false,
    isSubmitLoading: false,
};
const initGlobalBool = {
    isValidateModalVisible: false,
    gotQuery: false,
    isAccessGranted: true,
    isAlertVisible: false,
    isAllRowSelected: false,
};
// #endregion SINGLETON --> /////////////////////////////////

export default function AppCenter<T>(props: ICenter<T>) {
    // #region STATE --> ///////////////////////////////////////
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<25 | 5 | 10 | 50>(50);
    const [sort, setSort] = useState<string>(props.listStruct.defaultSort.field.toString() + '%20' + props.listStruct.defaultSort.sort.toUpperCase());
    const [datas, setDatas] = useState<QueryResult<T>>(null);
    const [data, setData] = useState<T>(null);
    const [centerAction, setCenterAction] = useState<GenericActionEnum>(props.genericAction);
    const [bulkSelection, setBulkSelection] = useState<GridRowSelectionModel>([]);
    const [loaders, setLoaders] = useState<CenterLoader>(initLoader);
    const [is, setIs] = useState<CenterGlobalBool>(initGlobalBool);
    const [alertContent, setAlertContent] = useState<AlertContextType>(null);
    const [validateModalContent, setValidateModalContent] = useState<{ title: string; message: string }>(null);
    const [focusOnError, setFocusOnError] = useState<string[]>([]);
    const { actions = ['update', 'delete'] } = props;
    // #endregion STATE --> ////////////////////////////////////
    // #region HOOKS --> ///////////////////////////////////////
    const Nav = useNavigation();
    const Service = useService();
    const Ses = useContext(SessionContext);
    const { asServicePromise } = useServiceBase();
    const Search = useContext(SearchContext);
    const App = useContext(AppContext);
    const Resources = useResources();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////

    // #region Tools
    /**
     * @description method that manage rows per page change change on table
     * @param {GridPaginationModel} e
     */
    const handleRowsPerPage = (e: GridPaginationModel) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        const totalPage = Math.round(datas.totalRecords / e.pageSize);
        let targetPage: number = currentPage;
        if (currentPage > totalPage - 1) {
            while (targetPage >= totalPage) {
                targetPage--;
            }
            setCurrentPage(targetPage);
            setRowsPerPage(e.pageSize as 25 | 5 | 10 | 50);
        } else {
            setRowsPerPage(e.pageSize as 25 | 5 | 10 | 50);
        }
    };

    const handleStandardFormError = (err: ApiErrorType) => {
        if (err.code.includes('required_field') || err.code.includes('uniq_field')) {
            setAlertContent({ severity: 'error', title: err.message, subtitle: err.detailedMessage });
            updateIs('isAlertVisible', true);
            setFocusOnError((prevState) => [...prevState, err.code.split('¤')[1].toLowerCase()]);
        } else if (err.code.includes('validate')) {
            updateIs('isValidateModalVisible', true);
            setValidateModalContent({ title: err.message, message: err.detailedMessage });
            setFocusOnError((prevState) => [...prevState, err.code.split('¤')[1].toLowerCase()]);
        } else {
            throw new AppError(ErrorTypeEnum.Functional, err.detailedMessage, err.code);
        }
    };

    const autoHideAlert = (sec: number = 10) => {
        setTimeout(() => updateIs('isAlertVisible', true), sec * 1000);
    };

    const updateLoaders = (key: keyof CenterLoader, value: boolean) => {
        setLoaders((p) => {
            return { ...p, [key]: value };
        });
    };
    const updateIs = (key: keyof CenterGlobalBool, value: boolean) => {
        setIs((p) => {
            return { ...p, [key]: value };
        });
    };
    // #endregion

    // #region Center Set
    /**
     * @description Initialize an update generic method
     * @param {FormData} e
     * @returns
     */
    const centerUpdate = async (e: FormData): Promise<void> => {
        e.set('ID', props.id);
        e.set('GenericAction', props.genericAction);
        updateLoaders('isSubmitLoading', true);
        updateIs('isAlertVisible', false);

        const request = await asServicePromise<any | ApiErrorType>(Service.put(`${props.entity.toLowerCase()}/${props.id}`, null, e))
            .catch((err: AppError) => {
                throw AppError.fromAppError(err);
            })
            .finally(() => updateLoaders('isSubmitLoading', false));

        if ((request as ApiErrorType).code) {
            handleStandardFormError(request as ApiErrorType);
        } else {
            updateIs('isAlertVisible', false);
            setFocusOnError([]);
            Nav.navigateByPath(`${centerBasePath}?Table=${props.entity}`);
            updateIs('isAlertVisible', true);
            setAlertContent({ severity: 'success', title: Resources.translate('center.update.success', { fem: props.grammar.isFem ? 'e' : '', entity: props.grammar.singular }) });
            autoHideAlert();
        }
    };

    /**
     * @description Initialize a creation generic method
     * @param {FormData} e
     * @returns
     */
    const centerNew = async (e: FormData): Promise<void> => {
        e.set('GenericAction', props.genericAction);
        updateLoaders('isSubmitLoading', true);
        updateIs('isAlertVisible', false);

        setFocusOnError([]);
        const request = await asServicePromise<{ success: boolean } | ApiErrorType>(Service.post(props.entity, null, e))
            .catch((err: AppError) => {
                if (props.onCreateError) {
                    props.onCreateError(err);
                } else {
                    throw AppError.fromAppError(err);
                }
            })
            .finally(() => updateLoaders('isSubmitLoading', false));

        if ((request as ApiErrorType).code) {
            handleStandardFormError(request as ApiErrorType);
        } else {
            updateIs('isAlertVisible', false);
            Nav.navigateByPath(`${centerBasePath}?Table=${props.entity}`);
            setAlertContent({ severity: 'success', title: Resources.translate('center.create.success', { fem: props.grammar.isFem ? 'e' : '', entity: props.grammar.singular }) });
            updateIs('isAlertVisible', true);
            setFocusOnError([]);
            autoHideAlert();
        }
    };

    /**
     * @description Initialize a delete generic method
     * @param {string} id
     * @returns
     */
    const centerDelete = async (id: string): Promise<boolean> => {
        props.onDelete(id);
        return true;
    };

    const getBulkUpdateTemplate = async () => {
        updateLoaders('isBulkTemplateLoading', true);
        const fileName = props.entity.toLowerCase() + '_template_' + moment(Date.now()).format('DD_MM_YYYY');
        const query = bulkSelection.length > 0 ? `?ID=${bulkSelection.join(',')}` : is.gotQuery ? appTool.BuildSearchURL(Search.filters, '?') : '';
        await Service.downloadFile(`${props.entity.toLowerCase()}/bulkUpdateTemplate${query}`, fileName).finally(() => updateLoaders('isBulkTemplateLoading', false));
    };

    const getBulkAddTemplate = async () => {
        updateLoaders('isBulkTemplateLoading', true);
        const fileName = props.entity.toLowerCase() + '_template_' + moment(Date.now()).format('DD_MM_YYYY');
        await Service.downloadFile(`${props.entity.toLowerCase()}/bulkNewTemplate`, fileName).finally(() => updateLoaders('isBulkTemplateLoading', false));
    };

    const centerBulkUpdate = async (files: File[]) => {
        const form = new FormData();
        form.append('file', files[0]);
        form.append('GenericAction', 'bulkUpdate');
        const query = bulkSelection.length > 0 ? `?ID=${bulkSelection.join(',')}` : is.gotQuery ? appTool.BuildSearchURL(Search.filters, '?') : '';
        await Service.post(`${props.entity.toLowerCase()}/bulkUpdate${query}`, null, form);
    };
    const centerBulkNew = async (files: File[]) => {
        const form = new FormData();
        form.append('file', files[0]);
        form.append('GenericAction', 'bulkNew');
        await Service.post(`${props.entity.toLowerCase()}/bulkNew`, null, form);
    };
    /**
     * @description Set the entity list
     */
    const setList = async (filters?: SearchField[]) => {
        if (!datas) {
            updateLoaders('isLoading', true);
        }
        console.log(is);
        const query = is.gotQuery ? appTool.BuildSearchURL(filters ? filters : Search.filters) : '';
        await asServicePromise<QueryResult<T> | ApiErrorType>(Service.get(`${props.entity.toLowerCase()}?limit=${rowsPerPage}&offset=${rowsPerPage * currentPage}${query}&sort=${sort}`))
            .then((res) => {
                if ((res as ApiErrorType).code === 'no_access_granted') {
                    updateIs('isAccessGranted', false);
                } else {
                    setDatas(res as QueryResult<T>);
                }
            })
            .finally(() => updateLoaders('isLoading', false));
    };
    /**
     * @description set records for formMaker
     */
    const setRecord = async () => {
        if (!data) {
            updateLoaders('isLoading', true);
        }
        await asServicePromise<QueryResult<T> | ApiErrorType>(Service.get(`${props.entity.toLowerCase()}/${props.id}`))
            .then((res: QueryResult<T>) => {
                setData(res.records[0]);
                //props.getData(res.records[0]);
            })
            .finally(() => updateLoaders('isLoading', false));
    };
    /**
     * @description Load appropriate config in terms of `GenericAction`
     */
    const load = async () => {
        if (centerAction === GenericActionEnum.TABLE) {
            if (!Search.filters) {
                const searchContent = appTool.ParseSearchUrl(props.searchFormStruct);
                updateIs('gotQuery', true);
                console.log(searchContent);
                Search.setFilters(searchContent);
            } else {
                await setList();
            }
        } else if (centerAction === GenericActionEnum.UPDATE || centerAction === GenericActionEnum.VIEW || centerAction === GenericActionEnum.DELETE) {
            updateIs('isAlertVisible', false);
            await setRecord();
        } else if (centerAction === GenericActionEnum.NEW) {
            updateIs('isAlertVisible', false);
            updateLoaders('isLoading', false);
        }
    };
    // #endregion

    // #region Set Render
    /**
     * @description render Update Element
     * @returns FormMaker with corresponding datas
     */

    const centerBaseProps: ICenterBase = {
        isValidateModalVisible: is.isValidateModalVisible,
        validateModalContent,
        validateModaleOnClose: () => updateIs('isValidateModalVisible', !is.isValidateModalVisible),
        isAlertVisible: is.isAlertVisible,
        onCloseAlert: () => updateIs('isAlertVisible', !is.isAlertVisible),
        alertContent,
        entity: props.entity,
        action: props.genericAction,
        grammar: props.grammar,
        icon: props.icon,
        totalCount: datas ? datas.totalRecords : 0,
    };

    const formMakerBaseProps = {
        focusOnError,
        isSubmitLoading: loaders.isSubmitLoading,
        structure: props.formStruct,
        action: props.genericAction,
        grammar: props.grammar.singular,
    };

    const renderUpdate = (): JSX.Element => {
        if (!is.isAccessGranted) {
            App.setIsNoAccess(true);
            return;
        } else {
            return (
                <CenterBase {...centerBaseProps} prefix={Resources.translate('common.updating')} grammar={props.grammar} article={props.specifiers.singular}>
                    <FormMaker<T> {...formMakerBaseProps} data={data} onBackPress={() => Nav.navigateByPath(`${centerBasePath}?Table=${props.entity}`)} onSubmit={centerUpdate} />
                </CenterBase>
            );
        }
    };

    /**
     * @description render View Element
     * @returns Custom overview with corresponding datas
     */
    const renderView = (): JSX.Element => {
        if (!is.isAccessGranted) {
            App.setIsNoAccess(true);
        } else {
            return (
                <CenterBase {...centerBaseProps} prefix={Resources.translate('common.details')} grammar={props.grammar} article={props.specifiers.singular}>
                    {props.viewComponent ? props.viewComponent(data) : <FormMaker<T> {...formMakerBaseProps} data={data} onBackPress={() => Nav.navigateByPath(`${centerBasePath}?Table=${props.entity}`)} onSubmit={null} isView />}
                </CenterBase>
            );
        }
    };

    /**
     * @description render Delete View Element
     * @returns Custom overview with corresponding datas
     * @throws an AppError if no views ton render
     */
    const renderDelete = (): JSX.Element => {
        if (!is.isAccessGranted) {
            App.setIsNoAccess(true);
            return;
        } else {
            if (props.deleteComponent) {
                return props.deleteComponent(data, props.onDelete);
            } else {
                if (!props.viewComponent) {
                    return renderView();
                } else {
                    return props.viewComponent(data, true, props.onDelete);
                }
            }
        }
    };

    /**
     * @description render New Element
     * @returns FormMaker with empty fields
     */
    const renderNew = (): JSX.Element => {
        if (!is.isAccessGranted) {
            App.setIsNoAccess(true);
            return;
        } else {
            return (
                <CenterBase {...centerBaseProps} prefix={Resources.translate('common.adding')} grammar={props.grammar} article={props.specifiers.singular}>
                    <FormMaker<T> {...formMakerBaseProps} onBackPress={() => Nav.navigateByPath(`${centerBasePath}?Table=${props.entity}`)} onSubmit={centerNew} />
                </CenterBase>
            );
        }
    };

    /**
     * @description render List of records
     * @returns AppTable Element with records
     */
    const renderTable = (): JSX.Element => {
        return (
            <CenterBase
                {...centerBaseProps}
                onSubmitSearchForm={() => {
                    updateLoaders('isLoading', true);
                    updateIs('gotQuery', true);
                }}
                needToQuery={(e) => updateIs('gotQuery', e)}
                searchForm={props.searchFormStruct}
                bulkNew={props.bulkNew}
                bulkUpdate={props.bulkUpdate}
                isTemplateLoading={loaders.isBulkTemplateLoading}
                onBulkSend={(f, t) => (t === 'update' ? centerBulkUpdate(f) : centerBulkNew(f))}
                // levelAccess={props.levelBulk}
                onBulkTemplateClick={(t) => (t === 'new' ? getBulkAddTemplate() : getBulkUpdateTemplate())}
            >
                <AppTable
                    entity={props.entity}
                    actions={props.listStruct.actions}
                    onSort={(e) => setSort(e)}
                    onPaginationChange={handleRowsPerPage}
                    onPageChange={(e) => setCurrentPage(e)}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    rows={datas}
                    columns={props.listStruct}
                    isTableLoading={loaders.isLoading}
                    isRowsCheckable={props.bulkUpdate}
                    isAllRowSelected={is.isAllRowSelected}
                    onAllRowSelect={(e) => updateIs('isAllRowSelected', e)}
                    onRowSelect={(e) => setBulkSelection(e)}
                    onExportClick={() => null}
                />
            </CenterBase>
        );
    };
    // #endregion

    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        load();
        console.log(sort);
    }, [currentPage, rowsPerPage, sort, centerAction, is.gotQuery, Search.filters]);

    useEffect(() => {
        setCenterAction(props.genericAction);
        if (props.genericAction !== GenericActionEnum.NEW && !loaders.isLoading) {
            updateLoaders('isLoading', true);
        }
    }, [props.genericAction]);

    useEffect(() => {
        if (centerAction === GenericActionEnum.TABLE) {
            if (Search.filters?.length > 0) {
                const url = `${centerBasePath}?Table=${props.entity}${appTool.BuildSearchURL(Search.filters)}`;
                if (url.split('?')[1].toLowerCase() !== window.location.href.split('?')[1]) {
                    history.replaceState(null, '', url);
                }
                // load();
            }
        }
    }, [Search.filters]);
    // #endregion USEEFFECT --> ////////////////////////////////
    // #region RENDER --> //////////////////////////////////////
    if (loaders.isLoading) {
        return <AppFullPageLoader isLoading />;
    } else {
        if (is.isAccessGranted) {
            switch (centerAction) {
                case 'update':
                    if (props.allowUpdate) return renderUpdate();
                    else App.setIsNoAccess(true);
                    break;
                case 'new':
                    if (props.allowAdd) return renderNew();
                    else App.setIsNoAccess(true);
                    break;
                case 'view':
                    return renderView();
                case 'delete':
                    if (props.allowDelete) return renderDelete();
                    else App.setIsNoAccess(true);
                    break;
                default:
                    return renderTable();
            }
        } else {
            App.setIsNoAccess(true);
            return;
        }
    }
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
