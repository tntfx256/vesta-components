import React, { ComponentType, createRef, RefObject, useEffect } from "react";
import { IComponentProps } from "../BaseComponent";

export interface IGridProps extends IComponentProps {
    direction?: "row" | "column";
    wrap?: "nowrap" | "wrap";
    // direction wise
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    // cross direction wise
    alignItem?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    align?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
    flex?: number;
}

export const Grid: ComponentType<IGridProps> = (props: IGridProps) => {

    const grid: RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        if (props.flex) {
            (grid.current as HTMLDivElement).style.flex = props.flex.toString();
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
        classNames.push(`justify-${props.justify}`);
    }
    if (props.alignItem) {
        classNames.push(`align-item-${props.alignItem}`);
    }
    if (props.align) {
        classNames.push(`align-${props.align}`);
    }
    if (props.direction) {
        classNames.push(props.direction);
    }

    return (
        <div ref={grid} className={`grid ${classNames.join(" ")}`}>{props.children}</div>
    );
}
