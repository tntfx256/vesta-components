import { IBaseComponentProps } from "../BaseComponent";

export interface IScriptProps extends IBaseComponentProps {
    src: string;
    success: () => void;
    error?: () => void;
}


export function Script(props: IScriptProps) {
    if (!props.src) { return null; }
    const head = (document.documentElement as HTMLElement).querySelector("head") as HTMLHeadElement;
    const script = document.createElement("script");
    script.setAttribute("src", props.src);
    script.addEventListener("load", props.success);
    head.appendChild(script);

    return null;
}
