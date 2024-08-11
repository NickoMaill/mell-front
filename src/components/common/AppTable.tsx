// #region IMPORTS -> /////////////////////////////////////
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridColType,
    GridPagination,
    GridPaginationModel,
    useGridApiContext,
    GridValueFormatter,
    GridAlignment,
    GridRowParams,
    GridActionsCellItemProps,
    GridActionsCellItem,
    GridLocaleText,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarExportContainer,
    GridRenderCellParams,
    GridTreeNodeWithRender,
    GridSortModel,
    GridRowSelectionModel,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, MenuItem, SxProps, Theme, Tooltip, styled, Pagination as MuiPagination } from '@mui/material';
import { QueryResult } from '~/core/types/serverCoreType';
import { ChangeEvent, EventHandler, MouseEvent, useContext, useEffect, useState } from 'react';
import useNavigation from '~/hooks/useNavigation';
import useStorage from '~/hooks/useStorage';
import AppIcon, { IconNameType } from './AppIcon';
import NavigationResource from '~/resources/navigationResources';
import SearchContext from '~/context/searchContext';
// #endregion IMPORTS -> //////////////////////////////////

//#region Types
export type AppTableStructure<T = object, F = any> = {
    colStruct: AppGridColDef<T, F>[];
    actions?: (ActionsType | CustomActionsDef)[];
    defaultSort?: AppGridSortModel<T>;
    bulkUpdate?: boolean;
    bulkNew?: boolean;
};

export type AppGridSortModel<T> = {
    field: keyof T;
    sort: 'asc' | 'desc';
};

