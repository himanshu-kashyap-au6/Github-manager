import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Homepage from './Homepage'
configure({adapter: new Adapter()})
import { addedRepos } from '../../App.jsx'

describe('<Homepage />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(
        <addedRepos.Provider >
            <Homepage />
        </addedRepos.Provider>
        )
    })
    it('should render <div> tag with repo-name', ()=>{
        expect(wrapper.text()).toEqual('<Homepage />')
    })
})
