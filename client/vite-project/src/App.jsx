import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'

const query =gql`
query GetTodowithUser{
  getToodos {
    title,
    completed,
    user {
      name
      phone
    
    }
    
   }
}
`

function App() {

  const {data,loading}=useQuery(query)
    if (loading) return <h1>loading...</h1>
  return <div>{JSON.stringify(data)}</div>
          
}

export default App
