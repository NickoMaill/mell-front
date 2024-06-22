// #region IMPORTS -> /////////////////////////////////////
import { Card, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
// #endregion SINGLETON --> /////////////////////////////////

export default function AppMiniCard({ cardData }: IAppMiniCard) {
    // #region STATE --> ///////////////////////////////////////
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <div>
            <Card sx={{ width: 320, margin: 2 }}>
                <CardMedia component="img" height="140" image={cardData.photo} alt={cardData.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cardData.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {cardData.subtitle}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={cardData.link1}>
                        <Button variant="contained" color="primary" size="small">
                            {cardData.btn1}
                        </Button>
                    </Link>
                    {cardData.btn2 && cardData.link2 && (
                        <Link to={cardData.link2}>
                            <Button variant="contained" size="small">
                                {cardData.btn2}
                            </Button>
                        </Link>
                    )}
                </CardActions>
            </Card>
        </div>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface IAppMiniCard {
    cardData: ICardData;
}

export interface ICardData {
    title: string;
    subtitle: string;
    photo: string;
    btn1: string;
    btn2?: string;
    link1?: string;
    link2?: string;
}
// #enderegion IPROPS --> //////////////////////////////////
