import { Culture } from '@vesta/core';
import React, { Component, createRef, RefObject, ChangeEvent } from "react";
import { IBaseComponentProps } from "../../BaseComponent";
import { Dialog } from "../Dialog";
import { FileManager } from "../FileManager";
import { Icon } from "../Icon";
import { IFromControlProps } from "./FormWrapper";

interface IToolbarAction {
    command: string;
    icon: string;
}

export interface IWysiwygProps extends IBaseComponentProps, IFromControlProps {
    value?: string;
}

export interface IWysiwygState {
    showFileManager?: boolean;
}

export class Wysiwyg extends Component<IWysiwygProps, IWysiwygState> {
    private content = "";
    private editor: RefObject<HTMLDivElement> = createRef();
    private toolbarActions: IToolbarAction[] = [];
    private tr = Culture.getDictionary().translate;

    constructor(props: IWysiwygProps) {
        super(props);
        this.state = {};
        this.content = props.value as string;
        this.toolbarActions = [
            { command: "undo", icon: "undo" },
            { command: "redo", icon: "redo" },
            { command: "bold", icon: "format_bold" },
            { command: "justifyFull", icon: "format_align_justify" },
            { command: "justifyRight", icon: "format_align_right" },
            { command: "justifyCenter", icon: "format_align_center" },
            { command: "justifyLeft", icon: "format_align_left" },
            { command: "image", icon: "image" },
        ];
    }

    public componentWillReceiveProps(nextProps: IWysiwygProps) {
        if (nextProps.value !== this.content) {
            this.content = nextProps.value as string;
            this.forceUpdate();
        }
    }

    public render() {
        const { label, error } = this.props;
        const toolbar = this.renderToolbar();
        const fileManager = this.renderFileManager();

        return (
            <div className={`wysiwyg ${error ? "has-error" : ""}`}>
                {label ? <label className="title">{label}</label> : null}
                {toolbar}
                <div className="editor" contentEditable={true} ref={this.editor} onBlur={this.onChange}
                    dangerouslySetInnerHTML={{ __html: this.content }} />
                {fileManager}
                <p className="form-error">{error || ""}</p>
            </div>
        );
    }

    private hideFileManager = () => {
        this.setState({ showFileManager: false });
    }

    private onChange = (e: ChangeEvent<HTMLDivElement>) => {
        const { name, onChange } = this.props;
        const value = e.currentTarget.innerHTML;
        this.content = value;
        onChange && onChange(name, value);
    }

    private onFileSelect = (file: string) => {
        // const url = getFileUrl(file);
        this.editor.current.focus();
        setTimeout(() => document.execCommand("insertImage", false, file), 50);
        this.setState({ showFileManager: false });
    }

    private onToolbarAction = (e) => {
        const command = e.currentTarget.getAttribute("data-command");
        switch (command) {
            case "image":
                this.setState({ showFileManager: true });
                break;
            default:
                document.execCommand(command, false, null);
        }
    }

    private renderFileManager() {
        const { showFileManager } = this.state;
        if (!showFileManager) { return <Dialog show={false} />; }
        return (
            <Dialog show={true} title={this.tr("filemanager")} className="file-manager-dialog"
                onClose={this.hideFileManager}>
                <FileManager onFileSelect={this.onFileSelect} />
            </Dialog>
        );
    }

    private renderToolbar() {
        const actions = this.toolbarActions.map(({ command, icon }, i) => (
            <a key={i} className="btn" data-command={command} onClick={this.onToolbarAction}><Icon name={icon} /></a>
        ));
        return <div className="toolbar">{actions}</div>;
    }
}
