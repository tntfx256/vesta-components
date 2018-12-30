import React, { ChangeEvent, PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { extractClassNames } from "../util";

interface ISelectProps extends IComponentProps, IFromControlProps {
    options: any[];
    titleKey?: string;
    valueKey?: string;
}

interface IEmptyState { }

export class Select extends PureComponent<ISelectProps, IEmptyState> {
    public static defaultProps = { valueKey: "id", titleKey: "title" };

    public render() {
        const { label, name, options, error, titleKey, readonly, valueKey } = this.props;
        // finding index of selected value
        const selectedIndex = this.getSelectedIndex();
        const nullValue = { [titleKey as string]: "", [valueKey as string]: -1 };
        const optionsList = [nullValue, ...options].map((o, i) => (
            <option key={i} value={i}>{o[titleKey as string]}</option>
        ));
        const classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error" });

        return (
            <div className={`form-group select-input ${classNames}`}>
                <label htmlFor={name}>{label}</label>
                <select className="form-control" name={name} id={name} value={selectedIndex}
                    onChange={this.onChange} disabled={readonly}>
                    {optionsList}
                </select>
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private getSelectedIndex() {
        const { value, options, valueKey } = this.props;
        // value might be a number or an object
        const realValue = value && value[valueKey as string] || value;
        // finding index of selected value
        for (let i = options.length; i--;) {
            if (realValue == options[i][valueKey as string]) {
                return i;
            }
        }
        // in case no value is passed through props
        return undefined;
    }

    private onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, onChange, options, valueKey, readonly } = this.props;
        const index = e.target.value;
        const item = options[+index];
        if (onChange && !readonly) {
            onChange(name, item ? item[valueKey as string] : null);
        }
    }
}
