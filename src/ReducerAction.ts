export interface IReducerAction<T, P> {
    type: T;
    payload: Partial<P>;
}