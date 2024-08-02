// #region IMPORTS -> /////////////////////////////////////
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import logo from "~/assets/pictures/logo.webp"
import landingPic from "~/assets/pictures/landing-no-text.png";
import AppIcon from '../common/AppIcon';
// #endregion IMPORTS -> //////////////////////////////////

// #region SINGLETON --> ////////////////////////////////////
const fadeAnim = "animate__fadeIn";
const fadeOutAnim = "animate__fadeOut";
const shakeAnim = "animate__shakeY";
// #endregion SINGLETON --> /////////////////////////////////

export default function LandingPic ({}: ILandingPic) {
    // #region STATE --> ///////////////////////////////////////
    const [animation, setAnimation] = useState<string>(fadeAnim);
    const [showArrow, setShowArrow] = useState<boolean>(true);
    // #endregion STATE --> ////////////////////////////////////

    // #region HOOKS --> ///////////////////////////////////////
    // #endregion HOOKS --> ////////////////////////////////////

    // #region METHODS --> /////////////////////////////////////
    // #endregion METHODS --> //////////////////////////////////

    // #region USEEFFECT --> ///////////////////////////////////
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100 && showArrow) {
                setAnimation(fadeOutAnim);
                setShowArrow(false);
            } else {
                setAnimation(fadeAnim);
                setShowArrow(true);
            }
        };
        const hideOrNotArrow = () => {
            console.log(window.innerWidth)
            if (window.innerWidth < 1140 && showArrow) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        window.addEventListener("resize", hideOrNotArrow);
        hideOrNotArrow();
        // Nettoyage de l'écouteur lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener("resize", () => hideOrNotArrow);
        };
    }, []);
    useEffect(() => {
        let interval;
        if (showArrow) {
            setAnimation(fadeAnim);
            interval = setInterval(() => {
                setAnimation(shakeAnim);
                setTimeout(() => { setAnimation(null) }, 1000);
            }, 10000);
        } else {
            clearInterval(interval);
        }
    }, [showArrow])
    // #endregion USEEFFECT --> ////////////////////////////////

    // #region RENDER --> //////////////////////////////////////
    return (
        <Box className="position-relative">
            <img className='landing-pic' src={landingPic} />
            <img width={"25%"} className='logo-header position-absolute landing-logo' src={logo} />
            {showArrow && (
                <Box className={`arrow-down animate__animated ${animation}`}>
                    <AppIcon name="ArrowDownwardRounded" size="large" sx={{ color: "white", width: "80px", height: "80px" }}/>
                </Box>
            )}
        </Box>
    );
    // #endregion RENDER --> ///////////////////////////////////
}

// #region IPROPS -->  /////////////////////////////////////
interface ILandingPic {}
// #enderegion IPROPS --> //////////////////////////////////