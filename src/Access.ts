export interface IAccess {
    [action: string]: boolean | undefined;
    add?: boolean;
    edit?: boolean;
    delete?: boolean;
}
