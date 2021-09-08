/* eslint-disable react/prop-types */

import Modal from '~components/Modal';
import Icon from '~components/Icon';

const ModalWelcome = ({
    permalink,
    setIsOpenModal,
}) => {

    return (
        <Modal
            cancelButton={{
                // onClick : () => setIsOpenModal(false),
                text    : 'Close',
            }}
            title={`Title 🎉`}
            className="modal-welcome"
        >
            <Icon name="global" />
            <p>
                content
            </p>
        </Modal>

    );
};

export default ModalWelcome;
