import React, { Component,ChangeEvent  }  from 'react'
import {  ChildProps,graphql,compose  } from 'react-apollo'
import {GET_AUTHORS,ADD_BOOK_MUTATION,GET_BOOKS_QUERY} from '../api/query/book';
import {InputProps,IAuthorResponse} from '../types';

// 对graphql函数的理解与使用，配置
const withAddBook = graphql<InputProps,IAuthorResponse>(GET_AUTHORS,{name:'showAuthors'});
const addBookMutation = graphql<InputProps,IAuthorResponse>(ADD_BOOK_MUTATION,{name:"addBookMutation"});



// 对childProps泛型中InputProps的相关理解 通graphql泛型函数中的泛型。  外部属性进入该组件，类型检查就是通过InputProps定义类型检查 
class AddBook extends Component<ChildProps<InputProps,IAuthorResponse>,{}> {
    state= {
        name: '',
        genre: '',
        authorId: '',
    }
    // changeHandle(e:any){ // ！！！该方法可取出来单独使用，则this指向当前运行环境
    //     e.preventDefault();
    //     console.log(this,'this',this.setState({name:'222'}))
    // }
   // ChangeEvent<HTMLDivElement>  
    changeHandle = (e:any) => { 
         e.preventDefault();
         this.setState({
            [e.target.name]:e.target.value
         })
    }
    addBookHandle = (e:any) => {
        e.preventDefault();
        this.props!.addBookMutation!({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId,
            },
            refetchQueries:[{query:GET_BOOKS_QUERY}]
        });
    }
        displayAuthors = () => {
        const data = this.props.showAuthors;
        if (data!.loading)  return <option disabled>Loading authors...</option>
        if (data!.error) return <option disabled>error:(</option>
        return data!.authors!.map(author => {
              return (
                <option key={ author.id } value={ author.id }>{ author.name }</option>
              )
            })
        }
    render() {
        console.log(this.props)
    return (
        <form onSubmit={this.addBookHandle}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" onChange={this.changeHandle}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" onChange={this.changeHandle}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="author" onChange={this.changeHandle}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <div>
          <button>+</button>
        </div>
      </form>   
    )
  }
}
// 一个组件多个graphql的组合用compose
export default compose(withAddBook,addBookMutation)(AddBook);
