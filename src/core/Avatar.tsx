import React, { ComponentType, MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import { withTheme } from "theming";
import { IBaseComponentProps } from "../BaseComponent";

interface IAvatarProps extends IBaseComponentProps {
    src: string;
    defaultSrc?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const Avatar: ComponentType<IAvatarProps> = withTheme((props: IAvatarProps) => {
    let loadDefault = false;
    let faileCount = 0;

    const [update, setUpdate] = useState(true);

    useEffect(() => {
        loadDefault = false;
    });

    const imageSrc = loadDefault ? props.defaultSrc : (props.src || props.defaultSrc);
    const avatar = imageSrc ? <img src={imageSrc} onError={imageLoadError} /> :
        <div className="avatar-holder" />;

    return (
        <div className="avatar" onClick={onClick}>
            {avatar}
            {props.children}
        </div>
    );

    function imageLoadError(e: SyntheticEvent<HTMLElement>) {
        ++faileCount;
        if (faileCount > 3) { return; }
        loadDefault = true;
        setUpdate(!update);
    }

    function onClick(e: MouseEvent<HTMLElement>) {
        if (props.onClick) {
            props.onClick(e);
        }
    }
});
