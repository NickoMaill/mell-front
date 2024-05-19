import Typography, { TypographyProps } from '@mui/material/Typography';
import { RecursiveKeyOf } from '~/core/types/custom';
import { TranslationResourcesType } from '~/core/types/i18nTypes';
import useResources from '~/hooks/useResources';

export default function Text({ iText, iArgs, weight = 'Regular', ...props }: IText) {
    const Resources = useResources();
    return (
        <Typography {...props} fontWeight={weight}>
            {Resources.translate(iText, iArgs)}
        </Typography>
    );
}

export function Regular(props: TypographyProps) {
    return <Typography {...props} />;
}

export function Bold(props: TypographyProps) {
    return <Typography {...props} fontWeight="Bold" />;
}

export function Bolder(props: TypographyProps) {
    return <Typography {...props} fontWeight="Bolder" />;
}

export function Thin(props: TypographyProps) {
    return <Typography {...props} fontWeight="Thin" />;
}

export function Italic(props: TypographyProps) {
    return <Typography {...props} fontStyle="italic" />;
}

interface IText {
    iText: RecursiveKeyOf<TranslationResourcesType>;
    iArgs?: any;
    weight?: 'Regular' | 'Bold' | 'Bolder' | 'Thin' | 'italic';
}
