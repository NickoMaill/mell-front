// #region IMPORTS -> /////////////////////////////////////
import Box from '@mui/material/Box';
import { Bold, Regular } from '../common/Text';
import { useContext, useState } from 'react';
import SearchContext, { SearchField } from '~/context/searchContext';
import AppIcon from '../common/AppIcon';
import { Link } from '@mui/material';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
import FormMaker from '../formMaker/FormMaker';
import AppFullPageModal from '../common/AppFullPageModal';
import useResources from '~/hooks/useResources';
import { CenterGrammarType, GenericActionEnum } from '~/core/types/centerTypes';
import moment from 'moment';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppCenterSearch<T>({ searchFormStruct, onSubmitSearchForm, grammar }: IAppCenterSearch<T>) {
    // #region STATE --> ///////////////////////////////////////
    const [isSearchFormVisible, setIsSearchFormVisible] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Search = useContext(SearchContext);
    const Resources = useResources();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const openCloseModal = (isNew?: boolean) => {
        setIsNew(isNew);
        setIsSearchFormVisible(!isSearchFormVisible);
    };

    const mapSearchFieldToObject = () => {
        if (Search.filters) {
            const obj = new Object();
            Search.filters.forEach((f) => {
                Object.defineProperty(obj, f.field, { value: f.values, writable: true });
            });
            return obj as T;
        } else {
            return null;
        }
    };

    const onSubmit = (f: T) => {
        const searchField: SearchField[] = [];
        Object.getOwnPropertyNames(f).forEach((el) => {
            const index = searchFormStruct[0].content.findIndex((c) => (c.id as string).toLowerCase() === el.toLowerCase());
            if (f[el].toString() !== '') {
                searchField.push({
                    field: el,
                    fieldName: searchFormStruct[0].content[index].label,
                    values: f[el],
                    formattedValue: searchFormStruct[0].content[index].type === "date" ? moment(f[el]).format("DD/MM/YYYY") : f[el]
                });
            }
        });
        Search.setFilters(searchField);
        onSubmitSearchForm();
        setIsSearchFormVisible(false);
    };

    const formatFiltersView = () => {
        if (Search.filters) {
            const searchString = Search.filters.map((filter) => {
                return `${filter.fieldName} : ${filter.formattedValue}`;
            });
            return searchString.join(', ');
        } else {
            return '';
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <>
            <Box display="flex" flexWrap={'wrap'} alignItems={'center'} marginBottom={1}>
                <Box display={'flex'}>
                    <Regular className="me-1">
                        <b>{Resources.translate('common.filters')}</b> : {!Search.filters || Search.filters.length < 1 ? Resources.translate('center.search.nothing') : formatFiltersView() + ', '} {Resources.translate('center.search.orderBy')}{' '}
                    </Regular>
                    {Search.sortedBy && (
                        <Bold display="flex" alignItems="center" marginRight={2}>
                            {Search.sortedBy.sortLabel}
                            <AppIcon name={Search.sortedBy.order === 'asc' ? 'ArrowUpward' : 'ArrowDownward'} />
                        </Bold>
                    )}
                </Box>
                {Search.sortedBy && (
                    <Box display="flex">
                        {Search.filters && Search.filters.length > 0 && (
                            <Link marginRight={3} component={'a'} onClick={() => openCloseModal(false)}>
                                <Bold sx={{ cursor: 'pointer' }}>{Resources.translate('center.search.updateSearch')}</Bold>
                            </Link>
                        )}
                        {searchFormStruct && (
                            <Link component={'a'} onClick={() => openCloseModal(true)}>
                                <Bold sx={{ cursor: 'pointer' }}>{Resources.translate('center.search.newSearch')}</Bold>
                            </Link>
                        )}
                    </Box>
                )}
            </Box>
            {searchFormStruct && (
                <AppFullPageModal titleIcon="Search" modalTitle={`${Resources.translate('common.search')} ${grammar.plural}`} isOpen={isSearchFormVisible} onClose={() => openCloseModal(true)}>
                    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Box width={{ md: '50%', xs: '100%' }}>
                            <FormMaker<T> grammar={grammar.plural} action={GenericActionEnum.TABLE} outputType="JSON" data={Search.filters && !isNew ? mapSearchFieldToObject() : null} structure={searchFormStruct} onBackPress={() => openCloseModal(true)} onSubmit={onSubmit} />
                        </Box>
                    </Box>
                </AppFullPageModal>
            )}
        </>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppCenterSearch<T> {
    searchFormStruct?: FormMakerContentType<FormMakerPartEnum.SEARCH>[];
    onSubmitSearchForm?: () => void;
    searchData?: SearchField[];
    needToQuery?: (needToQuery: boolean) => void;
    grammar: CenterGrammarType;
}
// #endregion IPROPS --> //////////////////////////////////
