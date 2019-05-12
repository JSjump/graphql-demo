import React, { Component } from 'react'
import {graphql,ChildProps} from 'react-apollo'
import {Response,InputProps} from '../types';
import {GET_BOOK_DETAIL} from '../api/query/book'; 

const getBookDetail = graphql<InputProps,Response>(GET_BOOK_DETAIL,
    {
    name:"getBookDetail",
    options:(props)=>({
        variables:{
        id:props.bookId
    }})
})
class BookDetail extends Component<ChildProps<InputProps,Response>,{}> {
    disPlayBookDetail = () => {
        const getBookDetail = this.props.getBookDetail; 
        console.log(this.props)
        if(getBookDetail!.loading) return <p>Loading</p>;
        if(getBookDetail!.error) return <p>Error:(</p>;
        if(getBookDetail!.book){
            return(
            <div>
            <h2>{ getBookDetail!.book.name }</h2>
            <p>{ getBookDetail!.book.genre }</p>
            <p>{ getBookDetail!.book.author.name }</p>
            <p>All books by this author:</p>
            <ul className="other-books">
              { getBookDetail!.book.author.books.map((item:any) => {
                return (<li key={ item.id }>{ item.name }</li>)
              })}
            </ul>
          </div>
        )}else {
           return (<div>
                bookDetail outPut here
            </div>)
        }
    } 
    render() {
    return (
        <div id="book-details">
            {this.disPlayBookDetail()}
        </div>    
        )
  }
}
export default getBookDetail(BookDetail);