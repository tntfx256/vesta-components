import React, { PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { Select } from "../form/Select";
import { Button } from "./Button";

export interface IPaginationProps extends IComponentProps {
    limit: number;
    page: number;
    total?: number;
    fetch: (page: number, recordsPerPage: number) => void;
}

interface IPaginationState {
}

export class Pagination extends PureComponent<IPaginationProps, IPaginationState> {

    constructor(props: IPaginationProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { limit, total = 0, page = 1 } = this.props;
        const totalPages = this.totalPages(total, limit);
        if (totalPages <= 1) { return null; }
        const pages: any[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push({ title: i, id: i });
        }

        return (
            <div className="pagination">
                <Button onClick={this.gotoPage(1)}
                    disabled={page === 1}>&lt;&lt;</Button>
                <Button onClick={this.gotoPage(page - 1)}
                    disabled={page === 1}>&lt;</Button>

                <Select name="page" value={page} onChange={this.onChange} options={pages} />

                <Button onClick={this.gotoPage(page + 1)}
                    disabled={page === totalPages}>&gt;</Button>
                <Button onClick={this.gotoPage(totalPages)}
                    disabled={page === totalPages}>&gt;&gt;</Button>
            </div>
        );
    }

    private onChange = (name: string, page: number) => {
        const totalPages = this.totalPages(this.props.total || 0, this.props.limit);
        if (page > totalPages) {
            page = totalPages;
        } else if (page < 1) {
            page = 1;
        }
        this.gotoPage(page)();
    }

    private gotoPage = (page: number) => () => {
        this.props.fetch(page, this.props.limit);
    }

    private totalPages(totalRecords: number, recordsPerPage: number) {
        return Math.ceil(totalRecords / recordsPerPage);
    }
}
