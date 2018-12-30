import { Culture } from "@vesta/culture";
import React, { PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { Dialog } from "./Dialog";

interface IPreloaderProps extends IComponentProps {
}

interface IPreloaderState {
    show?: boolean;
    title?: string;
    message?: string;
}

export class Preloader extends PureComponent<IPreloaderProps, IPreloaderState> {

    public static hide(force?: boolean) {
        Preloader.instance.hide();
        Preloader.counter = force ? 0 : Preloader.counter - 1;
        if (Preloader.counter < 0) {
            Preloader.counter = 0;
        }
    }

    public static show(title?: string, message?: string) {
        Preloader.counter++;
        Preloader.instance.show(title, message);
    }

    private static counter = 0;
    private static instance: Preloader;

    private defaultTitle: string;
    private defaultMessage: string;
    // private show;

    constructor(props: IPreloaderProps) {
        super(props);
        Preloader.instance = this;
        const tr = Culture.getDictionary().translate;
        this.defaultTitle = tr("please_wait");
        this.defaultMessage = tr("operation_in_progress");
        this.state = { show: false };
    }

    public render() {
        const { show, title, message } = this.state;

        return (
            <Dialog show={!!show} modalClassName="preloader-modal">
                <div className="preloader">
                    <div className="pl-wrapper">
                        <div className="pl-circular" />
                    </div>
                    <div className="pl-text">
                        <h3 className="pl-title">{title}</h3>
                        {message ? <p className="pl-message">{message}</p> : null}
                    </div>
                </div>
            </Dialog>
        );
    }

    private hide() {
        this.setState({ show: false });
    }
    private show(title?: string, message?: string) {
        this.setState({ show: true, title: title || this.defaultTitle, message: message || this.defaultMessage });
    }
}
