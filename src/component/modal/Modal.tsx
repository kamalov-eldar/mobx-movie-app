import React, { FC, useEffect, useRef, useState } from 'react';

type ModalPropsType = {
    activeProps: boolean;
    id: string;
    children: string;
};
type ModalContentPropsType = {
    onClose: () => void;
    children: string;
};

const Modal: FC<ModalPropsType> = ({ activeProps, id, children }) => {
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        setActive(activeProps);
    }, [activeProps]);

    return (
        <div id={id} className={`modal ${active ? 'active' : ''}`}>
            Modal
            {children}
        </div>
    );
};

export const ModalContent: FC<ModalContentPropsType> = ({
    onClose,
    children,
}) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    console.log('contentRef: ', contentRef);

    const closeModal = () => {
        if (contentRef) {
            contentRef?.current?.parentElement?.classList.remove('active');
        }
        if (onClose) onClose();
    };
    return (
        <div ref={contentRef} className="modal__content">
            {children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    );
};

export default Modal;
