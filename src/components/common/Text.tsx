import Typography, { TypographyProps } from '@mui/material/Typography';
import { Fragment, ReactNode } from 'react';
import { RecursiveKeyOf } from '~/core/types/custom';
import { TranslationResourcesType } from '~/core/types/i18nTypes';
import useResources from '~/hooks/useResources';

function formatTextWithLineBreaks(text: ReactNode) {
    if (text && typeof text.valueOf() === 'string') {
        return (text as string).split('\n').map((item, i) => (
            <Fragment key={i}>
                {item}
                <br />
            </Fragment>
        ));
    } else {
        return text;
    }
}

export default function Text({ iText, iArgs, weight = 'Regular', ...props }: IText) {
    const Resources = useResources();
    return (
        <Typography {...props} fontWeight={weight}>
            {Resources.translate(iText, iArgs)}
        </Typography>
    );
}

export function Regular(props: TypographyProps) {
    return <Typography {...props}>{formatTextWithLineBreaks(props.children)}</Typography>;
}

export function Bold(props: TypographyProps) {
    return (
        <Typography {...props} fontWeight="Bold">
            {formatTextWithLineBreaks(props.children)}
        </Typography>
    );
}

export function Bolder(props: TypographyProps) {
    return (
        <Typography {...props} fontWeight="Bolder">
            {formatTextWithLineBreaks(props.children)}
        </Typography>
    );
}

export function Thin(props: TypographyProps) {
    return (
        <Typography {...props} fontWeight="Thin">
            {formatTextWithLineBreaks(props.children)}
        </Typography>
    );
}

export function Italic(props: TypographyProps) {
    return (
        <Typography {...props} fontStyle="italic">
            {formatTextWithLineBreaks(props.children)}
        </Typography>
    );
}

interface IText {
    children?: ReactNode;
    iText?: RecursiveKeyOf<TranslationResourcesType>;
    iArgs?: any;
    weight?: 'Regular' | 'Bold' | 'Bolder' | 'Thin' | 'italic';
}
