import { Culture } from "@vesta/culture";
import React, { ChangeEvent, Component, createRef, RefObject } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { Dialog } from "../core/Dialog";
import { FileManager, IFileOperation } from "../core/FileManager";
import { IFromControlProps } from "../core/FormWrapper";
import { Icon } from "../core/Icon";

interface IToolbarAction {
    command: string;
    icon: string;
}

interface IWysiwygProps extends IBaseComponentProps, IFromControlProps, IFileOperation {
    value?: string;
}

interface IWysiwygState {
    showFileManager?: boolean;
}

export class Wysiwyg extends Component<IWysiwygProps, IWysiwygState> {
    private content = "";
    private toolbarActions: IToolbarAction[] = [];
    private tr = Culture.getDictionary().translate;
    private editor: RefObject<HTMLDivElement> = createRef();

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
        if (onChange) {
            onChange(name, value);
        }
    }

    private onFileSelect = (file: string) => {
        // const url = getFileUrl(file);
        (this.editor.current as HTMLElement).focus();
        setTimeout(() => document.execCommand("insertImage", false, file), 50);
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
        const { onDelete, onChangeDirectory, onError, onNewFile, onNewFolder, onRename } = this.props;
        const { showFileManager } = this.state;
        if (!showFileManager) { return <Dialog show={false} />; }
        return (
            <Dialog show={true} title={this.tr("filemanager")} className="file-manager-dialog"
                onClose={this.hideFileManager}>
                <FileManager onFileSelect={this.onFileSelect} onDelete={onDelete} onChangeDirectory={onChangeDirectory}
                    onError={onError} onNewFile={onNewFile} onNewFolder={onNewFolder} onRename={onRename} />
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
