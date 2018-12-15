import React, { PureComponent } from "react";
import { IBaseComponentProps } from "./BaseComponent";
import { tr } from "./Config";
import { Dialog } from "./Dialog";

export interface IPreloaderProps extends IBaseComponentProps {
    title?: string;
    message?: string;
    show?: boolean;
    singleton?: boolean;
}

interface IPreloaderState {
    showMe?: boolean;
}

export class Preloader extends PureComponent<IPreloaderProps, IPreloaderState> {

    public static hide(force?: boolean) {
        // Dispatcher.getInstance().dispatch("preloader", { show: false });
        Preloader.instance.hide();
        Preloader.counter = force ? 0 : Preloader.counter - 1;
        if (Preloader.counter < 0) {
            Preloader.counter = 0;
        }
    }

    public static show() {
        Preloader.counter++;
        Preloader.instance.hide();
        // Dispatcher.getInstance().dispatch("preloader", { show: true });
    }

    private static counter = 0;
    private static instance: Preloader;
    private waitMessage;
    private inProgressMessage;
    // private show;

    constructor(props: IPreloaderProps) {
        super(props);
        // translate messages
        // const tr = Culture.getDictionary().translate;
        this.waitMessage = tr("msg_inprogress");
        this.inProgressMessage = tr("msg_wait");
        this.state = {};
        Preloader.instance = this;
    }

    // public componentDidMount() {
    //     Dispatcher.getInstance().register("preloader", (payload: IPreloaderState) => {
    //         this.setState({ showMe: payload.showMe });
    //     });
    // }
    public hide() {
        this.setState({ showMe: false });
    }
    public show() {
        this.setState({ showMe: true });
    }

    public render() {
        const { title = this.waitMessage, message = this.inProgressMessage } = this.props;

        return (
            <Dialog show={this.getStatus()} modalClassName="preloader-modal">
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

    private getStatus() {
        const { show, singleton } = this.props;
        const { showMe } = this.state;
        // if (show && !this.show) {
        //     setTimeout(() => {
        //         this.show = true;
        //         this.forceUpdate();
        //     }, 900);
        // }
        // if (!this.show || !show) {
        //     return <Dialog show={false} />;
        // }
        if (singleton && show) { return true; }
        if (showMe && Preloader.counter > 0) { return true; }
    }
}
