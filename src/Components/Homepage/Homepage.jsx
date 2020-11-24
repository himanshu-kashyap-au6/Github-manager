import React, {useContext, useState, useEffect} from 'react'
import { addedRepos } from '../../App.jsx'
import Repositorylist from '../Repositorylist/Repositorylist.jsx'
import Pagination from 'react-js-pagination'

import './Homepage.css'

function Homepage() {
    const addRepo = useContext(addedRepos)
    // Hook to get the current page
    const [count, setCount] = useState(1)
    // fxn for pagination
    const handlePageChange = currentPage =>{
        setCount(currentPage)
    }
    useEffect(()=>{

    }, [count, addRepo.addRepo])
    return (
        <div className='Homepage' >
            {/* condition to check whether the user have added the repository or not */}
            {addRepo.addRepo.length!==0?
            <>
            {
            addRepo.addRepo.length<=5?
            <Repositorylist data={addRepo.addRepo} />:
            addRepo.addRepo.length%5===0 && addRepo.addRepo.length > 5?
            <Repositorylist data={addRepo.addRepo.slice(((count-2)*5), ((count-2)*5)+5)}/>:
            <Repositorylist data={addRepo.addRepo.slice(((count-1)*5), ((count-1)*5)+5)}/>}
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={count}
                itemsCountPerPage={5}
                totalItemsCount={addRepo.addRepo.length}
                pageRangeDisplayed={10}
                onChange={handlePageChange}
                style={{position: 'fixed', bottom: '50px'}}
            />
            </>:
            // case when no repo is present
            <div className='Empty-repo'>
                Welcome to
                <i className="fab fa-github"></i>
                &nbsp; 
                GitHub Manager
                Click on Add repo to add a repository
            </div>
            }
        </div>
    )
}

export default Homepage
