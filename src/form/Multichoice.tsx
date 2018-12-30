import { Culture } from "@vesta/culture";
import React, { ChangeEvent, ComponentType } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";

interface IMultichoiceProps extends IComponentProps, IFromControlProps {
    options: any[];
    showSelectAll?: boolean;
    titleKey?: string;
    value?: any[];
    valueKey?: string;
}

export const Multichoice: ComponentType<IMultichoiceProps> = ((props: IMultichoiceProps) => {

    const tr = Culture.getDictionary().translate;
    const selectAllText = tr("select_all");

    return (
        <div className={`form-group multichoice-input ${props.error ? "has-error" : ""}`}>
            <label>{props.label}</label>
            <p className="form-error">{props.error || ""}</p>
            <ul>{renderCheckboxes()}</ul>
        </div>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value, valueKey, options } = props;
        let selectedValues = [...value || []];
        const checked = e.currentTarget.checked;
        const isSelectAll = e.currentTarget.hasAttribute("data-select-all");
        const index = +e.currentTarget.value;
        const thisItem = isSelectAll ? null : options[index];

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

        if (props.onChange) {
            props.onChange(props.name, selectedValues.length ? selectedValues : null);
        }
    }

    function renderCheckboxes() {
        const { options, name, value, titleKey, valueKey, showSelectAll } = props;
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
                            onChange={onChange} /> {o[titleKey as string]}
                    </label>
                </li>);
        });
        // select all option
        if (showSelectAll && choices.length) {
            choices.splice(0, 0, (
                <li key={-1} className="select-all-choice">
                    <label>
                        <input name={name} type="checkbox" checked={isAllSelected} data-select-all={true}
                            onChange={onChange} /> {selectAllText}
                    </label>
                </li>
            ));
        }
        return choices;
    }
});

Multichoice.defaultProps = { valueKey: "id", titleKey: "title" };
