import React, { useState } from "react";
import styles from "./Input.module.scss";

const Input = React.forwardRef(({ label, id, defaultValue, ...rest }, ref) => {
    const [inputState, setInputState] = useState(defaultValue);

    return (
        <div className={styles["input"]}>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} ref={ref} value={inputState} onChange={(e) => setInputState(e.target.value)} {...rest} />
        </div>
    );
});

export default Input;
