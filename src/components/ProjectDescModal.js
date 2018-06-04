import React, { Component } from 'react'
import './ProjectDescModal.css'

export default class ProjectDescModal extends Component {
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
                hasMedia && this.props.data.media.type === 'youtube' ? (
                  <div className='youtube-embed'>
                    <iframe
                      src={this.props.data.media.src}
                      title={this.props.data.name}
                      frameBorder='0'
                      allowFullScreen=''>
                    </iframe>
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
          <a href='#!' className='btn-flat' onClick={this.props.onClose}>Close</a>
        </div>
      </div>
    )
  }
}
