import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './Navbar'
configure({adapter: new Adapter()})

describe('<Navbar />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<Navbar />)
    })
    it('should render <h1> tag', ()=>{
        expect(wrapper.contains(<h1 className='navbar-logo' ><i className="fab fa-github"></i> GitHub Manager</h1>)).toEqual(true)
    })
})