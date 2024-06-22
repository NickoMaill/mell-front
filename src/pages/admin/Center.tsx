// #region IMPORTS -> /////////////////////////////////////
import { Container } from '@mui/material';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppFullPageLoader from '~/components/common/AppFullPageLoader';
import { AppError, ErrorTypeEnum } from '~/core/appError';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function Center() {
    // #region STATE --> ///////////////////////////////////////
    const [component, setComponent] = useState<ReactNode>(null);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    const [params] = useSearchParams();
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    const loadingComponent = async () => {
        try {
            const module = await import(`../../components/admin/${params.get('Table')}.tsx`);
            const DynamicComponent = module.default || module;
            const componentProps = { id: params.has('ID') ? params.get('ID') : '', action: params.has('action') ? params.get('action') : 'table' };
            return <DynamicComponent {...componentProps} />;
        } catch (error) {
            console.error(error);
            throw new AppError(ErrorTypeEnum.Technical, 'error while loading main component', 'loading_error');
        }
    };
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        if (!params.has('Table')) {
            throw new AppError(ErrorTypeEnum.Functional, 'invalid params', 'invalid_params');
        } else if (params.get('action') === 'new' && params.has('ID')) {
            throw new AppError(ErrorTypeEnum.Functional, 'invalid params', 'invalid_params');
        } else {
            loadingComponent().then((res) => setComponent(res));
        }
    }, [params]);
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Container sx={{ '@media (min-width: 1200px)': { maxWidth: null } }}>
            <Suspense fallback={<AppFullPageLoader isLoading/>}>{component}</Suspense>
        </Container>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
// #endregion IPROPS --> //////////////////////////////////
