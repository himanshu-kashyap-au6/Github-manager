import React, { useContext } from 'react'
import './Repolistitem.css'
import { addedRepos } from '../../App.jsx'

function Repolistitem({data}) {
    // accessing global state using useContext hook
    const addRepo = useContext(addedRepos)
    const newRepo = [...addRepo.addRepo]
    // check whether the repo is plresent in global state or not
    const checkPresent = () =>{
        return addRepo.addRepo.indexOf(data)
    }

    const removeRepo = () => {
        newRepo.splice(newRepo.indexOf(data), 1)
        return newRepo
    }
    return (
        <div className='repo-item'>
            <div className='repo-links'>
                <a href={data.html_url} target='blank'>  
                    <i className="fab fa-github"></i>
                </a>
            </div>
            <div className='repo-name'>
                {data.name}
            </div>
            <div className='repo-links'>
                {checkPresent() === -1?
                <i className="fas fa-plus-circle" onClick={()=>addRepo.addDispatch({type: 'addRepo', payload: data})} ></i>:
                <i className="fas fa-minus-circle" onClick={()=>addRepo.addDispatch({type: 'removeRepo', payload: removeRepo()})} ></i>
                }
            </div>
        </div>
    )
}

export default Repolistitem