export type AppGridColDef<T = object, F = any> = {
    headerField: keyof T;
    headerLabel: string;
    type: GridColType;
    sortable: boolean;
    isEditable?: boolean;
    customCell?: (e: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => JSX.Element;
    headerClassName?: string;
    cellClassName?: string;
    align?: GridAlignment;
    headerAlign?: GridAlignment;
    cellSx?: SxProps<Theme>;
    width?: number;
    minWidth?: number;
    defaultSorted?: boolean;
    defaultSortedOrder?: 'desc' | 'asc';
    valueFormatter?: (e: never) => F;
    actions?: (e: GridRowParams<T>) => React.ReactElement<GridActionsCellItemProps>[];
};

export type ActionsType = 'view' | 'delete' | 'update';
//#endregion

//#region Main Function
export default function AppTable<T>({ onRowClick = () => {}, sx, columns, rows, isTableLoading = true, isRowsCheckable = false, onSort, rowsPerPage = 50, onPaginationChange, onPageChange, currentPage = 0, actions, onExportClick, entity, onAllRowSelect = () => {}, isAllRowSelected, onRowSelect = null }: IAppTable<T>) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region SINGLETON --> ////////////////////////////////////
    const tableLocalText: Partial<GridLocaleText> = {
        columnsManagementShowHideAllText: 'Afficher tout',
        //columnsPanelTextFieldPlaceholder: 'Libellé',
        //columnsPanelTextFieldLabel: 'Rechercher une colone',
        toolbarColumns: 'Colonnes',
        toolbarDensity: 'Épaisseur',
        toolbarDensityComfortable: 'Espacé',
        toolbarDensityCompact: 'Compacte',
        toolbarDensityStandard: 'Normal',
        toolbarDensityLabel: 'Épaisseur',
        footerRowSelected: (count) => `${isAllRowSelected ? rows.totalRecords : count} lignes sélectionnées`,
    };
    const minWidth = 223;
    // #endregion SINGLETON --> /////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const Nav = useNavigation();
    const Storage = useStorage();
    const Search = useContext(SearchContext);
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const mapToGridColDef = (columns: AppGridColDef<T>[]): GridColDef[] => {
        const cols = columns.map((col) => {
            return {
                field: col.headerField,
                headerName: col.headerLabel,
                sortable: col.sortable,
                flex: col.width ? null : 1,
                width: col.width ? col.width : null,
                minWidth: col.minWidth ? col.minWidth : col.width ? null : 150,
                type: col.type,
                headerClassName: col.headerClassName,
                cellClassName: col.cellClassName,
                align: col.align ? col.align : 'left',
                headerAlign: col.headerAlign ? col.headerAlign : 'left',
                editable: col.isEditable,
                renderHeader: () => <strong>{col.headerLabel}</strong>,
                // getActions: col.actions,
                valueFormatter: (e) => {
                    if (col.valueFormatter) {
                        if (col.type === 'date' && new Date(e).getFullYear() === 1) {
                            return ' ';
                        } else {
                            return col.valueFormatter(e);
                        }
                    }
                },
                renderCell: (e) => {
                    if (col.customCell) {
                        return <col.customCell {...e} />;
                    } else {
                        return <Box sx={{ ...col.cellSx, whiteSpace: 'nowrap' }}>{e.formattedValue ? e.formattedValue : e.value}</Box>;
                    }
                },
            };
        }) as GridColDef[];
        if (actions) {
            const actionsData: GridColDef = {
                field: 'actions',
                type: 'actions',
                headerClassName: 'fw-bold ',
                flex: 1,
                minWidth: 150,
                align: 'right',
                headerAlign: 'right',
                headerName: 'Actions',
                renderHeader: () => <strong>{'Actions'}</strong>,
                getActions: (e) => {
                    return actions.map((a) => {
                        if (typeof a === 'string') {
                            return <ActionTable type={a} entity={entity} id={e.row.id} />;
                        } else {
                            return (
                                <Tooltip title={a.title}>
                                    <GridActionsCellItem icon={<AppIcon name={a.icon} />} label={a.title} onClick={() => a.onClick(e)} color="inherit" />
                                </Tooltip>
                            );
                        }
                    });
                },
            };
            cols.push(actionsData);
        }
        return cols;
    };

    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (columns.defaultSort) {
            const index = columns.colStruct.findIndex((x) => x.defaultSorted);
            Search.setSortedBy({ sortField: columns.defaultSort.field as string, sortLabel: columns.colStruct[index].headerLabel, order: columns.defaultSort.sort });
        }
        return () => Search.setSortedBy(null);
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    // minWidth: { xs: '1400px', md: '1600px', lg: '100%' },
    return (
        <Box sx={{ mt: 2, overflowX: 'auto', width: "100%" }}>
            <DataGrid
                sx={{
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                    },
                    '.MuiDataGrid-columnHeadersInner': {
                        backgroundColor: Storage.getItem('darkMode') === 'true' ? null : '#eeeeee',
                    },
                    '.MuiDataGrid-actionsCell': {
                        gridGap: 0,
                        padding: 0,
                    },
                    '.MuiIconButton-root': {
                        padding: 0.3,
                    },
                    '.MuiDataGrid-main': {
                        maxWidth: '205ch',
                        overflow: 'auto',
                    },
                    padding: 0,
                    ...sx
                }}
                rows={!isTableLoading ? rows.records : []}
                columns={mapToGridColDef(columns.colStruct)}
                rowCount={0}
                autoHeight
                loading={isTableLoading}
                onRowClick={(e) => onRowClick(e)}
                sortingMode="server"
                sortingOrder={['asc', 'desc']}
                onSortModelChange={(e) => {
                    if (e.length > 0) {
                        onSort(e[0].field + ' ' + e[0].sort.toUpperCase());
                        columns.colStruct.forEach((col) => {
                            if ((col.headerField as string).toLocaleLowerCase() === e[0].field.toLocaleLowerCase()) Search.setSortedBy({ sortField: e[0].field, sortLabel: col.headerLabel, order: e[0].sort });
                        });
                    }
                }}
                slots={{
                    pagination: (props) => CustomPagination({ props, onPageChange, currentPage, rowsPerPage, totalRows: rows.totalRecords }),
                    noRowsOverlay: CustomNoRowsOverlay,
                    toolbar: () => CustomToolBar({ onExportClick }),
                }}
                localeText={tableLocalText}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: rowsPerPage },
                    },
                    sorting: {
                        sortModel: columns.defaultSort ? ([columns.defaultSort] as GridSortModel) : null,
                    },
                }}
                slotProps={{
                    pagination: {
                        labelRowsPerPage: 'Résultats par page',
                        labelDisplayedRows: () => null,
                    },
                    baseCheckbox: {
                        onClick: (e) => {
                            if (onAllRowSelect) {
                                if ((e.target as HTMLElement).ariaLabel === 'Select all rows') {
                                    onAllRowSelect(true);
                                } else {
                                    onAllRowSelect(false);
                                }
                            }
                        },
                    },
                }}
                paginationMode='server'
                pageSizeOptions={[5, 10, 25, 50]}
                onPaginationModelChange={onPaginationChange}
                checkboxSelection={isRowsCheckable}
                rowSelection={isRowsCheckable}
                onRowSelectionModelChange={onRowSelect ? (e) => onRowSelect(e) : null}
            />
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////x
}
// #region IPROPS -->  /////////////////////////////////////
interface IAppTable<T> {
    columns: AppTableStructure<T>;
    isTableLoading?: boolean;
    isRowsCheckable?: boolean;
    rows: QueryResult<T>;
    onSort?: (e: string) => void;
    currentPage?: number;
    onPageChange?: (p: number) => void;
    onPaginationChange?: (e: GridPaginationModel, details: GridCallbackDetails) => void;
    rowsPerPage?: 5 | 10 | 25 | 50;
    entity?: string;
    onExportClick?: () => void;
    onAllRowSelect?: (isAllSelected: boolean) => void;
    onRowSelect?: (ids: GridRowSelectionModel) => void;
    onRowClick?: (e: GridRowParams<T>) => void;
    isAllRowSelected?: boolean;
    actions?: (ActionsType | CustomActionsDef)[];
    sx?: SxProps;
}

