import { Culture } from "@vesta/core";
import React, { PureComponent, ReactNode } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { Dialog } from "./Dialog";

export enum MessageBoxType { Info = 1, Success, Error, Warning }

export enum MessageBoxBtn { Ok = 1, Cancel, Retry, Yes, No }

export enum MessageBoxBtnGroup { OK, OkCancel = 1, OkCancelRetry, CancelRetry, YesNo }

export interface IMessageBoxProps extends IBaseComponentProps {
    show: boolean;
    title?: string;
    type?: MessageBoxType;
    btnGroup?: MessageBoxBtnGroup;
    actions?: ReactNode[];
    onAction?: (btn: MessageBoxBtn) => void;
}

export interface IMessageBoxState {
}

export class MessageBox extends PureComponent<IMessageBoxProps, IMessageBoxState> {
    private tr = Culture.getDictionary().translate;

    constructor(props: IMessageBoxProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { actions, title, show, type, children } = this.props;
        const messageBoxBtns = actions || this.renderMessageBoxBtnGroup();

        return (
            <Dialog show={show} title={title} className={`msg-box msg-box-${type}`}>
                <div className="msg-box-content">
                    {children}
                </div>
                <div className="btn-group">
                    {messageBoxBtns}
                </div>
            </Dialog>
        );
    }

    private renderOkBtn(key: number) {
        return (
            <button className="btn btn-primary" key={key}
                onClick={this.onAction(MessageBoxBtn.Ok)}>{this.tr("ok")}</button>);
    }

    private renderButton(btn: MessageBoxBtn, text: string, className: string) {
        return <button className={`btn btn-${className}`} key={btn}
            onClick={this.onAction(btn)}>{this.tr(text)}</button>;
    }

    private renderMessageBoxBtnGroup() {
        switch (this.props.btnGroup) {
            case MessageBoxBtnGroup.CancelRetry:
                return [
                    this.renderButton(MessageBoxBtn.Retry, "retry", "primary"),
                    this.renderButton(MessageBoxBtn.Cancel, "cancel", "secondary"),
                ];
            case MessageBoxBtnGroup.OkCancel:
                return [
                    this.renderButton(MessageBoxBtn.Ok, "ok", "primary"),
                    this.renderButton(MessageBoxBtn.Cancel, "cancel", "secondary"),
                ];
            case MessageBoxBtnGroup.OkCancelRetry:
                return [
                    this.renderButton(MessageBoxBtn.Ok, "ok", "primary"),
                    this.renderButton(MessageBoxBtn.Cancel, "cancel", "secondary"),
                    this.renderButton(MessageBoxBtn.Retry, "retry", "secondary"),
                ];
            case MessageBoxBtnGroup.YesNo:
                return [
                    this.renderButton(MessageBoxBtn.Yes, "yes", "primary"),
                    this.renderButton(MessageBoxBtn.No, "no", "secondary"),
                ];
            default:
                return [
                    this.renderButton(MessageBoxBtn.Ok, "ok", "primary"),
                ];
        }
    }

    private onAction = (btn: MessageBoxBtn) => () => {
        const { onAction } = this.props;
        if (onAction) {
            onAction(btn);
        }
    }
}
