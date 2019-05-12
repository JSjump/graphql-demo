import React,{Component } from 'react';

import {GET_BOOKS_QUERY} from '../api/query/book'; 
import {IBooks,Response,InputProps} from '../types';
import {Query,ChildProps,graphql} from "react-apollo";
import BookDetail from './BookDetail';
const withBooks = graphql<InputProps,Response>(GET_BOOKS_QUERY)

class BookList extends Component<ChildProps<InputProps,Response>,{}>{
      state={
        selectedId:null
      }
      handleSelectedBook(id:string | number){
        this.setState(()=> ({
          selectedId:id
        }))
      } 
      displayBookList = () => {
          const apolloBooksData = this.props.data; // 获取请求的数据，上面哪种结构赋值不起作用
          if(apolloBooksData!.loading) return <p>Loading</p>;
          if(apolloBooksData!.error) return <p>Error:(</p>;
          return apolloBooksData!.books!.map(({id, name}:IBooks) => (
            <div key={id}>  
              <p onClick={() =>{this.handleSelectedBook(id)}}>{name}:{name}</p>
            </div>
          ))

        }
        render() {
          return (
            <div>
            {this.displayBookList()}
            <BookDetail bookId={this.state.selectedId}></BookDetail>  
            </div>
          )
          // const {loading,error,books}:IApolloData = this.props.data;  // 一旦这样写。类型检测系统报错。暂未找到原因 TODO
          // if(loading) return <p>Loading</p>;
          // if(error) return <p>Error:(</p>;
          // return books.map(({id, name}:IBooks) => (
          //   <div key={id}>
          //     <p>{name}:{name}</p>
          //   </div>
          // ))
        }
        }
export default withBooks(BookList);
