import { PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";

export interface IScriptProps extends IComponentProps {
    src: string;
    success: () => void;
    error?: () => void;
}

interface IEmptyState { }

export class Script extends PureComponent<IScriptProps, IEmptyState> {

    public render() {
        const { src, success } = this.props;
        if (!src) { return null; }
        const head = document.documentElement.querySelector("head") as HTMLHeadElement;
        const script = document.createElement("script");
        script.setAttribute("src", src);
        script.addEventListener("load", success);
        head.appendChild(script);
        return null;
    }
}