export type CustomActionsDef = {
    icon: IconNameType;
    onClick: (e: GridRowParams<any>) => void;
    title: string;
    blank?: boolean;
};
// #endregion IPROPS --> //////////////////////////////////

function CustomNoRowsOverlay() {
    const StyledGridOverlay = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        '& .ant-empty-img-1': {
            fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
            fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
            fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
            fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
            fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
            fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
    }));
    return (
        <StyledGridOverlay className='my-3'>
            <svg width="120" height="70" viewBox="0 0 184 152" aria-hidden focusable="false">
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
                        <path className="ant-empty-img-1" d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" />
                        <path className="ant-empty-img-2" d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path className="ant-empty-img-3" d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>Aucun résultats dans la base...</Box>
        </StyledGridOverlay>
    );
}

function ActionTable({ type, id, entity }: IActionTable) {
    const Navigation = useNavigation();
    const getLabel = (): { label: string; icon: IconNameType } => {
        switch (type) {
            case 'delete':
                return { label: 'Supprimer', icon: 'Delete' };
            case 'update':
                return { label: 'Modifier', icon: 'Edit' };
            default:
                return { label: 'Visualiser', icon: 'RemoveRedEye' };
        }
    };
    return (
        <Tooltip title={getLabel().label}>
            <GridActionsCellItem icon={<AppIcon name={getLabel().icon} />} label={getLabel().label} onClick={() => Navigation.navigateByPath(`${NavigationResource.routesPath.center}?Table=${entity}&ID=${id}&action=${type}`)} color="inherit" />
        </Tooltip>
    );
}
interface IActionTable {
    type: ActionsType;
    id: string | number;
    entity: string;
}
//#endregion
//#endregion
function CustomToolBar({ onExportClick }: ICustomToolBar) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            {/* <GridToolbarExportContainer onClick={onExportClick}>
                <MenuItem />
            </GridToolbarExportContainer> */}
        </GridToolbarContainer>
    );
}
interface ICustomToolBar {
    onExportClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
//#region Pagination
function Pagination({ currentPage, onPageChange, className, rowsPerPage, totalRows }: IPagination) {
    const apiRef = useGridApiContext();
    //const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
        <MuiPagination
            color="primary"
            className={className}
            count={Math.round(totalRows / rowsPerPage)}
            page={currentPage + 1}
            onChange={(_e, newPage) => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                onPageChange(newPage - 1);
                // onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

function CustomPagination({ props, currentPage, onPageChange, rowsPerPage, totalRows }) {
    return <GridPagination ActionsComponent={(p) => Pagination({ currentPage, onPageChange, className: p.className, rowsPerPage, totalRows })} {...props} />;
}

interface IPagination {
    currentPage: number;
    className: string;
    onPageChange: (newPage: number) => void;
    rowsPerPage: number;
    totalRows: number;
}
//#endregion
