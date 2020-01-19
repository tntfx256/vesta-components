import React, { ChangeEvent, InputHTMLAttributes, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { extractClassNames } from "../util";

interface INumericInputProps extends IComponentProps, IFromControlProps {
    format?: boolean;
    size?: number;
    step?: number;
    value?: number | string;
}

interface IEmptyState { }

export class NumericInput extends PureComponent<INumericInputProps, IEmptyState> {

    public render() {
        const { label, name, value, step, error, size } = this.props;
        const displayValue = this.format(value);
        const classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error" });
        const attrs: InputHTMLAttributes<HTMLInputElement> = {};
        if (step) {
            attrs.step = step;
        }
        if (size) {
            attrs.size = size;
        }

        return (
            <div className={`form-group numeric-input ${classNames} ${error ? "has-error" : ""}`}>
                <label htmlFor={name}>{label}</label>
                <input {...attrs} className="form-control" name={name} type="number" value={displayValue}
                    onChange={this.onChange} />
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private format(value: string | number): string {
        if (!value && value !== 0) {
            return "";
        }
        return this.props.format ? (+value).toLocaleString() : value as string;
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        if (this.props.onChange) {
            this.props.onChange(this.props.name, isNaN(value) ? 0 : value);
        }
    }
}
