import React,{Component } from 'react';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo'; 
import {IBooks,Response,InputProps,IApolloData} from '../types';
import {Query,ChildProps,graphql} from "react-apollo";
const GET_BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;
const withBooks = graphql<InputProps,Response>(GET_BOOKS_QUERY)

class BookList extends Component<ChildProps<InputProps,Response>,{}>{
        render() {
          // const {loading,error,books}:IApolloData = this.props.data;  // 一旦这样写。类型检测系统报错。暂未找到原因 TODO
          // if(loading) return <p>Loading</p>;
          // if(error) return <p>Error:(</p>;
          // return books.map(({id, name}:IBooks) => (
          //   <div key={id}>
          //     <p>{name}:{name}</p>
          //   </div>
          // ))
            const apolloBooksData = this.props.data; // 获取请求的数据，上面哪种结构赋值不起作用
            if(apolloBooksData!.loading) return <p>Loading</p>;
            if(apolloBooksData!.error) return <p>Error:(</p>;
            return apolloBooksData!.books.map(({id, name}:IBooks) => (
              <div key={id}>  
                <p>{name}:{name}</p>
              </div>
            ))
        }
        }
export default withBooks(BookList);
