import cx from "classnames";
import React from "react";

const Button = React.forwardRef(
    ({ children, className, ...props }, ref) => (
        <button
            ref={ref}
            {...props}
            className={`focus:outline-none hover:underline ${className}`}
            tabIndex="-1"
        >
            {children}
        </button>
    )
);

Button.displayName = "Button";
export default Button;
