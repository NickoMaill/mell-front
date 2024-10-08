import { ReactNode, useState } from 'react';
import ModalContext, { AppModalProperty } from '~/context/modalContext';
import Modal from '../common/Modal';
import { Breakpoint } from '@mui/material';
import AppFullPageModal from '../common/AppFullPageModal';

export default function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<ReactNode>(null);
    const [options, setOptions] = useState<AppModalProperty>({ size: 'md', scroll: 'paper', persistant: false, fullPage: false });

    const handleClickOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen, title, setTitle, content, setContent, options, setOptions }}>
            {children}
            {options.fullPage ? (
                <AppFullPageModal children={content} isOpen={isOpen} onClose={handleClose} modalTitle={title} />
            ) : (
                <Modal maxWidth={options.size} scroll={options.scroll} persistant={options.persistant} children={content} closable isOpen={isOpen} onClose={handleClose} modalTitle={title} />
            )}
        </ModalContext.Provider>
    );
}
