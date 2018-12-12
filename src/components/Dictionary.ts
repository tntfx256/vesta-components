export interface IComponentVocabs {
    select: string;
    clear: string;
    cancel: string;
    hour: string;
    minute: string;
    name: string;
    operations: string;
}

let vocabs: IComponentVocabs = {} as IComponentVocabs;

export function inject(vocabs: IComponentVocabs) {
    vocabs = vocabs;
}

export function tr(key: string) {
    return (vocabs as any)[key] || "";
}