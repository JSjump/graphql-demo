import React,{Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { graphql } from 'react-apollo';
interface IProps {

}
interface IStates {

}

const GET_BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;

class BookList extends Component<IProps,IStates>{
        render() {
            console.log(this.props)
                return (
                    <div>
                        <ul id="book_list">
                            <li>Book Name</li>
                        </ul>
                    </div>
                )
        }
}

export default graphql(GET_BOOKS_QUERY)(BookList);
