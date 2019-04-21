const graphql = require('graphql');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = require('graphql');

const _=require('lodash');
const books = [
    { name: "算法导论", genre: "计算机科学", id: "1" ,authorId:"1"},
    { name: "人性的弱点", genre: "社交", id: "2",authorId:"2" },
    { name: "明朝那些事儿", genre: "历史", id: "3",authorId:"3" },
    { name: "诱人的 GraqhQL 教程", genre: "计算机科学", id: "4", authorId: '1' },
    { name: "诱人的 mobx 教程", genre: "计算机科学", id: "5", authorId: '2' },  
  ];
  const authors = [
    { name: "hfpp2012", age: 27, id: "1" },
    { name: "rails365", age: 30, id: "2" },
    { name: "lili", age: 21, id: "3" }
  ];

const BookType =new GraphQLObjectType({
    name: "book",
    fields: () => ({
      id: {type:GraphQLID},
      name: {type:GraphQLString},
      genre: {type:GraphQLString},
      author:{
          type:AuthorType,
          resolve(parent,args){
            return _.find(authors,{id:parent.authorId})
          }
      }
    })
})

const AuthorType =new GraphQLObjectType({
    name:"author",
    fields:()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }    
    })
}) 

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        book: {
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // 从哪里得到数据，比如数据库或其他来源
               return _.find(books,{id:args.id})
            }
        },
        author: {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        },
        books: {
            type:GraphQLList(BookType),
            resolve(parent,args){
             return books;
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args) {
             return authors;    
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})