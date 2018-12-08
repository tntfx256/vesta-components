import React, { ChangeEvent, PureComponent } from "react";
import { IBaseComponentProps } from "../../BaseComponent";
import { IFromControlProps } from "./FormWrapper";

interface ITextAreaProps extends IBaseComponentProps, IFromControlProps {
    value: string;
}

interface ITextAreaState { }

export class TextArea extends PureComponent<ITextAreaProps, ITextAreaState> {

    public render() {
        const { label, name, value, error } = this.props;

        return (
            <div className={`form-group text-area${error ? " has-error" : ""}`}>
                <label htmlFor={name}>{label}</label>
                <textarea className="form-control" name={name} id={name} value={value || ""}
                    onChange={this.onChange} />
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, onChange } = this.props;
        if (onChange) {
            onChange(name, e.target.value);
        }
    }
}
