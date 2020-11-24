import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Repositorylist from './Repositorylist'
import Repolistitem from '../Repolistitem/Repolistitem'

configure({adapter: new Adapter()})

describe('<Repositorylist />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<Repositorylist data={[{name: 'Himanshu', html_url: 'https://enzymejs.github.io/enzyme/docs/api/render.html', id: 1}]}/>)
    })

    it('should render Repolistitem tag', ()=>{
        expect(wrapper.find(Repolistitem)).toHaveLength(1)
    })
})
