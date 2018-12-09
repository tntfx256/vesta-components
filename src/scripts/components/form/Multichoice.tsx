import { Culture } from "@vesta/core";
import React, { ChangeEvent, PureComponent } from "react";
import { IBaseComponentProps } from "../../BaseComponent";
import { IFromControlProps } from "./FormWrapper";

interface IMultichoiceProps extends IBaseComponentProps, IFromControlProps {
    options: any[];
    showSelectAll?: boolean;
    titleKey?: string;
    value: any[];
    valueKey?: string;
}

export class Multichoice extends PureComponent<IMultichoiceProps, null> {
    public static defaultProps = { valueKey: "id", titleKey: "title" };
    private selectAllText: string;

    constructor(props: IMultichoiceProps) {
        super(props);
        const tr = Culture.getDictionary().translate;
        this.selectAllText = tr("select_all");
    }

    public render() {
        const { label, error } = this.props;
        const choices = this.renderCheckboxes();

        return (
            <div className={`form-group multichoice-input ${error ? "has-error" : ""}`}>
                <label>{label}</label>
                <p className="form-error">{error || ""}</p>
                <ul>{choices}</ul>
            </div>
        );
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value = [], valueKey, options } = this.props;
        let selectedValues = [...value];
        const checked = e.currentTarget.checked;
        const isSelectAll = e.currentTarget.hasAttribute("data-select-all");
        const index = +e.currentTarget.value;
        const thisItem = options[isSelectAll ? -1 : index];

        if (checked) {
            if (isSelectAll) {
                // select all checkbox is checked
                selectedValues = options.map((option) => option[valueKey as string]);
            } else {
                selectedValues.push(thisItem[valueKey as string]);
            }
        } else {
            // finding index of selected checkbox's value
            const selectedIndex = thisItem ? selectedValues.indexOf(thisItem[valueKey as string]) : -1;
            if (selectedIndex >= 0) {
                selectedValues.splice(selectedIndex, 1);
            } else {
                // select all unchecked
                selectedValues = [];
            }
        }

        this.props.onChange(name, selectedValues.length ? selectedValues : null);
    }

    private renderCheckboxes() {
        const { options, name, value, titleKey, valueKey, showSelectAll } = this.props;
        let isAllSelected = true;
        const choices = (options || []).map((o, i) => {
            const checked = !!(value && value.indexOf(o[valueKey as string]) >= 0);
            if (!checked) {
                isAllSelected = false;
            }
            return (
                <li key={i}>
                    <label>
                        <input name={name} type="checkbox" value={i} checked={checked}
                            onChange={this.onChange} /> {o[titleKey as string]}
                    </label>
                </li>);
        });
        // select all option
        if (showSelectAll && choices.length) {
            choices.splice(0, 0, (
                <li key={-1} className="select-all-choice">
                    <label>
                        <input name={name} type="checkbox" checked={isAllSelected} data-select-all={true}
                            onChange={this.onChange} /> {this.selectAllText}
                    </label>
                </li>
            ));
        }
        return choices;
    }
}
