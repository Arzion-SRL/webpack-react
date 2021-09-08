import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import getClassName from '~utils/getClassName';

function Modal(props) {
    const {
        className, title, children, acceptButton, cancelButton, backdropClick, isLoading, isScrollable,
    } = props;

    const [isModalScrollable, setIsModalScrollable] = useState(isScrollable);
    const modalContentRef = useRef();
    const modalHeadRef = useRef();
    const modalBodyRef = useRef();
    const modalFooterRef = useRef();

    const updateScrollVisibility = () => {
        if (modalContentRef.current && modalBodyRef.current) {
            const contentHeight = modalContentRef.current.offsetHeight;
            const bodyHeight = modalBodyRef.current.offsetHeight;

            const headHeight = modalHeadRef.current?.offsetHeight || 0;
            const footerHeight = modalFooterRef.current?.offsetHeight || 0;

            // Because the body height is variable and the modal has a maximum height applied
            // we have to make a calculation to get the difference between the viewport height
            // and the maximum height of the content box. We have to add the header and footer
            // heights to the body to get the full content height
            const modalFullHeight = headHeight + bodyHeight + footerHeight;

            if (modalFullHeight > contentHeight) {
                setIsModalScrollable(true);
            } else {
                setIsModalScrollable(false);
            }

            // We need to add "no-animated" class to avoid wrong element positioning caused by animation
            modalContentRef.current.classList.add('no-animated');
        }
    };

    useEffect(() => {
        if (isScrollable) {
            updateScrollVisibility();
            setTimeout(updateScrollVisibility, 300);
        }
    });

    // When the user clicks in the modal body, cancel the event propagation.
    const handleModalBodyClick = event => event.stopPropagation();
    // When the user clicks in the modal background, trigger the close
    const handleModalBackgroundClick = () => backdropClick?.();
    const handleAcceptClick = () => acceptButton.onClick();
    const handleCancelClick = () => cancelButton.onClick();

    const modalClassName = getClassName({ isScrollable: isModalScrollable }, 'modal animated fade-in fastest', className);

    const modal = (
        <div id="modal" className={modalClassName} onClick={handleModalBackgroundClick}>
            <div className="modal-content animated popup fastest" onClick={handleModalBodyClick} ref={modalContentRef}>
                {isLoading && <div className="loading-line" />}
                {title && <div className="modal-head" ref={modalHeadRef}>{title}</div>}
                <div className="modal-body-wrapper">
                    <div className="modal-body" ref={modalBodyRef}>
                        {children}
                    </div>
                </div>
                {(acceptButton || cancelButton) && (
                    <div className="modal-footer" ref={modalFooterRef}>
                        {cancelButton && (
                            <button onClick={handleCancelClick} type="button">Cancel</button>
                        )}
                        {acceptButton && (
                           <button onClick={handleAcceptClick} type="button">Accept</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modal, document.getElementById('modals'));
}
export default Modal;
