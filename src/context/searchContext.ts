import { Dispatch, SetStateAction, createContext } from 'react';

interface ISearchContext {
    filters: SearchField[];
    setFilters?: Dispatch<SetStateAction<SearchField[]>>;
    sortedBy: SortField;
    setSortedBy?: Dispatch<SetStateAction<SortField>>;
}

const initialContext: ISearchContext = {
    filters: null,
    sortedBy: null,
};

export type SearchField = {
    field: string;
    fieldName: string;
    values: string;
    formattedValue?: string;
};

export type SortField = {
    sortField: string;
    sortLabel: string;
    order: 'asc' | 'desc';
};

const SearchContext = createContext<ISearchContext>(initialContext);

export default SearchContext;
