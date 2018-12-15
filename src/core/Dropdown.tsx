import React, { Component } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { KeyCode } from "../enum";

interface IDropdownProps extends IBaseComponentProps {
    className?: string;
    left?: number;
    onClose: () => void;
    top?: number;
}

interface IDropdownState {
}

export class Dropdown extends Component<IDropdownProps, IDropdownState> {

    constructor(props: IDropdownProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        document.addEventListener("click", this.onClickOutside, false);
        document.addEventListener("keyup", this.onKeyup, false);
    }

    public componentWillUnmount() {
        document.removeEventListener("click", this.onClickOutside);
        document.removeEventListener("keyup", this.onKeyup);
    }

    public render() {
        const { left, top, className = "" } = this.props;
        const style: any = {};
        if ("top" in this.props) {
            style.top = `${top}px`;
        }
        if ("left" in this.props) {
            style.left = `${left}px`;
        }

        return (
            <div className={`dropdown ${className}`} style={style}>
                {this.props.children}
            </div>
        );
    }

    private onClickOutside = (e: MouseEvent) => {
        this.props.onClose();
    }

    private onKeyup = (e: KeyboardEvent) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode == KeyCode.Escape) {
            this.props.onClose();
        }
    }
}
