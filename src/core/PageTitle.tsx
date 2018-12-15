import React, { PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

interface IPageTitleProps extends IBaseComponentProps {
    title: string;
    append?: boolean;
}

interface IEmptyState { }

export class PageTitle extends PureComponent<IPageTitleProps, IEmptyState> {
    private static baseTitle = document.title;

    public componentDidMount() {
        const { title, append } = this.props;
        document.title = append ? `${title}, ${PageTitle.baseTitle}` : title;
    }

    public render() {
        return null;
    }
}
