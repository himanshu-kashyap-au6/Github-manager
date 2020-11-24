import React, { useReducer } from 'react'
import './Searchpage.css'
import axios from 'axios'
import Userprofile from '../Userprofile/Userprofile'
import Spinner from '../Spinner/Spinner'
import Repositorylist from '../Repositorylist/Repositorylist'
import Pagination from 'react-js-pagination'

const initialState = {
    user: false,
    repo: false,
    search: "",
    userProfile: null,
    repositories: [],
    fetching: false,
    error: "",
    totalObj: 0,
    objPerPage: 5,
    currentPage: 1
}

const reducer = (state, action) => {
    switch(action.type){
        case 'user':
            return {
                ...state,
                user: true,
                repo: false
            }
        case 'repo':
            return {
                ...state,
                user: false,
                repo: true
            }
        case 'search': 
            return {
                ...state,
                search: action.payload
        }
        case 'fetchData':
            return {
                ...state,
                error: "",
                repositories: [...action.payload.repo],
                userProfile: action.payload.user,
                totalObj: action.payload.len
        }
        case 'fetching':
            return {
                ...state,
                fetching: !state.fetching
            }
        case 'setPage':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'error':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

function SearchPage() {
    const [state, dispatch] = useReducer(reducer, initialState)
    // fxn to handel submit event
    const handelSubmit = async e => {
        e.preventDefault()
        try{
            dispatch({type: 'fetching'})
            dispatch({type: 'error', payload: ''})
            if(state.user){
                const user = await axios(`https://api.github.com/users/${state.search}`)
                const len = await axios(`${user.data.repos_url}`)
                const { data } = await axios(`${user.data.repos_url}?page=${1}&per_page=${state.objPerPage}`);
                dispatch({type: 'fetchData', payload: {user: user.data, repo: data, len: len.data.length}})
            }
            if(state.repo){
                const len = await axios(`https://api.github.com/search/repositories?q=${state.search}&sort=stars&order=desc`)
                const {data} = await axios(`https://api.github.com/search/repositories?q=${state.search}&sort=stars&order=desc&page=${1}&per_page=${state.objPerPage}`)
                dispatch({type: 'fetchData', payload: {user: null, repo: data.items, len: len.data.items.length}})
            }
        }catch(error){
            console.error(error)
            dispatch({type: 'error', payload: 'Something went wrong'})
        }finally{
            dispatch({type: 'fetching'})
        }
    }

    // fxn to handel pagination
    const handlePageChange = async pageNumber => {
        try{
            dispatch({type: 'setPage', payload: pageNumber})
            dispatch({type: 'fetching'})
            dispatch({type: 'error', payload: ''})
            if(state.user){
                const user = await axios(`https://api.github.com/users/${state.search}`)
                const len = await axios(`${user.data.repos_url}`)
                const { data } = await axios(`${user.data.repos_url}?page=${pageNumber}&per_page=${state.objPerPage}`);
                dispatch({type: 'fetchData', payload: {user: user.data, repo: data, len: len.data.length}})
            }
            if(state.repo){
                const len = await axios(`https://api.github.com/search/repositories?q=${state.search}&sort=stars&order=desc`)
                const {data} = await axios(`https://api.github.com/search/repositories?q=${state.search}&sort=stars&order=desc&page=${pageNumber}&per_page=${state.objPerPage}`)
                dispatch({type: 'fetchData', payload: {user: null, repo: data.items, len: len.data.items.length}})
            }
        }catch(error){
            console.error(error)
            dispatch({type: 'error'})
        }finally{
            dispatch({type: 'fetching'})
        }
    }
    return (
        <div className='main-div'>
            <div className='upper-center-div'>
                <div className='child-div' >
                <div onClick={()=>dispatch({type: 'user'})} className={state.user === false?'selectTag': 'selectActiveTag'} id='user' >
                    Search by User name
                <i className="far fa-check-circle"></i>
                </div>
                <div onClick={()=>dispatch({type: 'repo'})} className={state.repo === false?'selectTag': 'selectActiveTag'} id='repo'>
                    Search by Repository
                <i className="far fa-check-circle"></i>
                </div>
                </div>
                {
                    // condition to check whether the user has selected the user or repo tag
                    state.user || state.repo?
                    <form onSubmit={handelSubmit} className="search">
                        <input type="text" onChange={e=>dispatch({type: 'search', payload: e.target.value})} className="searchTerm" placeholder={state.user?"Please enter the user name":state.repo?"Please enter the repository name": null} />
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                    :null
                }
            </div>
                {/* condition to show spinner */}
            {state.fetching&& 
                <Spinner/>
            }
            {/* condition to check whether data is fetch from particular user or not*/}
            {
                state.error === "" && state.userProfile!==null && state.fetching!== true?
                <Userprofile data={state.userProfile} />:
                null
            }
            {/* condition to check whether any error occurs or not while fetching the data */}
            {
                state.error === "" && state.repositories.length !== 0 && state.fetching!== true?
                <Repositorylist data={state.repositories} />:
                null
            }
            {
                state.error === "" && state.totalObj > state.objPerPage && state.repositories.length !== 0 && state.fetching!== true?
                <>
                <br/>
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={state.currentPage}
                    itemsCountPerPage={state.objPerPage}
                    totalItemsCount={state.totalObj}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}
                />
                </>:
                null
            }
            {/* showing error messge in case of any error */}
            {
                state.error === ""?null:
                <div className='Empty-repo'>Something went wrong while fetching <i className="fab fa-github"></i> &nbsp; GitHub repositories</div>
            }
            <br/>
        </div>
    )
}

export default SearchPage
