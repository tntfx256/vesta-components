import { ITheme } from "@vesta/theme";
import React, { ComponentType } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { IComponentProps, IWithTransition } from "../BaseComponent";

export interface IAction {
    [key: string]: any;
    title: string;
    icon?: string;
}

interface IActionsheetProps extends IComponentProps, IWithTransition {
    actions: IAction[];
    show: boolean;
    onClick?: (item: IAction) => void;
}

export const Actionsheet: ComponentType<IActionsheetProps> = (props: IActionsheetProps) => {

    const duration = (props.theme as ITheme).timing.Default;
    const { enter = duration, leave = duration } = props;
    const actionsList = renderActionsList();

    return (
        <ReactCSSTransitionGroup transitionName="actionsheet"
            transitionEnterTimeout={enter / 2} transitionLeaveTimeout={leave / 2}>
            {actionsList}
        </ReactCSSTransitionGroup>
    );

    function renderActionsList() {
        if (!props.show) { return null; }
        const items = props.actions.map((item, index) => (
            <div key={index} className="action-item" onClick={onClick(index)}>{item.title}</div>
        ));

        return (
            <div className="actionsheet-component">
                <div className="actionsheet-backdrop">&nbsp;</div>
                <div className="action-list">{items}</div>
            </div>
        );
    }

    function onClick(index: number) {
        return () => {
            if (props.onClick) {
                props.onClick(props.actions[index]);
            }
        };
    }
}
