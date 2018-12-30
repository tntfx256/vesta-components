import { IRequest } from "@vesta/core";
import React, { Component } from "react";
import { IComponentProps } from "../BaseComponent";
import { Pagination } from "./Pagination";

export interface IColumn<T> {
    name?: string;
    render?: (record: T) => any;
    title?: string;
}

export interface IDataTableQueryOption<T> extends IRequest<T> {
    total?: number;
}

interface IDataTableProps<T> extends IComponentProps {
    columns: Array<IColumn<T>>;
    pagination?: boolean;
    queryOption: IDataTableQueryOption<T>;
    records: T[];
    selectable?: boolean;
    showIndex?: boolean;
    onChange?: (option: IDataTableQueryOption<T>) => void;
}

interface IDataTableState {
}

export class DataTable<T> extends Component<IDataTableProps<T>, IDataTableState> {

    constructor(props: IDataTableProps<T>) {
        super(props);
        this.state = { records: [] };
    }

    public render() {
        const { queryOption: { total, page = 1, limit = 20 }, pagination } = this.props;
        const header = this.createHeader();
        const rows = this.createRows();
        const paginationComponent = pagination ? (
            <Pagination totalRecords={total} currentPage={page} fetch={this.onPaginationChange}
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
    }

    private createHeader() {
        const headerCells = this.props.columns.map((col, i) => {
            return <th key={i + 1}>{col.title || col.name}</th>;
        });
        return <tr>{headerCells}</tr>;
    }

    private createRows() {
        const { records, columns } = this.props;
        return records.map((r: any, i) => {
            const cells = columns.map((c, j) => (
                <td key={j + 1}>{c.render ? c.render(r) : r[c.name as string]}</td>
            ));
            return <tr key={i + 1}>{cells}</tr>;
        });
    }

    private onPaginationChange = (page: number, limit: number) => {
        if (this.props.onChange) {
            this.props.onChange({ ...this.props.queryOption, page, limit });
        }
    }
}
