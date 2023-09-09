import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

const Backdrop = ({ toggleModalClose }) => {
    return <div className={styles["modal__backdrop"]} onClick={toggleModalClose}></div>;
};

const ModalOverlay = ({ toggleModalClose, children }) => {
    return <div className={styles["modal"]}>{children}</div>;
};

const Modal = ({ toggleModalClose, children }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop toggleModalClose={toggleModalClose} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onClick={toggleModalClose}>{children}</ModalOverlay>,
                document.getElementById("overlay-root")
            )}
        </>
    );
};
export default Modal;
