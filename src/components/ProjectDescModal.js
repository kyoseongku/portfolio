import React, { Component } from 'react'
import './ProjectDescModal.css'

export default class ProjectDescModal extends Component {
  constructor(props) {
    super(props)

    this.close = this.close.bind(this)
  }



  componentDidUpdate() {
    let content = document.querySelector('#projectDescModal')
    if(content) {
      setTimeout(() => { content.scrollTop = 0 }, 50)
    }

    let video = document.querySelector('#projectDescVideo')
    if(video)
      video.load()
  }



  close() {
    let video = document.querySelector('#projectDescVideo')
    if(video)
      video.pause()

    this.props.onClose()
  }



  render() {
    let hasData = Object.keys(this.props.data).length > 0
    let hasMedia = hasData && this.props.data.media && Object.keys(this.props.data.media).length > 0

    return (
      <div id='projectDescModal' className='modal'>
        {
          hasData && (
            <div className='modal-content'>
              <div className='project-desc-title'>
                <h5 className='light'>{this.props.data.name}</h5>
              </div>
              {
                hasMedia && this.props.data.media.type === 'video' ? (
                  <div className='center'>
                    <video id='projectDescVideo' className='responsive-video' controls>
                      <source src={this.props.data.media.src} type='video/mp4'/>
                    </video>
                  </div>
                ) : hasMedia && this.props.data.media.type === 'link' ? (
                  <div className='center project-desc-link'>
                    <a
                      className='btn cyan'
                      onClick={() => { this.props.history.push(this.props.data.media.src) }}
                    >{this.props.data.media.text}</a>
                  </div>
                ) : null
              }
              {
                this.props.data.points.map((point, i) => {
                  return (
                    <div key={i} className='project-desc-text'>
                      <p>{point}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        <div className='modal-footer'>
          <a className='btn-flat' onClick={this.close}>Close</a>
        </div>
      </div>
    )
  }
}
