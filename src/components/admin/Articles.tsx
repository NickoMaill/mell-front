// #region IMPORTS -> /////////////////////////////////////
import { useEffect, useState } from 'react';
import AppCenter from '../center/AppCenter';
import { AppTableStructure } from '../common/AppTable';
import { Article, ArticleAttachementTypeEnum } from '~/models/articles';
import { FormMakerContentType, FormMakerPartEnum, SelectOptionsType } from '~/core/types/FormMakerCoreTypes';
import useToolService from '~/hooks/services/useToolService';
import appTool from '~/helpers/appTool';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Articles({ id, action }) {
    // #region STATE --> ///////////////////////////////////////
    const [newsPaper, setNewsPaper] = useState<SelectOptionsType[]>([]);

    const listStruct: AppTableStructure<Article> = {
        defaultSort: { field: 'id', sort: 'asc' },
        actions: ['view', 'update', 'delete'],
        colStruct: [
            { headerField: 'id', headerLabel: 'ID', sortable: true, type: 'number', width: 90, defaultSorted: true },
            { headerField: 'title', headerLabel: 'Titre', sortable: false, type: 'string' },
            { headerField: 'providerName', headerLabel: 'Journal', sortable: false, type: 'string' },
            { headerField: 'attachementType', headerLabel: 'Type de media', sortable: false, width: 100, type: 'string', valueFormatter: (e) => appTool.articleTypeTranslater(e) },
        ],
    };

    const form: FormMakerContentType<FormMakerPartEnum.PANEL>[] = [
        {
            title: 'Details',
            type: FormMakerPartEnum.PANEL,
            icon: 'DensitySmall',
            content: [
                {
                    id: 'title',
                    label: 'Titre',
                    index: 1,
                    type: 'text',
                    size: 4,
                    icon: 'Title',
                    required: true,
                },
                {
                    id: 'newsPaperId',
                    label: 'Journal',
                    index: 2,
                    type: 'select',
                    required: true,
                    selectOptions: newsPaper,
                    size: 3,
                    icon: 'Newspaper',
                },
                {
                    id: 'attachementUrl',
                    label: 'Media additionnel',
                    index: 3,
                    type: 'url',
                    icon: 'PermMedia',
                    required: false,
                    size: 3,
                },
                {
                    id: 'attachementType',
                    label: 'Type de média',
                    index: 4,
                    size: 2,
                    type: 'select',
                    icon: 'KeyboardArrowRightRounded',
                    selectOptions: [
                        { label: 'Vidéo', value: ArticleAttachementTypeEnum.VIDEO },
                        { label: 'YouTube', value: ArticleAttachementTypeEnum.YOUTUBE },
                        { label: 'Audio', value: ArticleAttachementTypeEnum.AUDIO },
                    ],
                    required: false,
                },
                {
                    id: 'description',
                    label: 'Résumé',
                    index: 1,
                    type: 'textarea',
                    icon: 'Notes',
                    required: true,
                },
                {
                    id: 'url',
                    label: "Url de l'article",
                    index: 1,
                    type: 'url',
                    icon: 'Link',
                    required: true,
                    size: 12,
                },
            ],
        },
    ];
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const ToolService = useToolService();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const getNewsPaper = async () => {
        const res = await ToolService.getNewsPapersProviderList();
        const out: SelectOptionsType[] = res.records.map((r) => {
            return {
                label: r.name,
                value: r.id,
            };
        });
        setNewsPaper(out);
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        getNewsPaper();
    }, []);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return <AppCenter<Article> grammar={{ singular: 'Article', plural: 'Articles', isFem: false }} specifiers={{ singular: "l'", plural: 'les' }} entity="Articles" id={id} genericAction={action} allowAdd allowUpdate allowDelete icon="Newspaper" listStruct={listStruct} formStruct={form} />;

    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IArticles {}
// #enderegion IPROPS --> //////////////////////////////////
