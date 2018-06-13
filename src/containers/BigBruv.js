import React, { Component } from 'react'
import './BigBruv.css'



export default class BigBruv extends Component {
  constructor(props) {
    super(props)

    this.state = {
      window: { h: 0, w: 0 }
    }

    this.handleResize = this.handleResize.bind(this)
  }



  componentDidMount() {
    while(!window.M); // Wait

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }



  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }



  handleResize() {
    let newState

    if(window.innerHeight !== this.state.window.h || window.innerWidth !== this.state.window.w) {
      let wrapper = document.querySelector('.bigbruv-wrapper')
      wrapper.style.minHeight = window.innerHeight+'px'

      newState = {
        window: {
          h: window.innerHeight,
          w: window.innerWidth
        }
      }
    }

    if(newState)
      this.setState(newState)
  }



  render() {
    return (
      <div className='bigbruv-wrapper'>
        <div className='container'>
          <h5 className='light'>omg u is big brudder</h5>
        </div>
      </div>
    )
  }
}
