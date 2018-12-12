import { PureComponent } from "react";

export interface IHtmlProps {
    lang: string;
    dir: string;
}

interface IHtmlState { }

export class Html extends PureComponent<IHtmlProps, IHtmlState> {

    public componentDidMount() {
        const { lang, dir } = this.props;
        (document.documentElement as HTMLElement).setAttribute("lang", lang);
        (document.documentElement as HTMLElement).setAttribute("dir", dir);
    }

    public render() {
        return null;
    }
}
