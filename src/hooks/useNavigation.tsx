import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
import { Location, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AppError, ErrorTypeEnum } from '~/core/appError';
import navigationResources from '~/resources/navigationResources';
import { RecursiveKeyOf } from '~/core/types/custom';
import { RouteNameReference, RouterDescription } from '~/core/types/route';

const urlRegex = /^(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)|http:\/\/localhost:\d+)$/i;

export default function useNavigation(): IUseNavigation {
    const [currentRoute] = useState<RouterDescription | null>(null);
    const navigateTo = useNavigate();
    const [queryString] = useSearchParams();
    const location = useLocation();
    const pathname = location.pathname;
    const query = Object.fromEntries([...queryString]);

    const navigate = (name: RecursiveKeyOf<RouteNameReference>, params?: string, replace?: boolean): void => {
        const indexRoute: number = navigationResources.routes.findIndex((item) => item.name === name);
        if (indexRoute > -1) {
            const routesData = navigationResources.routes[indexRoute];
            const isParamsCompatible = routesData.path.includes(':');

            if (pathname === routesData.path) {
                throw new AppError(ErrorTypeEnum.Functional, `navigation guard activate due to duplicate navigation to ${pathname}`, 'duplicate_navigation');
            }
            navigateTo(params && isParamsCompatible ? routesData.path.split(':')[0] + params : routesData.path, replace ? { replace } : null);
        } else {
            throw new AppError(ErrorTypeEnum.Functional, 'wrong routes', 'wrong_routes');
        }
    };

    const navigateByPath = (path: string, replace?: boolean) => {
        navigateTo(path, replace ? { replace } : null);
    };

    const externalNavigate = (url: string, blank?: boolean) => {
        // if (url.match(urlRegex)) {
        // } else {
        //     throw new AppError(ErrorTypeEnum.Functional, 'wrong format url', 'wrong_url');
        // }
        window.open(url, blank && '_blank');
    };

    const goToHomePage = () => {
        navigate('Home');
    };

    const goBack = () => {
        navigateTo(-1);
    };

    // const goForward = () => {
    //     navigateTo(1);
    // };

    const getPathDescription = (url: string = pathname) => {
        const route = findRoute(url);
        if (route) {
            return route;
        } else {
            throw new AppError(ErrorTypeEnum.Functional, 'wrong routes', 'wrong_routes');
        }
    };

    const findRoute = (url: string) => {
        const routeDescription = navigationResources.routes.find((item) => item.path === url);

        if (query && routeDescription) {
            routeDescription.query = query;
        }

        return routeDescription;
    };

    const logCurrentRoute = () => {
        const route = findRoute(pathname);
        console.group('%c--> route description', 'background: #1cb7ff; color: #000');
        console.log(route);
        console.groupEnd();
    };

    return { navigate, navigateByPath, externalNavigate, goBack, goToHomePage, pathname, getPathDescription, currentRoute, logCurrentRoute, query, location };
}

interface IUseNavigation {
    navigate: (name: RecursiveKeyOf<RouteNameReference>, params?: string, replace?: boolean) => void;
    externalNavigate: (url: string) => void;
    goBack: () => void;
    goToHomePage: () => void;
    pathname: string;
    getPathDescription: (url?: string) => RouterDescription;
    currentRoute: RouterDescription | null;
    logCurrentRoute: () => void;
    query: ParsedUrlQuery;
    navigateByPath: (path: string, replace?: boolean) => void;
    location: Location<any>;
}
