import React, { PureComponent } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IBaseComponentProps } from "../BaseComponent";

export interface IActionsheetItem {
    title: string;
    value?: string;
    onClick: () => void;
}

interface IActionsheetProps extends IBaseComponentProps {
    actions: IActionsheetItem[];
    enterDuration?: number;
    leaveDuration?: number;
    show: boolean;
}

export class Actionsheet extends PureComponent<IActionsheetProps, null> {

    constructor(props: IActionsheetProps) {
        super(props);
    }

    public render() {
        const { enterDuration = 100, leaveDuration = 100 } = this.props;
        const actionsList = this.renderActionsList();

        return (
            <ReactCSSTransitionGroup transitionName="actionsheet"
                transitionEnterTimeout={enterDuration / 2} transitionLeaveTimeout={leaveDuration / 2}>
                {actionsList}
            </ReactCSSTransitionGroup>
        );
    }

    private renderActionsList() {
        if (!this.props.show) { return null; }
        const items = this.props.actions.map((item, index) => (
            <li onClick={item.onClick} data-value={item.value} key={index}>{item.title}</li>
        ));

        return (
            <div className="actionsheet-component">
                <div className="actionsheet-backdrop">&nbsp;</div>
                <ul className="action-list">{items}</ul>
            </div>
        );
    }
}
