import { useState, useRef, useEffect } from 'react';
import Modal from '../common/Modal';
import { Box } from '@mui/material';
import { Media } from '~/models/medias';
import appTool from '~/helpers/appTool';
import AppIcon from '../common/AppIcon';

const defaultHeight = 385;
//const blurLoading = 'https://res.cloudinary.com/dzihfqu6l/image/upload/v1664362652/ClW7h_xho4ni.jpg';

export default function PhotoGallery({ medias }: IPhotoGallery) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentPhoto, setCurrentPhoto] = useState<string>(medias[0].url);
    const [currentWidth, setCurrentWidth] = useState<number>(0);
    const [currentHeight, setCurrentHeight] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const ref = useRef<HTMLBRElement | null>(null);

    const update = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', update);
        update();
    }, []);

    const openCloseModal = (path?: string, width?: number, height?: number): void => {
        setIsOpen(!isOpen);
        if (path && width && height) {
            setCurrentPhoto(path);
            setCurrentWidth(appTool.getWidth(height, width, 600));
            setCurrentHeight(600);
        }
    };

    const scroll = (scrollOffset: number) => {
        if (ref.current !== null) {
            ref.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <Box className="d-flex align-items-center position-relative">
            <Box className="d-flex justify-content-center align-items-center position-absolute bg-none w-100">
                <Box onClick={() => scroll(-500)} className="left-right-arrow position-absolute start-0">
                    <AppIcon name="ArrowBackIosRounded" />
                </Box>
                <Box onClick={() => scroll(500)} className="left-right-arrow position-absolute end-0">
                    <AppIcon name="ArrowForwardIosRounded" />
                </Box>
            </Box>
            <Box className="img-gallery-container" ref={ref}>
                {medias.map((img: Media) => {
                    return (
                        <Box key={img.id} className="picture-gallery">
                            <img width={appTool.getWidth(img.height, img.width, defaultHeight)} height={384} loading="lazy" onClick={() => openCloseModal(img.url, img.width, img.height)} src={img.url} alt="Mell" />
                        </Box>
                    );
                })}
            </Box>
            <Box>
                <Modal fullWidth={false} noLayout isOpen={isOpen} onClose={openCloseModal}>
                    <Box className="img-modal-gallery">
                        <img width={screenWidth < 500 ? currentWidth / 2 : currentWidth} height={screenWidth < 500 ? currentHeight / 2 : currentHeight} src={currentPhoto} alt="photo de l'artiste Mell" />
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}

interface IPhotoGallery {
    medias: Media[];
}
