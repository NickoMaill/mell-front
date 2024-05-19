import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { RecursiveKeyOf } from '~/core/types/custom';
import { TranslationResourcesType } from '~/core/types/i18nTypes';

export default function useResources(): IUseResources {
    const { t } = useTranslation();

    const translate = (key: RecursiveKeyOf<TranslationResourcesType>, args?: any): string => {
        return t(key, args).toString();
    };

    // const importComponent = async <T,>(path: string, props?: T) => {
    //     try {
    //         const module = await import(path);
    //         const DynamicComponent = module.default || module;
    //         return <DynamicComponent {...props} />;
    //     } catch (error) {
    //         throw new AppError(ErrorTypeEnum.Functional, 'error while loading main component, error :' + error, 'loading_error');
    //     }
    // };

    return { translate };
}

interface IUseResources {
    translate: (key: RecursiveKeyOf<TranslationResourcesType>, args?: any) => string;
}
