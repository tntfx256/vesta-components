import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import withStyle from "react-jss";
import { IBaseComponentProps } from "../BaseComponent";
import { actionsheetStyle } from "./Actionsheet.style";

export interface IActionsheetItem {
    title: string;
    value?: number;
}

export interface IActionsheetProps extends IBaseComponentProps {
    actions: IActionsheetItem[];
    enterDuration?: number;
    leaveDuration?: number;
    show: boolean;
    onSelect: (item: IActionsheetItem) => void;
}

function Actionsheet(props: IActionsheetProps) {

    const { enterDuration = 100, leaveDuration = 100 } = props;
    const actionsList = renderActionsList();

    return (
        <ReactCSSTransitionGroup transitionName="actionsheet"
            transitionEnterTimeout={enterDuration / 2} transitionLeaveTimeout={leaveDuration / 2}>
            {actionsList}
        </ReactCSSTransitionGroup>
    );


    function renderActionsList() {
        if (!props.show) { return null; }
        const items = props.actions.map((item, index) => (
            <li onClick={onItemClick(item)} data-value={item.value} key={index}>{item.title}</li>
        ));

        return (
            <div className={props.classes}>
                <div className={props.classes.backdrop}>&nbsp;</div>
                <ul className={props.classes.list}>{items}</ul>
            </div>
        );
    }

    function onItemClick(item: IActionsheetItem) {
        return () => {
            props.onSelect(item);
        }
    }
}

export default withStyle(actionsheetStyle as any)(Actionsheet);
