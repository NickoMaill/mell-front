import { JSX } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { RecursiveKeyOf } from './custom';

export type RouterDescription = {
    name: RecursiveKeyOf<RouteNameReference>;
    path: string;
    isAuthRequired: boolean;
    query?: ParsedUrlQuery;
    element: () => JSX.Element;
    title: string;
};

export type RouteNameReference = {
    Home;
};
