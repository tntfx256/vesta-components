import React, { MouseEvent, PureComponent } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IBaseComponentProps } from "../BaseComponent";


interface IModalProps extends IBaseComponentProps {
    enterDuration?: number;
    leaveDuration?: number;
    show: boolean;
    name?: string;
    className?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

interface IModalState { }

export class Modal extends PureComponent<IModalProps, IModalState> {
    public static count = 0;
    // because of this property, this component can not be stateless
    private isOpen = false;

    public componentWillUnmount() {
        this.updateStatus(false);
    }

    public render() {
        const { name, show, children, className = "", enterDuration = 100, leaveDuration = 100 } = this.props;
        this.updateStatus(show);
        const content = show ?
            <div className={`modal ${className}`} onClick={this.onModalClicked}>
                {children}
            </div> : null;

        return (
            <ReactCSSTransitionGroup transitionName={name || "modal"} transitionEnterTimeout={enterDuration}
                transitionLeaveTimeout={leaveDuration}>
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
            (document.documentElement as HTMLElement).classList.add("modal-open");
        } else if (!Modal.count) {
            (document.documentElement as HTMLElement).classList.remove("modal-open");
        }
    }

    private onModalClicked = (e: MouseEvent<HTMLDivElement>) => {
        const { onClick } = this.props;
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    }
}
