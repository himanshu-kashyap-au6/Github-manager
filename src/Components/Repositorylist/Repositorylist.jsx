import React from 'react'
import Repolistitem from '../Repolistitem/Repolistitem'
import './Respositorylist.css'

function Repositorylist({data}) {
    return (
        <div className='repolis-div'>
            {data.map(obj=>
                <Repolistitem key={obj.id} data={obj}/>
            )}
        </div>
    )
}

export default Repositorylist
