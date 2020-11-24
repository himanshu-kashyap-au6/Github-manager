import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Userprofile from './Userprofile'
configure({adapter: new Adapter()})

describe('<Userprofile />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<Userprofile data={{avatar_url: 'https://th.bing.com/th/id/OIP.mThPtLipq24lM15tJu06cwHaDP?pid=Api&rs=1', name: 'Himanshu', public_repos: 'test-repo', html_url: 'https://github.com/'}}/>)
    })
    it('should render complete component', ()=>{
        expect(wrapper.contains(
            <div className="profile">
            <div className="our-team">
                <div className='picture'>
                    <img className="img-fluid" src='https://th.bing.com/th/id/OIP.mThPtLipq24lM15tJu06cwHaDP?pid=Api&rs=1' alt='Userprofile'/>
                </div>
                <div className="team-content">
                    <h3 className="name">Himanshu</h3>
                    <h4 className="title">Public repos: test-repo</h4>
                </div>
                <ul className="social">
                    <li>
                        <a href='https://github.com/' target='blank'>  
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        )).toEqual(true)
    })
})