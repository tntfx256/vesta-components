import { Culture } from "@vesta/culture";
import React, { ChangeEvent, Component, KeyboardEvent } from "react";
import { IComponentProps } from "../BaseComponent";
import { Icon } from "../core/Icon";
import { IFile } from "../File";
import { KeyCode } from "../KeyCode";

export interface IFileOperation {
    onNewFolder: (folder: IFile) => Promise<boolean>;
    onDelete: (file: IFile) => Promise<boolean>;
    onNewFile: (file: IFile) => Promise<boolean>;
    onRename: (file: IFile, newName: string) => Promise<boolean>;
    onChangeDirectory: (path: string) => Promise<IFile[]>;
    onError: (error: Error) => void;
}

interface IFileManagerProps extends IComponentProps, IFileOperation {
    onFileSelect: (path: string) => void;
}

interface IFileManagerState {
    path: string;
    list: IFile[];
    newFolderInProgress?: boolean;
    renameIndex?: number;
    fileName: string;
}

export class FileManager extends Component<IFileManagerProps, IFileManagerState> {

    private baseDirectory = "file-manager";
    private tr = Culture.getDictionary().translate;

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

    private onSelect = (index: number) => () => {
        const { list, path } = this.state;
        // check if we should change path to parent directory
        if (index === -1) {
            return this.changeDirectory(path.substring(0, path.lastIndexOf("/")));
        }
        const file = list[index];
        if (file.isDirectory) {
            return this.changeDirectory(`${file.path}/${file.name}`);
        }
        this.props.onFileSelect(`${this.baseDirectory}/${file.path}/${file.name}`);
    }

    private onDelete = (index: number) => () => {
        const { list } = this.state;
        const file = list[index];
        this.props.onDelete(file)
            .then(() => this.changeDirectory(file.path as string))
            .catch(this.props.onError);
    }

    private onRename = (index: number) => () => {
        const { list } = this.state;
        const file = list[index];
        this.setState({ renameIndex: index, newFolderInProgress: false, fileName: file.name });
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

    private onRenameSave = (e: KeyboardEvent<HTMLInputElement>) => {
        const keyCode = e.keyCode || e.charCode;
        if (keyCode != KeyCode.Enter) { return; }
        e.preventDefault();
        e.stopPropagation();
        const { path, fileName, list, renameIndex } = this.state;
        const file = list[renameIndex as number];
        this.props.onRename(file, fileName)
            .then((response) => {
                this.setState({ renameIndex: -1 }, () => this.changeDirectory(path));
            })
            .catch((error) => {
                this.props.onError(error);
                this.setState({ renameIndex: -1 });
            });
    }

    private onFileSelectedForUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { path } = this.state;
        const file: File = (e.target.files as FileList)[0];
        this.props.onNewFile(file)
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
                    <td onClick={isRename ? this.noop : this.onSelect(index)}>
                        <Icon name={isDirectory ? "folder" : "image"} />
                        <label>{fileNameCmp}</label>
                    </td>
                    <td>
                        {isRename ? this.noop : <Icon name="edit" onClick={this.onRename(index)} />}
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

    private noop() {
        //
    }
}
