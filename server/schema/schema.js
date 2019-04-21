const graphql = require('graphql');
// mongodb+srv://graphql:<password>@cluster0-7geo6.mongodb.net/test?retryWrites=true
const Book = require('../models/book');
const Author = require("../models/author");
const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull } = require('graphql');


const _=require('lodash');
// const books = [
//     { name: "算法导论", genre: "计算机科学", id: "1" ,authorId:"1"},
//     { name: "人性的弱点", genre: "社交", id: "2",authorId:"2" },
//     { name: "明朝那些事儿", genre: "历史", id: "3",authorId:"3" },
//     { name: "诱人的 GraqhQL 教程", genre: "计算机科学", id: "4", authorId: '1' },
//     { name: "诱人的 mobx 教程", genre: "计算机科学", id: "5", authorId: '2' },  
//   ];
//   const authors = [
//     { name: "hfpp2012", age: 27, id: "1" },
//     { name: "rails365", age: 30, id: "2" },
//     { name: "lili", age: 21, id: "3" }
//   ];

const BookType =new GraphQLObjectType({
    name: "book",
    fields: () => ({
      id: {type:GraphQLID},
      name: {type:GraphQLString},
      genre: {type:GraphQLString},
      author:{
          type:AuthorType,
          resolve(parent,args){
            return Author.findById(parent.authorId);
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
                // return _.filter(books,{authorId:parent.id})
                return Book.find({ authorId: parent.id });
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
            //    return _.find(books,{id:args.id})
            return Book.findById(args.id);
            }
        },
        author: {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
                return Author.findById(args.id);
            }
        },
        books: {
            type:GraphQLList(BookType),
            resolve(parent,args){
            //  return books;
            return Book.find({});
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(parent,args) {
            //  return authors; 
            return Author.find({});   
            }
        }
    }
})
// 5bfea8f12fd83b73fa66903c
const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent,args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
              },
              resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                  });
                  return book.save();
              }
         
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
})