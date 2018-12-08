import React, { PureComponent } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Config } from "../../service/Config";
import { IBaseComponentProps } from "../BaseComponent";

interface IModalProps extends IBaseComponentProps {
    show: boolean;
    name?: string;
    className?: string;
    onClick?: (e) => void;
}

export class Modal extends PureComponent<IModalProps, null> {
    public static count = 0;
    // because of this property, this component can not be stateless
    private isOpen = false;
    private transTime = Config.getConfig().transition;

    public componentWillUnmount() {
        this.updateStatus(false);
    }

    public render() {
        const { name, show, children, className = "" } = this.props;
        const { enter, leave } = this.transTime;
        this.updateStatus(show);
        const content = show ?
            <div className={`modal ${className}`} onClick={this.onModalClicked}>
                {children}
            </div> : null;

        return (
            <ReactCSSTransitionGroup transitionName={name || "modal"} transitionEnterTimeout={enter}
                transitionLeaveTimeout={leave}>
                {content}
            </ReactCSSTransitionGroup>
        );
    }

    private updateStatus(show: boolean) {
        if (show) {
            if (!this.isOpen) {
                this.isOpen = true;
                ++Modal.count;
            }
        } else {
            if (this.isOpen) {
                this.isOpen = false;
                --Modal.count;
            }
        }
        if (Modal.count == 1) {
            document.documentElement.classList.add("modal-open");
        } else if (!Modal.count) {
            document.documentElement.classList.remove("modal-open");
        }
    }

    private onModalClicked = (e) => {
        const { onClick } = this.props;
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    }
}
