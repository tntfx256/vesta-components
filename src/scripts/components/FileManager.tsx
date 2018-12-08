import { Culture } from "@vesta/core";
import React, { ChangeEvent, Component, KeyboardEvent } from "react";
import { IBaseComponentProps } from "../BaseComponent";
import { IFile } from "../FileSystem";
import { Icon } from "./Icon";

export enum KeyCode { Enter = 13 }

export type IFileSelectCallback = (path: string) => void;

export interface IFileManagerProps extends IBaseComponentProps {
    onFileSelect: IFileSelectCallback;
    onChangeDirectory: (path: string) => Promise<IFile[]>;
    onDelete: (file: IFile) => Promise<string>;
    onNewFolder: (file: IFile) => Promise<string>;
    onRename: (file: IFile, newName: string) => Promise<string>;
    onUpload: (file: File, path: string) => Promise<string>;
}

export interface IFileManagerState {
    path: string;
    list: IFile[];
    newFolderInProgress?: boolean;
    renameIndex?: number;
    fileName: string;
}

export class FileManager extends Component<IFileManagerProps, IFileManagerState> {
    private tr = Culture.getDictionary().translate;
    private baseDirectory = "file-manager";

    constructor(props: IFileManagerProps) {
        super(props);
        this.state = { path: "/", list: [], fileName: "", renameIndex: -1 };
    }

    public componentDidMount() {
        this.changeDirectory(this.state.path);
    }

    public render() {
        const { path } = this.state;
        const filesList = this.renderFilesList();

        return (
            <div className="file-manager">
                <div className="dir-path">
                    <p>{path}</p>
                    <span className="file-ops">
                        <Icon name="create_new_folder" onClick={this.onCreateNewFolder} />
                        <Icon name="cloud_upload" />
                        <input type="file" onChange={this.onFileSelectedForUpload} />
                    </span>
                </div>
                <div className="files-list">
                    <table>
                        <thead>
                            <tr>
                                <th>{this.tr("fld_name")}</th>
                                <th>{this.tr("operations")}</th>
                            </tr>
                        </thead>
                        {filesList}
                    </table>
                </div>

            </div>
        );
    }

    private sortFiles(list: IFile[]): IFile[] {
        const directories: IFile[] = [];
        const files = [];
        for (let i = 0, il = list.length; i < il; ++i) {
            if (list[i].isDirectory) {
                directories.push(list[i]);
            } else {
                files.push(list[i]);
            }
        }
        directories.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 0 : 1);
        files.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 0 : 1);
        return directories.concat(files);
    }

    private onSelect = (index: number) => () => {
        const { list, path } = this.state;
        // check if we should change path to parent directory
        if (index == -1) {
            return this.changeDirectory(path.substring(0, path.lastIndexOf("/")));
        }
        const file = list[index];
        if (file.isDirectory) {
            return this.changeDirectory(`${file.path}/${file.name}`);
        }
        this.props.onFileSelect(`${this.baseDirectory}/${file.path}/${file.name}`);
    }

    private onDelete = (index: number) => () => {
        const { onDelete } = this.props;
        const { list } = this.state;
        // const index = e.currentTarget.parentElement.parentElement.getAttribute("data-index");
        const file = list[index];
        onDelete(file).then(() => this.changeDirectory(file.path as string));
    }

    private onRename = (index: number) => () => {
        const { list } = this.state;
        const file = list[index];
        this.setState({ renameIndex: index, newFolderInProgress: false, fileName: file.name as string });
    }

    private onCreateNewFolder = () => {
        this.setState({ newFolderInProgress: true, fileName: "New Folder", renameIndex: -1 });
    }

    private onRenameCancel = () => {
        this.setState({ newFolderInProgress: false, renameIndex: -1 });
    }

    private onInputNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ fileName: value });
    }

    private onNewFolderNameSave = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode != KeyCode.Enter) { return; }
        e.preventDefault();
        const { onNewFolder } = this.props;
        const { path, fileName } = this.state;
        const file: IFile = { path, name: fileName, isDirectory: true };
        onNewFolder(file)
            .then(() => {
                this.setState({ newFolderInProgress: false }, () => this.changeDirectory(`${path}/${fileName}`));
            });
    }

    private onRenameSave = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode != KeyCode.Enter) { return; }
        const { onRename } = this.props;
        const { path, fileName, list, renameIndex } = this.state;
        e.preventDefault();
        e.stopPropagation();
        const file = list[renameIndex as number];
        onRename(file, fileName)
            .then(() => {
                this.setState({ renameIndex: -1 }, () => this.changeDirectory(path));
            });
    }

    private onFileSelectedForUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { onUpload } = this.props;
        const { path } = this.state;
        const file: File = (e.target.files as FileList)[0];
        onUpload(file, path).then(() => this.changeDirectory(path));
    }

    private changeDirectory(directory: string) {
        const { onChangeDirectory } = this.props;
        onChangeDirectory(directory)
            .then((files) => {
                this.setState({ list: this.sortFiles(files), path: directory || "/" });
            });
    }

    private renderFilesList() {
        const { list, path, newFolderInProgress, fileName, renameIndex } = this.state;
        // go to parent directory
        const upDirectory = path && path != "/" ? (
            <tr key={-1}>
                <td onClick={this.onSelect(-1)}>
                    <Icon name="arrow_upward" /> <label>..</label>
                </td>
                <td />
            </tr>
        ) : null;
        // on create new folder
        const newFolder = newFolderInProgress ? (
            <tr key={-2}>
                <td>
                    <Icon name="folder" />
                    <label>
                        <input className="form-control" type="text" value={fileName}
                            onChange={this.onInputNameChange} onKeyDown={this.onNewFolderNameSave} /></label>
                </td>
                <td>
                    <Icon name="clear" onClick={this.onRenameCancel} />
                </td>
            </tr>
        ) : null;
        // render files list in current directory
        const filesList = list.map((file, index) => {
            const isDirectory = file.children || file.isDirectory;
            const isRename = renameIndex == index;
            const fileNameCmp = isRename ? (
                <input className="form-control" type="text" value={fileName} onChange={this.onInputNameChange}
                    onKeyDown={this.onRenameSave} />) : file.name;
            return (
                <tr key={index}>
                    <td onClick={isRename ? this.nop : this.onSelect(index)}>
                        <Icon name={isDirectory ? "folder" : "image"} />
                        <label>{fileNameCmp}</label>
                    </td>
                    <td>
                        {isRename ? this.nop : <Icon name="edit" onClick={this.onRename(index)} />}
                        <Icon name="clear" onClick={isRename ? this.onRenameCancel : this.onDelete(index)} />
                    </td>
                </tr>
            );
        });

        return (
            <tbody>
                {upDirectory}
                {newFolder}
                {filesList}
            </tbody>
        );
    }

    private nop() { }
}
