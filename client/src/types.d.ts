export type Maybe<T> = T | null;
export interface Books {
    id: number
    name?:Maybe<string>
}
export type Response = {
    books:Books,
}
export type InputProps = {}