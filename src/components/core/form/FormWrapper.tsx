import React, { FormEvent, PureComponent } from "react";
import { IBaseComponentProps } from "../../BaseComponent";

export type ChangeEventHandler = (name: string, value: any) => void;

export interface IFromControlProps {
    error?: string;
    label?: string;
    name: string;
    hint?: string;
    readonly?: boolean;
    required?: boolean;
    value: any;
    onChange: ChangeEventHandler;
}

export interface IFormOption {
    id: number;
    title: string;
}

interface IFormWrapperProps extends IBaseComponentProps {
    name?: string;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

interface IFormWrapperState { }

export class FormWrapper extends PureComponent<IFormWrapperProps, IFormWrapperState> {

    public render() {
        return (
            <div className="form-wrapper">
                <form name={this.props.name} onSubmit={this.onSubmit} noValidate={true}>
                    {this.props.children}
                </form>
            </div>
        );
    }

    private onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const { onSubmit } = this.props;
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    }
}
