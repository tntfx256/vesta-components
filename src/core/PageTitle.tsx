import { ComponentType, useEffect } from "react";
import { IBaseComponentProps } from "../BaseComponent";


interface IPageTitleProps extends IBaseComponentProps {
    title: string;
    append?: boolean;
}

export const PageTitle: ComponentType<IPageTitleProps> = (props: IPageTitleProps) => {
    const baseTitle = document.title;

    useEffect(() => {
        document.title = props.append ? `${props.title} ${baseTitle}` : props.title;
        return () => document.title = baseTitle;
    });
    return null;
};
