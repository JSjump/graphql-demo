import React,{Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'; 
import {Books} from '../types';
import {ChildProps,graphql} from "react-apollo";
// import { graphql } from 'react-apollo';

//  Idata {
//   loading: Boolean;
// }
// interface IProps {
//  data:Idata;
// }
// interface IStates {

// }

const GET_BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;
const withBooks = graphql<{},{books:Books}>(GET_BOOKS_QUERY)

class BookList extends Component<ChildProps<{},{books:Books}>,{}>{
    //  displayBooks = () => {
    //   const data:Idata = this.props.data;
    //   if (data.loading) {
    //     return (<div>Loading books...</div>)
    //   }
   
    //  }

        render() {
          console.log(this.props)
          const {loading,error,books} = this.props.books;
            if(loading) return <p>Loading</p>;
            if(error) return <p>Error:(</p>;
            return books.map(({id, name}) => (
              <div key={id}>
                <p>{name}:{name}</p>
              </div>
            ))
        }

                          // ({loading,error,data}) => {
                          //   if(loading) return <p>Loading</p>;
                          //   if(error) return <p>Error:(</p>;
                          //     const books:Books[] = data.Books;
                          //   return books.map(({id, name}) => (
                          //       <div key={id}>
                          //         <p>{name}:{name}</p>
                          //       </div>
                          //     ))
                          // }
                         
                        // <ul id="book_list">
                        //    <li>Book Name</li>
                        //</ul> 
        }

// export default graphql(GET_BOOKS_QUERY)(BookList);
export default withBooks(BookList);
