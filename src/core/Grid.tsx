import React, { ComponentType, createRef, RefObject, useEffect } from "react";
import { withTheme } from "react-jss";
import { IBaseComponentProps } from "../BaseComponent";

interface IGridProps extends IBaseComponentProps {
    direction?: "row" | "column";
    wrap?: "nowrap" | "wrap";
    // direction wise
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    // cross direction wise
    alignItem?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    alignContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
    flex?: number;
}

export const Grid: ComponentType<IGridProps> = withTheme((props: IGridProps) => {

    const grid: RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        if (props.flex) {
            grid.current.style.flex = props.flex.toString();
        }
    });

    // generating class name
    const classNames = [];
    if (props.direction) {
        classNames.push(props.direction);
    }
    if (props.wrap) {
        classNames.push(props.wrap);
    }
    if (props.justify) {
        classNames.push(props.justify);
    }
    if (props.alignItem) {
        classNames.push(props.alignItem);
    }
    if (props.direction) {
        classNames.push(props.alignContent);
    }

    return (
        <div ref={grid} className={`grid ${classNames.join(" ")}`}>{props.children}</div>
    );
});
