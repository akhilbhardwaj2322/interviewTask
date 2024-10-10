import * as React from "react";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export const LinkButton = ({className, children, href, ...props}: JSX.IntrinsicElements['button'] & {href?: string, children: ReactElement | string | number}) => (
    <button className={
            twMerge("text-blue-600 shadow-none inline-block mr-2 transition",
                "bg-transparent hover:bg-transparent",
                "outline-none focus:outline-none",
                "opacity-75 hover:opacity-100 focused:opacity-100 active:opacity-100",
                className,
            )}
            onAuxClick={props.onClick}
            onMouseDown={e => {
                if (e.button === 1) {
                    e.preventDefault();
                }
            }}
            {...(href ? {'data-href': href} : {})}
            {...props}>
        {children}
    </button>
);
