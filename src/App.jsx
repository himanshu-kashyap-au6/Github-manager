import React, { useReducer } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage';
import Searchpage from './Components/Searchpage/Searchpage';
import Navbar from './Components/Navbar/Navbar';

export const addedRepos = React.createContext()
// global state to access in any componenet
const initialState = []

const reducer = (state, action) => {
  switch(action.type){
    case 'addRepo':
      return [...state, action.payload]
    case 'removeRepo':
      return [...action.payload]
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <addedRepos.Provider value={{addRepo: state, addDispatch: dispatch}}>
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/search' component={Searchpage} />
        </Switch>
      </div>
    </addedRepos.Provider>
  );
}

export default App;
