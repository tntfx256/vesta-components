import React, { ChangeEvent, FormEvent, PureComponent } from "react";
import { IBaseComponentProps } from "../BaseComponent";

export interface IPaginationProps extends IBaseComponentProps {
    recordsPerPage: number;
    currentPage: number;
    totalRecords?: number;
    onChange: (page: number, recordsPerPage: number) => void;
}

export interface IPaginationState {
    page: number;
}

export default class Pagination extends PureComponent<IPaginationProps, IPaginationState> {

    constructor(props: IPaginationProps) {
        super(props);
        this.state = { page: 1 };
    }

    public render() {
        const { recordsPerPage, totalRecords = 0, currentPage = 1 } = this.props;
        let key = 1;
        const totalPages = this.totalPages(totalRecords, recordsPerPage);
        if (totalPages <= 1) { return null; }

        return (
            <div className="pagination btn-group">
                <button className="btn" onClick={this.gotoPage(1)} key={key++}
                    disabled={currentPage == 1}>&lt;&lt;</button>
                <button className="btn" onClick={this.gotoPage(currentPage - 1)} key={key++}
                    disabled={currentPage == 1}>&lt;</button>
                <form onSubmit={this.onSubmit}>
                    <input className="btn" type="number" value={this.state.page} key={key++} onChange={this.onChange} />
                </form>
                <button className="btn" onClick={this.gotoPage(currentPage + 1)} key={key++}
                    disabled={currentPage == totalPages}>&gt;</button>
                <button className="btn" onClick={this.gotoPage(totalPages)} key={key}
                    disabled={currentPage == totalPages}>&gt;&gt;</button>
            </div>
        );
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let page = +e.target.value;
        const totalPages = this.totalPages(this.props.totalRecords || 0, this.props.recordsPerPage);

        if (page > totalPages) {
            page = totalPages;
        } else if (page < 1) {
            page = 1;
        }

        if (!isNaN(page)) {
            this.setState({ page });
        }
    }

    private gotoPage = (page: number) => () => {
        this.setState({ page }, () => {
            this.props.onChange(page, this.props.recordsPerPage);
        });

    }

    private onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onChange(this.state.page, this.props.recordsPerPage);
    }

    private totalPages(totalRecords: number, recordsPerPage: number) {
        return Math.ceil(totalRecords / recordsPerPage);
    }
}
