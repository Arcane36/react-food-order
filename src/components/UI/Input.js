import styles from "./Input.module.scss";

const Input = ({ label, id, ...rest }) => {
    return (
        <div className={styles["input"]}>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...rest} />
        </div>
    );
};

export default Input;
