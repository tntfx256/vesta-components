import React, { MouseEvent, PureComponent } from "react";
import { Link } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Icon } from "./Icon";
import { MessageBox, MessageBoxBtn, MessageBoxBtnGroup } from "./MessageBox";

export interface IDataTableOperationsProps extends IBaseComponentProps {
    hasEditAccess?: boolean;
    hasDeleteAccess?: boolean;
    path: string;
    id: number;
    onDelete: (id: number) => void;
    deleteTitle: string;
    deleteMessage: string;
}

export interface IDataTableOperationsState {
    showConfirmBox: boolean;
}

export class DataTableOperations extends PureComponent<IDataTableOperationsProps, IDataTableOperationsState> {

    constructor(props: IDataTableOperationsProps) {
        super(props);
        this.state = { showConfirmBox: false };
    }

    public render() {
        const { path, hasDeleteAccess, hasEditAccess, id } = this.props;
        const { showConfirmBox } = this.state;
        const editLink = hasEditAccess ?
            <Link to={`/${path}/edit/${id}`} className="edit-btn"><Icon name="mode_edit" /></Link> : null;
        const delLink = hasDeleteAccess ?
            <span className="del-btn" onClick={this.onDelete}><Icon name="delete" /></span> : null;

        return (
            <span className="data-table-operations dt-operation-cell">
                <Link to={`/${path}/detail/${id}`}><Icon name="search" /></Link>
                {editLink}
                {delLink}
                <MessageBox show={showConfirmBox} btnGroup={MessageBoxBtnGroup.YesNo} onAction={this.onAction}
                    title={this.props.deleteTitle}>
                    <p>{this.props.deleteMessage}</p>
                </MessageBox>
            </span>
        );
    }

    private onDelete = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        this.setState({ showConfirmBox: true });
    }

    private onAction = (btn: MessageBoxBtn) => {
        this.setState({ showConfirmBox: false });
        if (btn == MessageBoxBtn.Yes) {
            this.props.onDelete(this.props.id);
        }
    }
}
