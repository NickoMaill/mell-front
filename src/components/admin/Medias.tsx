// #region IMPORTS -> /////////////////////////////////////
import React from 'react';
import AppCenter from '../center/AppCenter';
import { AppTableStructure } from '../common/AppTable';
import { Media, MediaGroupEnum, MediaPayloadType, MediaType } from '~/models/medias';
import { Box } from '@mui/material';
import AppIcon from '../common/AppIcon';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Medias({ id, action }) {
    // #region STATE --> ///////////////////////////////////////
    const list: AppTableStructure<Media> = {
        defaultSort: { field: 'id', sort: 'asc' },
        actions: ['view', 'update', 'delete'],
        colStruct: [
            { headerField: 'id', headerLabel: 'ID', sortable: true, defaultSorted: true, type: 'number', width: 80 },
            { headerField: 'url', headerLabel: 'Aperçu', type: 'string', sortable: false, width: 100, valueFormatter: (e) => <Box component={'img'} src={e} width={'50px'} /> },
            { headerField: 'width', headerLabel: 'Largeur', sortable: true, type: 'number', valueFormatter: (e) => `${e} px` },
            { headerField: 'height', headerLabel: 'Hauteur', sortable: true, type: 'number', valueFormatter: (e) => `${e} px` },
            { headerField: 'mediaGroup', headerLabel: 'Type', sortable: true, type: 'string' },
            { headerField: 'type', headerLabel: 'format', sortable: true, type: 'string' },
            { headerField: 'isVideo', headerLabel: 'Vidéo ?', sortable: true, type: 'boolean', valueFormatter: (e) => ((e as boolean).toString() === 'true' ? <AppIcon color="success" name="Check" /> : <></>) },
            {
                headerField: 'size',
                headerLabel: 'Taille',
                sortable: true,
                type: 'number',
                valueFormatter: (e) =>
                    Math.round((e as number) / 1000, 2)
                        .toString()
                        .replace('.', ',') + ' ko',
            },
        ],
    };

    const form: FormMakerContentType<FormMakerPartEnum.PANEL>[] = [
        {
            title: 'Importer votre média',
            type: FormMakerPartEnum.PANEL,
            content: [
                {
                    id: 'url',
                    label: 'Votre fichier ici',
                    type: 'file',
                    index: 1,
                    size: 4,
                },
                {
                    id: 'test',
                    label: 'test input',
                    type: 'text',
                    index: 2,
                    size: 4,
                },
                {
                    id: 'type',
                    label: 'Catégorie',
                    type: 'select',
                    selectOptions: [
                        { label: 'Galerie', value: MediaGroupEnum.CARROUSEL },
                        { label: 'Spectacle', value: MediaGroupEnum.SHOWS },
                        { label: 'Presse', value: MediaGroupEnum.NEWSPAPERS },
                    ],
                    index: 3,
                    size: 3,
                    required: true,
                    helpText: `
                    <ul class="p-0 ps-3">
                        <li><b>Galerie</b> : Apparaîtra en page d'accueil</li>
                        <li><b>Spectacle</b> : concerne les spectacle</li>
                        <li><b>Presse</b> : concerne une revue de presse</li>
                    </ul>`,
                },
            ],
        },
    ];

    const searchForm: FormMakerContentType<FormMakerPartEnum.SEARCH>[] = [
        {
            title: '',
            content: [
                {
                    id: 'mediaGroup',
                    label: 'Catégorie',
                    type: 'select',
                    selectOptions: [
                        { label: 'Galerie', value: MediaGroupEnum.CARROUSEL },
                        { label: 'Spectacle', value: MediaGroupEnum.SHOWS },
                        { label: 'Presse', value: MediaGroupEnum.NEWSPAPERS },
                    ],
                    index: 1,
                    size: 12,
                },
                {
                    id: 'type',
                    label: 'format',
                    type: 'select',
                    selectOptions: [
                        { label: 'webp', value: 'webp' },
                        { label: 'jpg', value: 'jpg' },
                        { label: 'png', value: 'png' },
                    ],
                    index: 1,
                    size: 12,
                },
            ],
        },
    ];
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <AppCenter<Media>
            searchFormStruct={searchForm}
            icon="Image"
            allowAdd
            allowUpdate
            allowDelete
            entity="Medias"
            genericAction={action}
            id={id}
            listStruct={list}
            specifiers={{ singular: 'le', plural: 'les' }}
            grammar={{ singular: 'Média', plural: 'Médias' }}
            actions={['view', 'update', 'delete']}
            formStruct={form}
        />
    );
    // #endregion RENDER --> ///////////////////////////////////
}
// #region IPROPS -->  /////////////////////////////////////
interface IMedias {}
// #enderegion IPROPS --> //////////////////////////////////
