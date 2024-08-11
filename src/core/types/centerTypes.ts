import { ActionsType, AppTableStructure, CustomActionsDef } from '~/components/common/AppTable';
import { FormMakerContentType, FormMakerPartEnum } from './FormMakerCoreTypes';
import { IconNameType } from '~/components/common/AppIcon';
import { AppError } from '../appError';
import { ApiErrorType } from './ApiError';
import { ReactNode } from 'react';
import { AlertContextType } from '~/context/appContext';

export interface ICenter<T> {
    // #region GENERAL PARAMETERS -> /////////////////////////////////
    /**
     * @description nom de l'entité a charger
     */
    entity: string;
    /**
     * @description id du record a charger
     */
    id: string;
    /**
     * @description type d'action peut être : "new", "update", "delete", "view", "table", "bulkUpdate", "bulkDelete"
     */
    genericAction: GenericActionEnum;
    /**
     * @description article grammatical
     */
    specifiers: CenterSpecifierType;
    /**
     * @description grammaire à utiliser dans le center
     */
    grammar: CenterGrammarType;
    /**
     * @description icône a afficher a coté du titre
     */
    icon?: IconNameType;
    // #endregion -> /////////////////////////////////////////////////

    // #region DISPLAYING THE LIST -> ////////////////////////////////
    /**
     * @description structure de la liste des records
     */
    listStruct: AppTableStructure<T>;
    /**
     * @description liste des actions autorisé par ligne
     */
    actions?: (ActionsType | CustomActionsDef)[];
    /**
     * @description handler de changement de page
     * @param {number} page
     * @returns void
     */
    onTablePageChange?: (page: number) => void;
    // #endregion -> /////////////////////////////////////////////////

    // #region SEARCH DATA -> ////////////////////////////////////////
    /**
     * @description structure du searchForm
     */
    searchFormStruct?: FormMakerContentType<FormMakerPartEnum>[];
    // #endregion -> /////////////////////////////////////////////////

    // #region FORM TEMPLATE -> //////////////////////////////////////
    /**
     * @description structure du FormMaker (utiliser pour le mode "update" et "new")
     */
    formStruct?: FormMakerContentType<FormMakerPartEnum>[];
    /**
     * @description handler d'erreur lors d'une modification de record
     * @param {AppError | ApiErrorType} err
     * @returns
     */
    onUpdateError?: (err: AppError | ApiErrorType) => void;
    /**
     * @description handler de création de record
     * @param {FormData} e
     * @returns
     */
    onCreate?: (e: FormData) => Promise<void>;
    /**
     * @description handler d'erreur lors d'une création de record
     * @param {AppError | ApiErrorType} err
     * @returns
     */
    onCreateError?: (err: AppError | ApiErrorType) => void;
    /**
     * @description handler de suppression de record
     * @param {FormData} e
     * @returns
     */
    onDelete?: (id: string) => Promise<void>;
    /**
     * @description handler d'erreur lors d'une suppression de record
     * @param {AppError | ApiErrorType} err
     * @returns
     */
    onDeleteError?: (err: AppError | ApiErrorType) => void;
    // #endregion -> /////////////////////////////////////////////////

    // #region element -> /////////////////////////////////////////////
    // levelAccess?: UserAccessLevelEnum;
    // /**
    //  * @description niveau d'accès autorisé pour l'export
    //  */
    // levelExport?: UserAccessLevelEnum;
    // /**
    //  * @description niveau d'accès autorisé pour la modification
    //  */
    // levelUpdate?: UserAccessLevelEnum;
    // /**
    //  * @description niveau d'accès autorisé pour la création
    //  */
    // levelNew?: UserAccessLevelEnum;
    // /**
    //  * @description niveau d'accès autorisé pour la suppression
    //  */
    // levelDelete?: UserAccessLevelEnum;
    // /**
    //  * @description niveau d'accès autorisé pour la modification groupée
    //  */
    // levelBulk?: UserAccessLevelEnum;
    // #endregion -> /////////////////////////////////////////////////
    /**
     * @description Activer la modification groupée
     */
    bulkUpdate?: boolean;
    /**
     * @description Activer la création groupée
     */
    bulkNew?: boolean;
    viewComponent?: (data: any, deleteMode?: boolean, onDelete?: (id: string) => Promise<void>) => JSX.Element;
    deleteComponent?: (data: any, onDelete: (id: string) => Promise<void>) => JSX.Element;
    allowExport?: boolean;
    allowDelete?: boolean;
    allowUpdate?: boolean;
    allowAdd?: boolean;
    getData?: (data: any) => void;
    isMini?: boolean;
}

export interface ICenterBase {
    /**
     * @description article of type "Le", "La", "Les"
     */
    article?: string;
    /**
     * @description name of the entity
     */
    grammar: CenterGrammarType;
    /**
     * @description name of icon displayed on top left of title
     */
    icon?: IconNameType;
    /**
     * @description center content
     */
    children?: ReactNode;
    /**
     * @description prefix of type "de", "de la", "des"
     */
    prefix?: string;
    totalCount?: number;
    action: GenericActionEnum;
    entity: string;
    searchForm?: FormMakerContentType<FormMakerPartEnum>[];
    // levelUpdate?: UserAccessLevelEnum;
    // levelNew?: UserAccessLevelEnum;
    // levelDelete?: UserAccessLevelEnum;
    // levelBulk?: UserAccessLevelEnum;
    bulkUpdate?: boolean;
    bulkNew?: boolean;
    isTemplateLoading?: boolean;
    isBulkLoading?: boolean;
    // levelAccess?: UserAccessLevelEnum;
    isAlertVisible: boolean;
    alertContent?: AlertContextType;
    isValidateModalVisible?: boolean;
    validateModalContent?: { title: string; message: string };
    needToQuery?: (gotQuery: boolean) => void;
    onSubmitSearchForm?: () => void;
    onBulkTemplateClick?: (type: 'new' | 'update') => void;
    onBulkTemplateUpdate?: () => void;
    onBulkSend?: (files: File[], type: 'update' | 'new') => void;
    onAddFile?: (e: File) => void;
    onCloseAlert?: () => void;
    validateModaleOnClose?: () => void;
}

export enum GenericActionEnum {
    NEW = 'new',
    UPDATE = 'update',
    DELETE = 'delete',
    VIEW = 'view',
    TABLE = 'table',
    MINITABLE = 'miniTable',
}

export type CenterSpecifierType = {
    plural: string;
    singular: string;
};

export type CenterGrammarType = {
    singular: string;
    plural: string;
    isFem?: boolean;
};
