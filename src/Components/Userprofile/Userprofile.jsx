import React from 'react'
import './Userprofile.css'

function Userprofile({data}) {
    return (
        <div className="profile">
        <div className="our-team">
            <div className='picture'>
                <img className="img-fluid" src={data.avatar_url} alt='Userprofile'/>
            </div>
            <div className="team-content">
                <h3 className="name">{data.name}</h3>
                <h4 className="title">Public repos: {data.public_repos}</h4>
            </div>
            <ul className="social">
                <li>
                    <a href={data.html_url} target='blank'>  
                        <i className="fab fa-github"></i>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default Userprofile
