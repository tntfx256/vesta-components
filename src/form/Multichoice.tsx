import React, { ChangeEvent, ComponentType } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";

interface IMultichoiceProps extends IComponentProps, IFromControlProps {
    options: any[];
    showSelectAll?: boolean;
    titleKey?: string;
    value?: Array<number | string>;
    valueKey?: string;
}

export const Multichoice: ComponentType<IMultichoiceProps> = ((props: IMultichoiceProps) => {

    // const tr = Culture.getDictionary().translate;
    // const selectAllText = tr("select_all");

    return (
        <div className={`form-group multichoice-input is-dirty ${props.error ? "has-error" : ""}`}>
            <label>{props.label}</label>
            <p className="form-error">{props.error || ""}</p>
            <ul>{renderCheckboxes()}</ul>
        </div>
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        let selectedValues = [...props.value || []];
        const checked = e.currentTarget.checked;
        const index = +e.currentTarget.value;
        const thisItem = props.options[index];

        if (checked) {
            selectedValues.push(thisItem[props.valueKey]);
            } else {
            const selectedIndex = thisItem ? selectedValues.indexOf(thisItem[props.valueKey]) : -1;
            if (selectedIndex >= 0) {
                selectedValues.splice(selectedIndex, 1);
            } else {
                selectedValues = [];
            }
        }

        if (props.onChange) {
            props.onChange(props.name, selectedValues.length ? selectedValues : null);
        }
    }

    function renderCheckboxes() {
        // let isAllSelected = true;
        return (props.options || []).map((o, i) => {
            const checked = !!(props.value && props.value.indexOf(o[props.valueKey]) >= 0);
            // if (!checked) {
            //     isAllSelected = false;
            // }
            return (
                <li key={i} className="check-item">
                    <label>
                        <input name={name} type="checkbox" value={i} checked={checked}
                            onChange={onChange} /> {o[props.titleKey]}
                    </label>
                </li>);
        });
        // select all option
        // if (props.showSelectAll && choices.length) {
        //     choices.splice(0, 0, (
        //         <li key={-1} className="select-all-choice check-item">
        //             <label>
        //                 <input name={name} type="checkbox" checked={isAllSelected} data-select-all={true}
        //                     onChange={onChange} /> {selectAllText}
        //             </label>
        //         </li>
        //     ));
        // }
        // return choices;
    }
});

Multichoice.defaultProps = { valueKey: "id", titleKey: "title" };
