// #region IMPORTS -> /////////////////////////////////////
import { Box, Container } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import InputSubmit from './elements/InputSubmit';
import { FormMakerContentType, FormMakerPartEnum, IFormMakerInput, IFormMakerPanel, InputBaseType } from '~/core/types/FormMakerCoreTypes';
import AppCard from '../common/AppCard';
import InputTextField from './elements/InputTextField';
import AppGridContainer from '../common/AppGridContainer';
import TabsView from '../common/TabsView';
import InputCheckBoxField from './elements/InputCheckBoxField';
import InputSelectField from './elements/InputSelectField';
import InputTelephoneField from './elements/InputTelephoneField';
import InputAutoCompleteMultiple from './elements/InputAutoCompleteMultiple';
import InputRadioField from './elements/InputRadioField';
import InputTextAreaField from './elements/InputTextAreaField';
import InputDateField from './elements/InputDateField';
import InputColorField from './elements/InputColorField';
import InputSwitchField from './elements/InputSwitchField';
import InputHidden from './elements/InputHidden';
import InputAutoComplete from './elements/InputAutoComplete';
import RangeInput from './elements/RangeInput';
import InputFileField from './elements/InputFileField';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import appTool from '~/helpers/appTool';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function FormMaker<T>({ onSubmit, structure, data, outputType = 'formData', onBackPress, isSubmitLoading, focusOnError = [], grammar, action = 'Ajouter', isView = false }: IFormMaker<T>) {
    // #region STATE --> ///////////////////////////////////////
    const [file, setFile] = useState<File>(null);
    const [fileField, setFileFields] = useState<string>(null);
    const [initialValues, setInitialValues] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const [params] = useSearchParams();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const handleSubmit = (e: FormEvent<HTMLFormElement>): FormData | T => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (outputType === 'JSON') {
            const obj = {};
            for (const pair of formData.entries()) {
                Object.defineProperty(obj, pair[0], { value: pair[1], writable: true });
            }
            return obj as T;
        } else {
            if (file && fileField) {
                formData.delete(fileField);
                formData.append(fileField, file);
            }
            return formData;
        }
    };
    /**
     * @description method that parse and render form
     * @returns form content HTML Element
     */
    const renderForm = (): JSX.Element => {
        checkIds();

        if (structure[0].type === FormMakerPartEnum.TAB) {
            const tabTitles: string[] = [];
            const tabGlobalContent: JSX.Element[][] = [];
            let tabContent: JSX.Element[] = [];

            structure.filter(s => !s.hide).forEach((tab: FormMakerContentType<FormMakerPartEnum>) => {
                tabTitles.push(tab.title);
                tab.content.forEach((panel, i) => {
                    tabContent.push(buildPanelContent(panel, i));
                });
                tabGlobalContent.push(tabContent);
                tabContent = [];
            });

            return <TabsView tabTitles={tabTitles} content={tabGlobalContent} />;
        } else {
            return <>{structure.filter(s => !s.hide).map((s, i) => buildPanelContent(s, i))}</>;
        }
    };

    /**
     * @description check if ids are uniq
     * @throws an AppError if not ids are founds
     */
    const checkIds = () => {
        const ids: string[] = [];

        structure.forEach((s) => {
            if (s.type === FormMakerPartEnum.TAB) {
                (s.content as IFormMakerPanel[]).forEach((p: IFormMakerPanel) => {
                    p.content.forEach((el) => {
                        ids.push(el.id);
                    });
                });
            } else {
                (s.content as IFormMakerInput[]).forEach((el) => {
                    ids.push(el.id);
                });
            }
        });

        const duplicate = appTool.findDuplicates(ids);

        if (duplicate.length > 0) {
            throw new AppError(ErrorTypeEnum.Technical, `found duplicate ids in formMaker (${duplicate.join(',')}) input must have uniq id`);
        }
    };

    // /**
    //  *
    //  * @param id
    //  * @returns data
    //  */
    // const foundDataById = (id: string): string | number | boolean => {
    //     let key = '';
    //     if (data) {
    //         for (const entry in data) {
    //             if (id.toString() === entry) {
    //                 key = entry;
    //             }
    //         }
    //         if (key !== '') {
    //             return data[key];
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return null;
    //     }
    // };

    const buildPanelContent = (struct: FormMakerContentType<FormMakerPartEnum.PANEL | FormMakerPartEnum.SEARCH>, index: number) => {
        const groupedElement: JSX.Element[] = [];
        let currentGroup: JSX.Element[] = [];

        struct.content.forEach((element, i) => {
            if (element.index === 1) {
                if (currentGroup.length > 0) {
                    groupedElement.push(
                        <AppGridContainer key={i} spacing={2}>
                            {currentGroup}
                        </AppGridContainer>
                    );
                    currentGroup = [];
                }
                currentGroup.push(buildInput(element, i));
            } else {
                currentGroup.push(buildInput(element, i));
            }

            if (i === struct.content.length - 1) {
                groupedElement.push(
                    <AppGridContainer key={i + 1} spacing={2}>
                        {currentGroup}
                    </AppGridContainer>
                );
                currentGroup = [];
            }
        });
        if (struct.type === FormMakerPartEnum.PANEL || structure[0].type === FormMakerPartEnum.TAB) {
            return (
                <AppCard key={index} icon={struct.icon} title={struct.title}>
                    {groupedElement}
                </AppCard>
            );
        } else {
            return (
                <Box key={index} display="flex" justifyContent="center" flexDirection="column" alignItems="center" marginBottom={4}>
                    {groupedElement}
                </Box>
            );
        }
    };

    const buildInput = (element: IFormMakerInput, i: number) => {
        if (element.type === 'checkbox' && !element.checkboxOptions) throw new AppError(ErrorTypeEnum.Technical, 'type checkbox must have checkbox options');
        else if (element.type === 'radio' && !element.radioOptions) throw new AppError(ErrorTypeEnum.Functional, 'type radio must have radio options');
        else if (element.type === 'switch' && !element.selectOptions) throw new AppError(ErrorTypeEnum.Functional, 'type switch must have select options');
        else if (element.type === 'select' && !element.selectOptions) throw new AppError(ErrorTypeEnum.Functional, 'type select must have select options');
        else if (element.type === 'tokenmultiple' && !element.selectOptions) throw new AppError(ErrorTypeEnum.Functional, 'type tokenmultiple must have select options');
        else if (element.type === 'htmlContent' && !element.htmlContent) throw new AppError(ErrorTypeEnum.Functional, 'type htmlContent must have htmlContent');
        const baseProps: InputBaseType = {
            size: element.size,
            icon: element.icon,
            id: element.id,
            helpText: element.helpText,
            label: element.label,
            required: element.required,
            disabled: element.disabled,
            value: element.value ? element.value : data ? data[element.id] : null,
            errorMessage: element.errorMessage,
            error: focusOnError.includes(element.id.toLowerCase()) || element.error,
            isLoading: element.isLoading,
            success: element.success,
            warning: element.warning,
            onChange: element.onChange,
            sx: element.sx,
            autoComplete: element.autoComplete,
            autoCapitalize: element.autoCapitalize,
        };
        if (isView) {
            let founded = null;
            switch(element.type) {
                case "select":
                    if (baseProps.value) {
                        founded = element.selectOptions.find(e => e.value === baseProps.value);
                        if (founded) {
                            baseProps.value = founded.label;
                        }
                    }
                    break;
                case "radio":
                    founded = null;
                    if (baseProps.value) {
                        founded = element.radioOptions.find(e => e.value === baseProps.value);
                        if (founded) {
                            baseProps.value = founded.label;
                        }
                    }
                    break;
                case "checkbox":
                    founded = null;
                    if (baseProps.value) {
                        founded = element.checkboxOptions.find(e => e.value === baseProps.value);
                        if (founded) {
                            baseProps.value = founded.label;
                        }
                    }
                    break;
                case "date":
                    const date = moment(baseProps.value).format("DD/MM/yyyy")
                    baseProps.value = date;
                    break;
                default:
                    break;
            }
            if (element.type !== "htmlContent") element.type = "value";
        }
        switch (element.type) {
            case 'email':
            case 'number':
            case 'search':
            case 'url':
            case 'text':
            case "value":
                return <InputTextField {...baseProps} key={i} type={element.type} />;
            case "hidden":
                return <InputHidden {...baseProps} key={i} />
            case 'checkbox':
                return <InputCheckBoxField {...baseProps} key={i} options={element.checkboxOptions} />;
            case 'select':
                return <InputSelectField {...baseProps} key={i} options={element.selectOptions} />;
            case 'tel':
                return <InputTelephoneField {...baseProps} key={i} />;
            case 'tokenmultiple':
                return <InputAutoCompleteMultiple {...baseProps} key={i} options={element.selectOptions} />;
            case 'autocomplete':
                return <InputAutoComplete {...baseProps} key={i} onSelectAutocompleteInput={element.onSelectAutocompleteInput} options={element.selectOptions} />;
            case 'radio':
                return <InputRadioField {...baseProps} key={i} options={element.radioOptions} />;
            case 'textarea':
                return <InputTextAreaField {...baseProps} key={i} limit={element.limit} rows={element.rows} />;
            case 'date':
                return <InputDateField {...baseProps} key={i} format={element.dateFormat} views={element.dateViews} openTo={element.dateOpenTo} />;
            case "dateTime":
                return <InputDateField {...baseProps} key={i} mode="dateTime" format={element.dateFormat} views={element.dateViews} openTo={element.dateOpenTo} />;
            case "time":
                return <InputDateField {...baseProps} key={i} mode="time" format={element.dateFormat} views={element.dateViews} openTo={element.dateOpenTo} />;
            case 'color':
                return <InputColorField {...baseProps} key={i} />;
            case 'switch':
                return <InputSwitchField {...baseProps} key={i} options={element.checkboxOptions} />;
            case 'range':
                return <RangeInput {...baseProps} key={i} />;
            case 'htmlContent':
                return <Container sx={{ width: "100%" }} key={i}>{element.htmlContent}</Container>;
            case 'file':
                return (
                    <InputFileField
                        {...baseProps}
                        onChange={(e) => {
                            setFile(e as File);
                            setFileFields(baseProps.id);
                        }}
                        key={i}
                    />
                );
            default:
                return <InputTextField {...baseProps} key={i} />;
        }
    };

    const getActionLabel = (str: string) => {
        switch (str.toLowerCase()) {
            case "update":
                return "Modifier";
            case "delete":
                return "Supprimer";
            case "table":
                return "Rechercher";
            default:
                return 'Ajouter';
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        const form = document.getElementById('Form');
        const genericAction = params.has('action') ? params.get('action') : '';

        if (form && genericAction && (genericAction === 'update' || genericAction === 'new')) {
            const showTab = (tabId) => {
                // Implement your showTab logic here
            };

            const handleFormSubmit = () => {
                setFormSubmitted(true);
            };

            const handleInvalidInput = (e) => {
                let tab = e.target;
                while (!tab.id.startsWith('Form')) {
                    tab = tab.parentNode;
                }
                showTab(parseInt(tab.id.replace('Form', '')));
            };

            form.addEventListener('submit', handleFormSubmit);
            form.addEventListener('invalid', handleInvalidInput, true);

            // Cleanup event listeners when component unmounts
            return () => {
                form.removeEventListener('submit', handleFormSubmit);
                form.removeEventListener('invalid', handleInvalidInput, true);
            };
        }
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box encType="multipart/form-data" name="Form" id="Form" onSubmit={(e) => onSubmit(handleSubmit(e))} component="form" sx={{ width: '100%', flexGrow: 1, marginTop: 2 }}>
            {renderForm()}
            <Container component="div" sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                {!isView && <InputSubmit isLoading={isSubmitLoading} label={`${getActionLabel(action)} ${grammar}`} onBackPress={onBackPress} />}
            </Container>
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IFormMaker<T> {
    onSubmit: (f: FormData | T) => void;
    onBackPress?: () => void;
    structure: FormMakerContentType<FormMakerPartEnum>[];
    data?: T;
    outputType?: 'formData' | 'JSON';
    isSubmitLoading?: boolean;
    focusOnError?: string[];
    grammar?: string;
    action?: string;
    isView?: boolean;
}
// #endregion IPROPS --> //////////////////////////////////
