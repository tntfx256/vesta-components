import { Mime } from "@vesta/core";
import React, { PureComponent } from "react";
import { IComponentProps } from "../BaseComponent";
import { IFromControlProps } from "../core/FormWrapper";


interface IFormFileInputProps extends IComponentProps, IFromControlProps {
    accept?: string;
    multiple?: boolean;
    value?: string | File | Array<string | File>;
}

interface IFormFileInputState {
}

export class FormFileInput extends PureComponent<IFormFileInputProps, IFormFileInputState> {

    constructor(props: IFormFileInputProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { name, label, error, multiple, accept = "*/*" } = this.props;
        const thumbnails = this.renderThumbnails();

        return (
            <div className={`form-group file-input ${error ? "has-error" : ""}`}>
                <label htmlFor={name}>{label}</label>
                <div className="form-control">
                    {/* {placeholder ? <label htmlFor={name}>{label}</label> : null} */}
                    <input name={name} type="file" onChange={this.onChange} multiple={multiple}
                        accept={accept} />
                    <p className="form-error">{error || ""}</p>
                    {thumbnails}
                </div>
            </div>
        );
    }

    private getAppropriateFileWrapper(fileType: string, src: string) {
        switch (fileType) {
            case "image":
                return <img src={src} />;
            case "video":
                return <video controls={true}><source src={src} /></video>;
            default:
                return <span className="file" />;
        }
    }

    private onChange = (e) => {
        const { multiple, name, onChange, value } = this.props;
        if (!multiple) {
            return onChange(name, e.target.files[0]);
        }
        const files = [].concat(value);
        for (let i = 0, il = e.target.files.length; i < il; ++i) {
            files.push(e.target.files[i]);
        }
        onChange(name, files);
    }

    private removeFile = (index: number) => (e) => {
        const { name, onChange, multiple, value } = this.props;
        if (!multiple) {
            return onChange(name, null);
        }
        (value as Array<string | File>).splice(index, 1);
        onChange(name, [].concat(value));
    }

    private renderThumbnails() {
        const { multiple, value } = this.props;
        if (!value) { return null; }
        const files = [];
        const thumbnails = [];

        if (multiple) {
            for (let i = 0, il = (value as Array<string | File>).length; i < il; ++i) {
                files.push(value);
            }
        } else {
            files.push(value);
        }
        for (let i = 0, il = files.length; i < il; ++i) {
            let src = "";
            let fileType = "";
            if (files[i] instanceof File) {
                const file: File = files[i] as File;
                if (file.type.indexOf("image/") === 0) {
                    src = URL.createObjectURL(file);
                    fileType = "image";
                } else {
                    src = `data:${file.type}`;
                    fileType = src.substring(5, src.indexOf("/"));
                }
            } else {
                src = files[i];
                // it's the url of uploaded file e.g. http://domain.com/path/to/file.ext
                const extMatch = src.match(/\.([a-z0-9]+)$/i);
                if (extMatch) {
                    const mimeType = Mime.getMime(extMatch[1]);
                    if (mimeType.length) {
                        const mime = mimeType[0];
                        fileType = mime.substr(0, mime.indexOf("/"));
                    }
                }
            }
            const wrapper = this.getAppropriateFileWrapper(fileType, src);
            thumbnails.push(
                <div className={`file-wrapper ${fileType}`} key={i}>
                    {wrapper}
                    <span className="file-del icon icon-delete" data-index={i} onClick={this.removeFile(i)} />
                </div>);
        }
        return (
            <div className="thumbnails">{thumbnails}</div>
        );
    }
}
