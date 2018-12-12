import React, { Component, createRef, RefObject } from "react";
import { IBaseComponentProps } from "../../BaseComponent";
import { IFile } from "../../FileSystem";
import { Dialog } from "../Dialog";
import { FileManager } from "../FileManager";
import { Icon } from "../Icon";
import { IFromControlProps } from "./FormWrapper";

interface IToolbarAction {
    command: string;
    icon: string;
}

export interface IWysiwygProps extends IBaseComponentProps, IFromControlProps {
    value: string;
    getFileUrl: (fileName: string) => string;
    // file manager props
    onChangeDirectory: (path: string) => Promise<IFile[]>;
    onDelete: (file: IFile) => Promise<string>;
    onNewFolder: (file: IFile) => Promise<string>;
    onRename: (file: IFile, newName: string) => Promise<string>;
    onUpload: (file: File, path: string) => Promise<string>;
}

export interface IWysiwygState {
    showFileManager?: boolean;
}

export class Wysiwyg extends Component<IWysiwygProps, IWysiwygState> {
    private content = "";
    private editor: RefObject<HTMLDivElement> = createRef();
    private toolbarActions: IToolbarAction[] = [];

    constructor(props: IWysiwygProps) {
        super(props);
        this.state = {};
        this.content = props.value;
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
            this.content = nextProps.value;
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

    private onChange = () => {
        const { name, onChange } = this.props;
        const value = (this.editor.current as HTMLDivElement).innerHTML;
        this.content = value;
        onChange(name, value);
    }

    private onFileSelect = (file: string) => {
        const url = this.props.getFileUrl(file);
        (this.editor.current as HTMLDivElement).focus();
        setTimeout(() => document.execCommand("insertImage", false, url), 50);
        this.setState({ showFileManager: false });
    }

    private onToolbarAction = (command: string) => () => {
        switch (command) {
            case "image":
                this.setState({ showFileManager: true });
                break;
            default:
                document.execCommand(command, false);
        }
    }

    private renderFileManager() {
        const { onChangeDirectory, onDelete, onNewFolder, onRename, onUpload } = this.props;
        const { showFileManager } = this.state;
        if (!showFileManager) { return <Dialog show={false} />; }
        return (
            <Dialog show={true} className="file-manager-dialog"
                onClose={this.hideFileManager}>
                <FileManager onFileSelect={this.onFileSelect} onChangeDirectory={onChangeDirectory}
                    onDelete={onDelete} onNewFolder={onNewFolder} onRename={onRename} onUpload={onUpload} />
            </Dialog>
        );
    }

    private renderToolbar() {
        const actions = this.toolbarActions.map(({ command, icon }, i) => (
            <a key={i} className="btn" onClick={this.onToolbarAction(command)}><Icon name={icon} /></a>
        ));
        return <div className="toolbar">{actions}</div>;
    }
}
