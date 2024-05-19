import { FormMakerContentType, FormMakerPartEnum } from '~/core/types/FormMakerCoreTypes';

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
    // public --> end region ///////////////////////////////////////////////

    // private --> start region ////////////////////////////////////////////
    // private --> end region //////////////////////////////////////////////
}
export default new AppTool();
