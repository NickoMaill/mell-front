import { SearchField } from '~/context/searchContext';
import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';
import { ArticleAttachementTypeEnum } from '~/models/articles';

class AppTool {
    constructor() {}

    // public --> start region /////////////////////////////////////////////
    public changeTitle(title: string): void {
        document.title = title;
    }

    public findDuplicates(arr: string[]): string[] {
        const count = {};
        const duplicates = [];

        arr.forEach((item) => {
            count[item] = (count[item] || 0) + 1;
        });

        for (const key in count) {
            if (count[key] > 1) {
                duplicates.push(key);
            }
        }

        return duplicates;
    }

    public URLTester(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    public toCapitalize(str: string): string {
        const words = str.split(' ');
        const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }

    public getTotalMilliseconds(timeString: string): number {
        const parts = timeString.split(':');
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const secondsWithFraction = parts[2].split('.');
        const seconds = parseInt(secondsWithFraction[0]) || 0;
        const milliseconds = parseInt(secondsWithFraction[1]) || 0;

        // Convertir les heures, minutes et secondes en millisecondes
        const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;

        return totalMilliseconds;
    }

    public BuildSearchURL(filters: SearchField[], start: string = '&'): string {
        let url = start;
        filters.forEach((f) => {
            url += `${f.field}=${f.values}&`;
        });
        return url.substring(0, url.length - 1);
    }

    public ParseSearchUrl(searchForm: FormMakerContentType<FormMakerPartEnum.SEARCH>[]): SearchField[] {
        const searchField: SearchField[] = [];
        const query = window.location.search.replace('?', '');
        query.split('&').forEach((q) => {
            if (!q.toLowerCase().startsWith('table') && !q.toLowerCase().startsWith('action')) {
                const keyValuePair = q.split('=');
                const obj = new Object();
                const index = searchForm[0].content.findIndex((f) => f.id === keyValuePair[0]);
                if (index > -1) {
                    Object.defineProperty(obj, 'field', { value: keyValuePair[0], writable: true });
                    Object.defineProperty(obj, 'fieldName', { value: searchForm[0].content[index].label, writable: true });
                    Object.defineProperty(obj, 'values', { value: keyValuePair[1], writable: true });
                    searchField.push(obj as SearchField);
                }
            }
        });
        return searchField;
    }

    public articleTypeTranslater(type: ArticleAttachementTypeEnum) {
        switch (type) {
            case ArticleAttachementTypeEnum.AUDIO:
                return 'Audio';
            case ArticleAttachementTypeEnum.VIDEO:
                return 'Vidéo';
            case ArticleAttachementTypeEnum.YOUTUBE:
                return 'YouTube';
            default:
                return 'Aucun';
        }
    }

    public getWidth(height: number, width: number, newHeight: number): number {
        const newWidth: number = Math.floor((width / height) * newHeight);
        return newWidth;
    }

    public getUploadSize(pictureResult: string): Promise<{ height: number; width: number }> {
        const image = new Image();
        image.src = pictureResult;
        return new Promise((resolve) => {
            image.onload = () => {
                const sizes = { height: image.height / 5, width: image.width / 5 };
                resolve(sizes);
            };
        });
    }

    public adapteSize(width: number, height: number) {
        if (width > height) {
            if (width > 1200) {
                width = width / 3;
                height = height / 3;
            }
        } else if (width < height) {
            if (height > 1500) {
                width = width / 3;
                height = height / 3;
            }
        } else if (width === height) {
            if (height > 800) {
                width = width / 2;
                height = height / 2;
            }
        }

        return {
            width,
            height,
        };
    }
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new AppTool();
