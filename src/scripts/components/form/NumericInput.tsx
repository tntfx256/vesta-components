import React, { ChangeEvent, InputHTMLAttributes, PureComponent } from "react";
import { IBaseComponentProps } from "../../BaseComponent";
import { IFromControlProps } from "./FormWrapper";

interface INumericInputProps extends IBaseComponentProps, IFromControlProps {
    format?: boolean;
    size?: number;
    step?: number;
    value: number | string;
}

export class NumericInput extends PureComponent<INumericInputProps, null> {

    public render() {
        const { label, name, value, step, error, size } = this.props;
        const displayValue = this.format(value as string);
        const attrs: InputHTMLAttributes<HTMLInputElement> = { className: "form-control", name, type: "number" };
        if (step) {
            attrs.step = step;
        }
        if (size) {
            attrs.size = size;
        }

        return (
            <div className={`form-group numeric-input ${error ? "has-error" : ""}`}>
                <label htmlFor={name}>{label}</label>
                <input {...attrs} value={displayValue} onChange={this.onChange} />
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private format(value: string): string {
        if (!value) {
            return "";
        }
        return this.props.format ? (+value).toLocaleString() : value;
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.props.onChange(this.props.name, isNaN(+value) ? 0 : value);
    }
}
