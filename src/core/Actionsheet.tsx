import { ITheme } from "@vesta/theme";
import React, { ComponentType } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { withTheme } from "theming";
import { IBaseComponentProps, IWithTransition } from "../BaseComponent";

export interface IActionsheetItem {
    onClick: () => void;
    title: string;
    value?: string;
}

interface IActionsheetProps extends IBaseComponentProps, IWithTransition {
    actions: IActionsheetItem[];
    show: boolean;
}

export const Actionsheet: ComponentType<IActionsheetProps> = withTheme((props: IActionsheetProps) => {

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
            <li onClick={item.onClick} data-value={item.value} key={index}>{item.title}</li>
        ));

        return (
            <div className="actionsheet-component">
                <div className="actionsheet-backdrop">&nbsp;</div>
                <ul className="action-list">{items}</ul>
            </div>
        );
    }
});
