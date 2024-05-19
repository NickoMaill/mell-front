import { SelectChangeEvent, SxProps } from '@mui/material';
import { DateView } from '@mui/x-date-pickers';
import { CSSProperties, ChangeEvent } from 'react';
import { IconNameType } from '~/components/common/AppIcon';

/**
 * @description FormMaker input type options
 */
export interface IFormMakerInput extends InputBaseType {
    /**
     * @description required option if type === 'select'
     */
    selectOptions?: SelectOptionsType[];
    /**
     * @description required option if type === 'checkbox'
     */
    checkboxOptions?: CheckboxOptionType[];
    /**
     * @description required option if type === 'radio'
     */
    radioOptions?: RadioOptionsType[];
    /**
     * @description to render html content
     */
    htmlContent?: JSX.Element;
    /**
     * @description type of input, see InputType type for more details
     */
    type: InputType;
    /**
     * @description index of input display, if 1, a new line is added, else input is added on same line than previous after it. CANNOT BE EQUALS TO 0 !!
     */
    index: number;
    /**
     * @description limit of char for textarea, or limit for number input type
     */
    limit?: number;
    /**
     * @description number of rows to render for textarea
     */
    rows?: number;
    /**
     * @description date format string, can be dd/mm/yyyy or dddd mmmm yyyy or whatever you want
     */
    dateFormat?: string;
    /**
     * @description determine order of input render as string array like this ['day', 'month', 'year].
     * @property ONLY 'day', 'month', 'year' ARE ALLOWED
     */
    dateViews?: DateView[];
    dateOpenTo?: DateView;
    isInputLoading?: boolean;
}

/**
 * @description FormMaker structure Type
 */
export type FormMakerContentType<T extends FormMakerPartEnum> = {
    /**
     * @description title of tab if T = FormMakerPartEnum.TAB else title of PANEL
     */
    title: string;
    /**
     * @description determine what part of formMaker content property will be
     */
    type: T extends FormMakerPartEnum.TAB ? FormMakerPartEnum.TAB : T extends FormMakerPartEnum.PANEL ? FormMakerPartEnum.PANEL : FormMakerPartEnum.SEARCH;
    /**
     * @description content of part
     */
    content: T extends FormMakerPartEnum.TAB ? IFormMakerPanel[] : IFormMakerInput[];
    /**
     * @description icon of the panel
     */
    icon?: T extends FormMakerPartEnum.PANEL ? IconNameType : null;
};

export interface IFormMakerPanel {
    /**
     * @description title of FormMaker Panel
     */
    title: string;
    /**
     * @description content of FormMaker Panel
     */
    content: IFormMakerInput[];
}
/**
 * @description enumerator to identify par of FormMaker
 */
export enum FormMakerPartEnum {
    TAB = 0,
    PANEL = 1,
    SEARCH = 2,
}

//====================================>
/**
 * @description Input regular type
 */
export interface InputBaseType {
    label?: string;
    id: string;
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any> | File) => void;
    required?: boolean;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
    size?: number;
    helpText?: string;
    errorMessage?: string;
    autoComplete?: AutoCompleteType;
    autoCapitalize?: AutoCapitalizeType;
    value?: unknown;
    disabled?: boolean;
    pattern?: RegExp;
    showLabel?: boolean;
    placeholder?: string;
    sx?: SxProps;
    style?: CSSProperties;
    isLoading?: boolean;
    icon?: IconNameType;
}

export type AutoCompleteType = 'on' | 'off' | 'given-name' | 'family-name' | 'email' | 'address-line1' | 'country' | 'country-name' | 'bday';
export type AutoCapitalizeType = 'off' | 'on' | 'words' | 'characters';
export type InputType = 'button' | 'email' | 'hidden' | 'number' | 'password' | 'reset' | 'search' | 'tel' | 'text' | 'url' | 'select' | 'checkbox' | 'radio' | 'tokenmultiple' | 'textarea' | 'date' | 'color' | 'switch' | 'htmlContent' | 'file' | 'range';
export type InputModeType = 'decimal' | 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric';

export type SelectOptionsType = {
    value: string | number | boolean;
    label: string;
};

export type RadioOptionsType = SelectOptionsType;

export type CheckboxOptionType = SelectOptionsType & {
    defaultChecked: boolean;
};
