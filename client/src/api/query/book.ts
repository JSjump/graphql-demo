import gql from 'graphql-tag';
export const GET_BOOKS_QUERY = gql`
{
    books {
        id
        name
    }
}`
export const GET_AUTHORS = gql`
{
    authors{
        id
        name
    }
}`
export const ADD_BOOK_MUTATION = gql`
mutation ($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId) {
        name
        id
    }
}`

// 若是带参数查询，则不能省略 查询类型query,mutation,subscribe.
export const GET_BOOK_DETAIL = gql`
query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`