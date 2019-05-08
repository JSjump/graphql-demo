export type Maybe<T> = T | null;
export interface IBooks {
    id: number
    name?:Maybe<string>
}
export type Response = {
    books:Books,
}
export interface IApolloData {
    loading:boolean
    error: Maybe<string>
    books?:IBooks[]
}
export type InputProps = {}