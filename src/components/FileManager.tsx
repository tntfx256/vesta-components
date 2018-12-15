import React, { Component } from "react";
import { IBaseComponentProps } from "./BaseComponent";
import { tr } from "./Config";
import { KeyCode } from "./enum";
import { IFile } from "./FileSystem";
import { Icon } from "./Icon";

export interface IFileManagerProps extends IBaseComponentProps {
    onFileSelect: (path: string) => void;
    onNewFolder: (folder: IFile) => Promise<boolean>;
    onDelete: (file: IFile) => Promise<boolean>;
    onNewFile: (file: IFile) => Promise<boolean>;
    onRename: (file: IFile, newName: string) => Promise<boolean>;
    onChangeDirectory: (path: string) => Promise<IFile[]>;
    onError: (error: Error) => void;
}

export interface IFileManagerState {
    path: string;
    list: IFile[];
    newFolderInProgress?: boolean;
    renameIndex?: number;
    fileName: string;
}

export class FileManager extends Component<IFileManagerProps, IFileManagerState> {
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
                                <th>{tr("fld_name")}</th>
                                <th>{tr("operations")}</th>
                            </tr>
                        </thead>
                        {filesList}
                    </table>
                </div>

            </div>
        );
    }

    private sortFiles(list: IFile[]): IFile[] {
        const directories = [];
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

    private onSelect = (e) => {
        const { list, path } = this.state;
        const index = e.currentTarget.parentElement.getAttribute("data-index");
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

    private onDelete = (e) => {
        const { list } = this.state;
        const index = e.currentTarget.parentElement.parentElement.getAttribute("data-index");
        const file = list[index];
        this.props.onDelete(file)
            .then(() => this.changeDirectory(file.path))
            .catch(this.props.onError);
    }

    private onRename = (e) => {
        const { list } = this.state;
        const index = e.currentTarget.parentElement.parentElement.getAttribute("data-index");
        const file = list[index];
        this.setState({ renameIndex: index, newFolderInProgress: false, fileName: file.name });
    }

    private onCreateNewFolder = () => {
        this.setState({ newFolderInProgress: true, fileName: "New Folder", renameIndex: -1 });
    }

    private onRenameCancel = () => {
        this.setState({ newFolderInProgress: false, renameIndex: -1 });
    }

    private onInputNameChange = (e) => {
        const value = e.currentTarget.value;
        this.setState({ fileName: value });
    }

    private onNewFolderNameSave = (e) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode != KeyCode.Enter) { return; }
        e.preventDefault();
        const { path, fileName } = this.state;
        const file: IFile = { path, name: fileName, isDirectory: true };
        // this.api.post<IFile>("file", file)
        this.props.onNewFolder(file)
            .then((response) => {
                this.setState({ newFolderInProgress: false }, () => this.changeDirectory(`${path}/${fileName}`));
            })
            .catch((error) => {
                this.props.onError(error);
                this.setState({ newFolderInProgress: false });
            });
    }

    private onRenameSave = (e) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode != KeyCode.Enter) { return; }
        e.preventDefault();
        e.stopPropagation();
        const { path, fileName, list, renameIndex } = this.state;
        const file = list[renameIndex];
        this.props.onRename(file, fileName)
            .then((response) => {
                this.setState({ renameIndex: -1 }, () => this.changeDirectory(path));
            })
            .catch((error) => {
                this.props.onError(error);
                this.setState({ renameIndex: -1 });
            });
    }

    private onFileSelectedForUpload = (e) => {
        const { path } = this.state;
        const file: File = e.target.files[0];
        this.props.onNewFile(file)
            // this.api.upload("file", )
            .then(() => this.changeDirectory(path))
            .catch((error) => {
                this.props.onError(error);
            });
    }

    private changeDirectory(directory: string) {
        this.props.onChangeDirectory(directory)
            .then((files: IFile[]) => {
                this.setState({ list: this.sortFiles(files), path: directory || "/" });
            })
            .catch((error) => {
                this.props.onError(error.message);
            });
    }

    private renderFilesList() {
        const { list, path, newFolderInProgress, fileName, renameIndex } = this.state;
        // go to parent directory
        const upDirectory = path && path != "/" ? (
            <tr key={-1} data-index={-1}>
                <td onClick={this.onSelect}>
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
                <tr key={index} data-index={index}>
                    <td onClick={isRename ? null : this.onSelect}>
                        <Icon name={isDirectory ? "folder" : "image"} />
                        <label>{fileNameCmp}</label>
                    </td>
                    <td>
                        {isRename ? null : <Icon name="edit" onClick={this.onRename} />}
                        <Icon name="clear" onClick={isRename ? this.onRenameCancel : this.onDelete} />
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
}
