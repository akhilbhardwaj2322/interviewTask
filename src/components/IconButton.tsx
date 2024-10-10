import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge';
import * as React from 'react'

export const IconButton = (props: {
    icon: IconProp,
    className?: string,
    onClick: () => void,
    children?: React.ReactNode,
}) => {
    const handleClick = (evt: any) => {
        evt.preventDefault()
        props.onClick()
        return false
    }

    return <a href="" 
            className={twMerge(
                `w-6 mr-2 transition
                opacity-75 hover:opacity-100 focused:opacity-100 active:opacity-100
                inline-flex flex-row gap-0
                ${props.className ?? ""}`
            )}
            onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} />
        {props.children}
    </a>
}