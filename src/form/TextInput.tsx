import React, { ChangeEvent, ComponentType } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { extractClassNames } from "../util";

interface ITextInputProps extends IComponentProps, IFromControlProps {
    dir?: "ltr" | "rtl";
    type?: string;
    value?: string;
    placeholder?: string;
}

export const TextInput: ComponentType<ITextInputProps> = (props: ITextInputProps) => {

    const type = props.type || "text";
    let classNames = extractClassNames(props, { value: "is-dirty", error: "has-error" });
    classNames += props.dir ? ` dir-${props.dir}` : "";

    return (
        <div className={`form-group text-input ${classNames}`}>
            <label htmlFor={props.name}>{props.label}</label>
            <input className="form-control" type={type} name={props.name} id={props.name} value={props.value || ""}
                onChange={onChange} disabled={props.readonly} placeholder={props.placeholder} />
            <p className="form-error">{props.error || ""}</p>
        </div>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (props.onChange && !props.readonly) {
            props.onChange(props.name, e.target.value);
        }
    }
}
