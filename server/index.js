import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4"
import axios from "axios"
async function startserver(){
    const app =express()
    const server = new ApolloServer({
        typeDefs :`
            type User{
            id:ID!
            name:String!
            username: String!
            email:String!
            phone:String!
            website:String!
            }
            type Todo{
                id:ID!
                title: String!
                completed: Boolean
                user:User
            }
            
            type Query{
                getToodos :[Todo]
                getAllUser:[User]
                getUser(id:ID!):User
            }
        `,
        resolvers: {
            Todo:{
                user:async (todo)=> 
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
            },
            Query:{
            getToodos:async ()=>(await axios.get('https://jsonplaceholder.typicode.com/todos/')).data,
            getAllUser:async ()=>(await axios.get('https://jsonplaceholder.typicode.com/users')).data,
            getUser:async (parent,{id})=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
         
        }
    }
    })
    app.use(bodyParser .json())
    app.use(cors())
    await server.start()
    app.use("/graphql",expressMiddleware(server))

    app.listen(8002,()=>console.log('server started listen on port 8002'))
}
startserver()