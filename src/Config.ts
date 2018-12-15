import { createTheme, ITheme } from "@vesta/theme";

export interface IComponentVocabs {
    select: string;
    clear: string;
    cancel: string;
    hour: string;
    minute: string;
    name: string;
    operations: string;
    title_record_delete: string;
    msg_delete_confirm: string;
    filemanager: string;
    select_all: string;
    msg_inprogress: string;
    msg_wait: string;
}

let dictionary: IComponentVocabs = {} as IComponentVocabs;
let iTheme = createTheme({});

export function setVocabs(vocabs: IComponentVocabs) {
    dictionary = vocabs;
}

export function tr(key: string): string {
    return key in dictionary ? dictionary[key] : `__${key}__`;
}

export function setTheme(theme: ITheme) {
    iTheme = createTheme(theme);
}

export function getTheme(): ITheme {
    return iTheme;
}
