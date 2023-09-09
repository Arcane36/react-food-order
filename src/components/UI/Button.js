import style from "./Button.module.scss";
import React from "react";

const Button = ({ button = false, children, onClick, bump, icon: Icon, badge, small, alt }) => {
    let wrapperProps = {
        className: `${style["button"]} ${bump ? style["button--bump"] : ""} ${small ? style["button--small"] : ""} ${
            alt ? style["button--alt"] : ""
        }`,
        onClick: onClick,
    };

    return (
        <>
            {!button ? (
                <div {...wrapperProps}>
                    {Icon ? (
                        <div className={`${style["button__icon"]}`}>
                            <Icon />
                        </div>
                    ) : (
                        ""
                    )}
                    {children}
                    {typeof badge !== "undefined" ? <div className={`${style["button__badge"]}`}>{badge}</div> : ""}
                </div>
            ) : (
                <button type='submit' {...wrapperProps}>
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;
