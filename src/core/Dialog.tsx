import React, { EventHandler, PureComponent, ReactChild, ReactNode } from "react";
import { IComponentProps } from "../BaseComponent";
import { Modal } from "./Modal";

export interface IDialogProps extends IComponentProps {
    title?: string;
    show: boolean;
    onClose?: EventHandler<any>;
    className?: string;
    modalClassName?: string;
    actions?: ReactNode;
}

interface IEmptyState { }

export class Dialog extends PureComponent<IDialogProps, IEmptyState> {

    public render() {
        const { show, className, modalClassName, children } = this.props;

        const header = this.renderHeader();
        const footer = this.renderFooter();

        return (
            <Modal show={show} animation="modal-zoom" className={modalClassName}>
                <div className={`dialog ${className ? `${className}` : ""}`}>
                    {header}
                    <div className="dialog-content">{children}</div>
                    {footer}
                </div>
            </Modal>
        );
    }

    private renderHeader() {
        const { title, onClose } = this.props;
        const titleBar = title ? <h3>{title}</h3> : null;
        const closeBtn = onClose ? <span className="btn" onClick={onClose}>X</span> : null;
        return titleBar || closeBtn ? (
            <div className="dialog-header">
                {titleBar}
            {closeBtn}
            </div>) : null;
    }

    private renderFooter() {
        const { actions } = this.props;
        if (!actions) {
            return null;
        }
        return (
            <div className="dialog-footer">
                {actions}
            </div>);
    }
}
