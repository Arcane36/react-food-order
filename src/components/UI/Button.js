import style from "./Button.module.scss";
import React from "react";

const Button = ({ type, children, onClick, bump, icon: Icon, badge }) => {
    return (
        <div className={`${style["button"]} ${bump ? style["button--bump"] : ""}`} type={type} onClick={onClick}>
            {Icon ? (
                <div className={`${style["button__icon"]}`}>
                    <Icon />
                </div>
            ) : (
                ""
            )}
            {children}
            {badge ? <div className={`${style["button__badge"]}`}>{badge}</div> : ""}
        </div>
    );
};

export default Button;