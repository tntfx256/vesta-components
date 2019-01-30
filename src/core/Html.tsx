import { PureComponent } from "react";

export interface IHtmlProps {
    lang: string;
    dir: string;
}

interface IEmptyState { }

export class Html extends PureComponent<IHtmlProps, IEmptyState> {

    public componentDidMount() {
        const { lang, dir } = this.props;
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", dir);
    }

    public render() {
        return null;
    }
}
