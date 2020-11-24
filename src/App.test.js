import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import Navbar from './Components/Navbar/Navbar'
import { Route } from 'react-router-dom'
configure({adapter: new Adapter()})

describe('<Navbar />', ()=>{
  let wrapper
  beforeEach(()=>{
    wrapper = shallow(<App />)
  })
  it('should contain one <Navbar /> tag', ()=>{
    expect(wrapper.find(Navbar)).toHaveLength(1)
  })
  it('should contain two <Routes /> tags', ()=>{
    expect(wrapper.find(Route)).toHaveLength(2)
  })
})