import React, { ChangeEvent, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { extractClassNames } from "../util";

interface ITextAreaProps extends IComponentProps, IFromControlProps {
    value?: string;
}

interface IEmptyState { }

export class TextArea extends PureComponent<ITextAreaProps, IEmptyState> {

    public render() {
        const { label, name, value, error } = this.props;
        const classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error" });

        return (
            <div className={`form-group text-area${classNames}`}>
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
