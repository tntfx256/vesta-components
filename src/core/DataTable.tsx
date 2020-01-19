import { IRequest } from "@vesta/core";
import React, { ChangeEvent, ComponentType, MouseEvent } from "react";
import { IComponentProps } from "../BaseComponent";
import { Pagination } from "./Pagination";

export interface IColumn<T> {
    name?: string;
    render?: (record: T) => any;
    title?: string;
}

export interface IQueryOption<T> extends IRequest<T> {
    total?: number;
}

export interface IDataTableProps<T> extends IComponentProps {
    columns: Array<IColumn<T>>;
    key?: string;
    pagination?: boolean;
    queryOption: IQueryOption<T>;
    records: T[];
    multi?: boolean;
    value?: T[];
    showIndex?: boolean;
    inverseSelection?: boolean;
    onPagination?: (option: IQueryOption<T>) => void;
    onSelect?: (records: T[]) => void;
    firstCustomRows?: (columns?: any[], records?: T[]) => JSX.Element[];
    lastCustomRows?: (columns?: any[], records?: T[]) => JSX.Element[];
}

export const DataTable: ComponentType<IDataTableProps<any>> = (props: IDataTableProps<any>) => {

    const { total, page = 1, limit = 20 } = props.queryOption;
    const header = createHeader();
    const rows = createRows();
    const paginationComponent = props.pagination ? (
        <Pagination total={total} page={page} fetch={onPaginationChange}
            limit={limit} />) : null;
        return (
            <div>
                <div className="data-table">
                    <table>
                        <thead>{header}</thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
                {paginationComponent}
            </div>
        );

    function createHeader() {
        const { value, records = [], showIndex } = props;
        const isAllselected = value && value.length === records.length;
        const selectAll = props.multi ? (
            <th key={0}><input
                type="checkbox"
                onChange={onSelectAllChange}
                checked={props.inverseSelection ? !isAllselected : isAllselected}
            /></th>
        ) : null;
        const index = showIndex ? <th key={1}>#</th> : null;
        const headerCells = props.columns.map((col, i) => {
            return <th key={showIndex ? i + 2 : i + 1}>{col.title || col.name}</th>;
        });
        return <tr>{selectAll}{index}{headerCells}</tr>;
    }

    function createRows() {
        const { records = [], columns, multi, value: selection, showIndex } = props;
        let counter = ((page - 1) * limit) + 1;

        const dataRows = records.map((r: any, i) => {
            const cells = columns.map((c, j) => (
                <td key={showIndex ? j + 2 : j + 1}>{c.render ? c.render(r) : r[c.name as string]}</td>
            ));
            const isSelected = indexOf(r) >= 0;
            if (showIndex) {
                cells.unshift(
                    <td key={1}>
                        {counter++}
                    </td>);
            }
            if (multi) {
                cells.unshift(
                    <td key={0}>
                        <input
                            type="checkbox"
                            onClick={onRowSelect(i)}
                            checked={props.inverseSelection ? !isSelected : isSelected}
                            readOnly={true} />
                    </td>);
            }
            return <tr className={isSelected ? "selected" : ""} key={i + 1}>{cells}</tr>;
        });

        return [
            ...(props.firstCustomRows ? props.firstCustomRows(columns, props.records) : []),
            ...dataRows,
            ...(props.lastCustomRows ? props.lastCustomRows(columns, props.records) : []),
        ];
    }

    function onPaginationChange(page: number, limit: number) {
        if (props.onPagination) {
            props.onPagination({ ...props.queryOption, page, limit });
        }
    }

    function onSelectAllChange(e: ChangeEvent<HTMLInputElement>) {
        const isAllselected = props.value.length === props.records.length;
        if (isAllselected) {
            return props.onSelect([]);
        } else {
            return props.onSelect([].concat(props.records));
        }
    }

    function onRowSelect(rowIndex: number) {
        if (!props.multi && !props.onSelect) { return null; }
        return (e: MouseEvent<HTMLElement>) => {
            const selected = props.records[rowIndex];
            const index = indexOf(selected);
            if (index >= 0) {
                const newList = [].concat(props.value);
                newList.splice(index, 1);
                props.onSelect(newList);
            } else {
                props.onSelect(props.value.concat([selected]));
            }
        };
    }

    function indexOf(record: any): number {
        const value = record[props.key];
        for (let i = 0, il = props.value.length; i < il; ++i) {
            if (props.value[i][props.key] === value) {
                return i;
            }
        }
        return -1;
    }
};

DataTable.defaultProps = {
    key: "id",
    showIndex: false,
    value: [],
};
