import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Searchpage from './Searchpage'
configure({adapter: new Adapter()})

describe('<Searchpage />', ()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = shallow(<Searchpage />)
    })
    it('should render <i> tag', ()=>{
        expect(wrapper.contains(<i className="far fa-check-circle"></i>)).toEqual(true)
    })
})