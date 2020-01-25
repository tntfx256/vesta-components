// import { createTheme, ITheme } from "@vesta/theme";

// let iTheme = createTheme({});

// export function setTheme(theme: ITheme) {
//     iTheme = createTheme(theme);
// }

// export function getTheme(): ITheme {
//     return iTheme;
// }

export function extractClassNames<T>(props: T, map: any): string {
  const classNames = [];
  for (let keys = Object.keys(map), i = 0, il = keys.length; i < il; ++i) {
    const key = keys[i];
    const value = props[key];
    if (key === "value") {
      classNames.push(value || value === false || value === 0 ? map[key] : "");
    } else if (value) {
      classNames.push(map[key]);
    }
  }
  return classNames.join(" ");
}

export interface IMimeItem {
  ext: string;
  mime: string;
}

export const Mime = {
  addMime(ext: string, mime: string) {
    Mime.types.push({ ext, mime });
  },
  getMime(extension: string): string[] {
    const types: string[] = [];
    if (extension.charAt(0) === ".") {
      extension = extension.substr(1);
    }
    extension = extension.toLowerCase();
    for (let i = Mime.types.length; i--; ) {
      const type = Mime.types[i];
      if (type.ext === extension) {
        types.push(type.mime);
      }
    }
    return types;
  },
  isValid(mimeType: string): boolean {
    mimeType = mimeType.toLowerCase();
    for (let i = Mime.types.length; i--; ) {
      if (Mime.types[i].mime === mimeType) {
        return true;
      }
    }
    return false;
  },
  types: [
    { ext: "avi", mime: "application/x-troff-msvideo" },
    { ext: "avi", mime: "video/avi" },
    { ext: "avi", mime: "video/msvideo" },
    { ext: "avi", mime: "video/x-msvideo" },
    { ext: "bmp", mime: "image/bmp" },
    { ext: "bmp", mime: "image/x-windows-bmp" },
    { ext: "doc", mime: "application/msword" },
    { ext: "doc", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { ext: "gif", mime: "image/gif" },
    { ext: "jpg", mime: "image/jpeg" },
    { ext: "jpg", mime: "image/pjpeg" },
    { ext: "jpeg", mime: "image/jpeg" },
    { ext: "mp3", mime: "audio/mpeg3" },
    { ext: "mp3", mime: "audio/x-mpeg-3" },
    { ext: "mp3", mime: "video/mpeg" },
    { ext: "mp3", mime: "video/x-mpeg" },
    { ext: "mp4", mime: "video/mp4" },
    { ext: "mpg", mime: "audio/mpeg" },
    { ext: "mpg", mime: "video/mpeg" },
    { ext: "pdf", mime: "application/pdf" },
    { ext: "png", mime: "image/png" },
    { ext: "ppt", mime: "application/mspowerpoint" },
    { ext: "ppt", mime: "application/powerpoint" },
    { ext: "ppt", mime: "application/vnd.ms-powerpoint" },
    { ext: "ppt", mime: "application/x-mspowerpoint" },
    { ext: "pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { ext: "txt", mime: "text/plain" },
    { ext: "wav", mime: "audio/wav" },
    { ext: "wav", mime: "audio/x-wav" },
    { ext: "webm", mime: "audio/webm" },
    { ext: "webm", mime: "video/webm" },
    { ext: "webp", mime: "image/webp" },
    { ext: "xls", mime: "application/excel" },
    { ext: "xls", mime: "application/vnd.ms-excel" },
    { ext: "xls", mime: "application/x-excel" },
    { ext: "xls", mime: "application/x-msexcel" },
    { ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { ext: "zip", mime: "application/x-compressed" },
    { ext: "zip", mime: "application/x-zip-compressed" },
    { ext: "zip", mime: "application/zip" },
    { ext: "zip", mime: "multipart/x-zip" },
  ] as IMimeItem[],
};
