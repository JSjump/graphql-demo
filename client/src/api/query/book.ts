import gql from 'graphql-tag';
export const GET_BOOKS_QUERY = gql`
{
    books {
        id
        name
    }
}`
export const GET_AUTHOR = gql`
{
    author{
        id
        name
    }
}`