import { Culture } from "@vesta/culture";
import React, { PureComponent, ReactNode } from "react";
import { IComponentProps } from "../BaseComponent";
import { MessageType } from "../MessageType";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

export enum MessageBoxBtn { Ok = 1, Cancel, Retry, Yes, No }

export enum MessageBoxBtnGroup { OK, OkCancel = 1, OkCancelRetry, CancelRetry, YesNo }

export interface IMessageBoxProps extends IComponentProps {
    show: boolean;
    title?: string;
    type?: MessageType;
    btnGroup?: MessageBoxBtnGroup;
    actions?: ReactNode[];
    onAction?: (btn: MessageBoxBtn) => void;
}

interface IMessageBoxState {
}

export class MessageBox extends PureComponent<IMessageBoxProps, IMessageBoxState> {

    private tr = Culture.getDictionary().translate;

    constructor(props: IMessageBoxProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { title, show, type, children, actions } = this.props;
        const messageBoxBtns = this.renderMessageBoxBtnGroup();
        // let content = children;
        // if (children && (children as any).length) {
        //     content = children[0];
        //     messageBoxBtns.push(children[1]);
        // }

        return (
            <Dialog show={show} title={title} className={`msg-box msg-box-${type}`}>
                <div className="msg-box-content">
                    {children}
                </div>
                <div className="btn-group">
                    {actions}
                </div>
            </Dialog>
        );
    }

    private renderButton(key: number, btnType: MessageBoxBtn, color: string, variant: string, text: string) {
        return <Button key={key} color={color as any} variant={variant as any}
            onClick={this.onAction(btnType)}>{this.tr(text)}</Button>;
    }

    private renderMessageBoxBtnGroup() {
        switch (this.props.btnGroup) {
            case MessageBoxBtnGroup.CancelRetry:
                return [
                    this.renderButton(1, MessageBoxBtn.Retry, "primary", "", "retry"),
                    this.renderButton(2, MessageBoxBtn.Cancel, "", "outline", "cancel"),
                ];
            case MessageBoxBtnGroup.OkCancel:
                return [
                    this.renderButton(1, MessageBoxBtn.Ok, "primary", "", "ok"),
                    this.renderButton(2, MessageBoxBtn.Cancel, "", "outline", "cancel"),
                ];
            case MessageBoxBtnGroup.OkCancelRetry:
                return [
                    this.renderButton(1, MessageBoxBtn.Ok, "primary", "", "ok"),
                    this.renderButton(1, MessageBoxBtn.Retry, "", "outline", "retry"),
                    this.renderButton(3, MessageBoxBtn.Cancel, "", "outline", "cancel"),
                ];
            case MessageBoxBtnGroup.YesNo:
                return [
                    this.renderButton(1, MessageBoxBtn.Yes, "primary", "", "yes"),
                    this.renderButton(2, MessageBoxBtn.No, "", "outline", "yes"),
                ];
            default:
                return [
                    this.renderButton(1, MessageBoxBtn.Ok, "primary", "", "ok"),
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
