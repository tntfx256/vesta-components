import React, { ChangeEvent, Component, KeyboardEvent } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";
import { KeyCode } from "../KeyCode";
import { extractClassNames } from "../util";

export interface IAutocompleteProps extends IComponentProps, IFromControlProps {
    multi?: boolean;
    titleKey?: string;
    valueKey?: string;
    onSearch: (term: string) => Promise<any[]>;
    render?: (r: any) => any;
}

interface IAutocompleteState {
    items: any[];
    menuIndex: number;
    showDropDown: boolean;
    showLoader: boolean;
    term: string;
}

export class Autocomplete extends Component<IAutocompleteProps, IAutocompleteState> {
    public static defaultProps = { valueKey: "id", titleKey: "title" };
    private hasStateChanged = false;
    private selectedItems: any[] = [];

    constructor(props: IAutocompleteProps) {
        super(props);
        this.state = { term: "", items: [], showDropDown: false, showLoader: false, menuIndex: -1 };
        this.extractInitialValues(props);
    }

    /**
     * when onChange is propagated to parent component, parent will only receive the id of selectedItem
     *  so based on react controlled-component concept, parent will again send that value as props
     *  we use hasBeenInitiated to check if it's the first time or not
     */
    public componentWillReceiveProps(nextProps: IAutocompleteProps) {
        if (this.hasStateChanged) { return; }
        this.extractInitialValues(nextProps);
    }

    public render() {
        const { name, label, error, value, titleKey, multi } = this.props;
        const { showLoader, term } = this.state;
        const list = this.renderList();
        const selectedItems = multi ? this.renderSelectedItems() : null;
        const inputValue = term || (!multi && value && value[titleKey as string]) || "";
        let classNames = extractClassNames(this.props, { value: "is-dirty", error: "has-error", multi: "is-multi" });
        classNames += showLoader ? "is-loading" : "";

        return (
            <div className={`form-group autocomplete-input ${classNames}`}>
                <label htmlFor={name}>{label}</label>
                <input className="form-control" onChange={this.onChange} onKeyDown={this.onKeyDown}
                    value={inputValue} name={name} autoComplete="off" />
                {list}
                {selectedItems}
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private extractInitialValues(props: IAutocompleteProps) {
        const { valueKey, value, multi } = props;
        const selectedItems = [];
        if (value && multi) {
            for (let i = 0, il = value.length; i < il; ++i) {
                if (value[i][valueKey as string]) {
                    selectedItems.push(value[i]);
                }
            }
            if (selectedItems.length) {
                this.selectedItems = value;
            }
        }
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        this.setState({ term });
        if (!term) {
            return this.setState({ showDropDown: false });
        }
        this.setState({ showLoader: true });
        this.props.onSearch(term)
            .then((items) => {
                this.setState({ showLoader: false, items, menuIndex: -1, showDropDown: true });
            })
            .catch(() => {
                this.setState({ showLoader: false });
            });
    }

    private onItemDelete = (index: number) => () => {
        if (index >= 0) {
            this.selectedItems.splice(index, 1);
        }
        this.forceUpdate();
    }

    private onItemSelect = (index: number) => () => {
        this.selectItemByIndex(index);
    }

    private onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        const { showDropDown, items } = this.state;
        const itemsCount = items.length;
        if (!itemsCount || !showDropDown) { return null; }
        const { menuIndex } = this.state;
        const keyCode = e.keyCode || e.charCode;
        let hasOperation = true;
        switch (keyCode) {
            case KeyCode.ArrowDown:
                this.setState({ menuIndex: (menuIndex + 1) % itemsCount });
                break;
            case KeyCode.ArrowUp:
                this.setState({ menuIndex: (menuIndex - 1 < 0 ? itemsCount - 1 : menuIndex - 1) });
                break;
            case KeyCode.Enter:
                if (menuIndex >= 0) {
                    this.selectItemByIndex(menuIndex);
                }
                break;
            case KeyCode.Escape:
                this.setState({ menuIndex: -1, showDropDown: false });
                break;
            default:
                hasOperation = false;
        }
        if (hasOperation) {
            e.preventDefault();
        }
    }

    private renderList() {
        const { titleKey } = this.props;
        const { items, menuIndex, showDropDown } = this.state;
        if (!items.length || !showDropDown) { return null; }
        const menuItems = (items || []).map((item, index) => {
            const className = index === menuIndex ? "has-hover" : "";
            return <a className={`list-item ${className}`} onClick={this.onItemSelect(index)}
                key={index}>{this.props.render ? this.props.render(item) : item[titleKey as string]}</a>;
        });
        return (
            <div className="list-wrapper form-control">
                {menuItems}
            </div>
        );
    }

    private renderSelectedItems() {
        const { multi, titleKey } = this.props;
        if (!multi) { return null; }
        if (!this.selectedItems.length) { return null; }
        const selectedItems = [];
        for (let i = 0, il = this.selectedItems.length; i < il; ++i) {
            selectedItems.push((
                <span key={i} onClick={this.onItemDelete(i)}>{this.selectedItems[i][titleKey as string]}</span>
            ));
        }
        return <div className="selected-items">{selectedItems}</div>;
    }

    private selectItemByIndex(index: number) {
        const { titleKey, valueKey, multi, onChange, name } = this.props;
        const { items } = this.state;
        const selectedItem = items[index];
        if (!selectedItem) { return; }
        const term = selectedItem[titleKey as string];
        const selectedValue = selectedItem[valueKey as string];
        if (multi) {
            let found = false;
            for (let i = 0, il = this.selectedItems.length; i < il; ++i) {
                if (this.selectedItems[i][valueKey as string] === selectedItem[valueKey as string]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.selectedItems.push(selectedItem);
            }
        }
        this.hasStateChanged = true;
        if (onChange) {
            onChange(name, multi ? this.selectedItems.map((item) => item[valueKey as string]) : selectedValue);
        }
        this.setState({ term: multi ? "" : term, menuIndex: -1, showDropDown: false });
    }
}
