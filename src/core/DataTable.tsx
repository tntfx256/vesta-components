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
    onPagination?: (option: IQueryOption<T>) => void;
    onSelect?: (records: T[]) => void;
}

export const DataTable: ComponentType<IDataTableProps<any>> = (props: IDataTableProps<any>) => {

    const { total, page = 1, limit = 20 } = props.queryOption;
    const header = createHeader();
    const rows = createRows();
    const paginationComponent = props.pagination ? (
        <Pagination totalRecords={total} currentPage={page} fetch={onPaginationChange}
                recordsPerPage={limit} />) : null;
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
        const isAllselected = props.value.length === props.records.length;
        const selectAll = props.multi ? (
            <th key={0}><input type="checkbox" onChange={onSelectAllChange} checked={isAllselected} /></th>
        ) : null;
        const headerCells = props.columns.map((col, i) => {
            return <th key={i + 1}>{col.title || col.name}</th>;
        });
        return <tr>{selectAll}{headerCells}</tr>;
    }

    function createRows() {
        const { records, columns, multi, value: selection } = props;
        return records.map((r: any, i) => {
            const cells = columns.map((c, j) => (
                <td key={j + 1}>{c.render ? c.render(r) : r[c.name as string]}</td>
            ));
            const isSelected = indexOf(r) >= 0;
            if (multi) {
                cells.unshift(
                    <td key={0}>
                        <input type="checkbox" checked={isSelected} readOnly={true} />
                    </td>);
            }
            return <tr className={isSelected ? "selected" : ""} key={i + 1} onClick={onRowSelect(i)}>{cells}</tr>;
        });
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
    value: [],
};
