import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Repolistitem from './Repolistitem'
configure({adapter: new Adapter()})
import { addedRepos } from '../../App.jsx'

describe('<Repolistitem />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(
        <addedRepos.Provider value={{addRepo: []}}>
            <Repolistitem data={{name: 'Himanshu', html_url: 'https://enzymejs.github.io/enzyme/docs/api/render.html', id: 1}}/>
        </addedRepos.Provider>
        )
    })
    it('should render <div> tag with repo-name', ()=>{
        expect(wrapper.text()).toEqual('<Repolistitem />')
    })
})
