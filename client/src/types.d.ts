export type Maybe<T> = T | null;

export interface IBooks {
    id: number
    name?:Maybe<string>
}
interface IBooksAddDetail{
    name:string
    genre:string
    authorId:string | number
}
interface IAddBooks {
    variables:IBooksAddDetail
    refetchQueries?:Array
}
export type Response = {
    books:IBooks[],
}
export interface IAuthorResponse {
    loading:Boolean
    authors?:IBooks[]
    error:Maybe<string>
    book?:any
}

export interface InputProps {// inputprops类型对应自定义的graphql()hoc 后跟的name名，即注入进去的property
    getBookDetail?:IAuthorResponse
    showAuthors?:IAuthorResponse
    addBookMutation?(a:IAddBooks)
    bookId?:Maybe<number>
}
