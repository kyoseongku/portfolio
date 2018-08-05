import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accessCamera, capture, recapture } from '../actions/pictureText'
import './PictureText.css'



class PictureText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      window: { h: 0, w: 0 }
    }

    this._videoStream = null

    this.handleResize = this.handleResize.bind(this)
    this.capture = this.capture.bind(this)
    this.recapture = this.recapture.bind(this)
  }



  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    while(!window.M); // Wait

    this.props.accessCamera()

    this.handleResize()
  }



  componentWillUnmount() {
    if(this._videoStream) {
      this._videoStream.getTracks()[0].stop()
      console.log('Ended video stream')
    }

    window.removeEventListener('resize', this.handleResize)
  }



  componentDidUpdate() {
    if(this.props.getCamera.result) {
      let elem = document.querySelector('.pt-video-wrapper video')
      elem.oncanplay = this.handleResize
      this._videoStream = this.props.getCamera.result.stream
      elem.srcObject = this._videoStream
    }

    if(this.props.ocr.result) {
      let texts = this.props.ocr.result.textAnnotations
      texts.shift() // Get rid of the first, full result

      let canvas = document.querySelector('.pt-canvas-wrapper canvas')
      let context = canvas.getContext('2d')

      for(let text of texts) {
        let v = text.boundingPoly.vertices
        context.strokeStyle = '#f00'
        context.beginPath()
        context.moveTo(v[0].x, v[0].y)
        for(let i = 1; i < v.length; i++)
          context.lineTo(v[i].x, v[i].y)
        context.lineTo(v[0].x, v[0].y)
        context.stroke()
      }
    }
  }



  handleResize() {
    let wrapper = document.querySelector('.pt-wrapper')
    wrapper.style.minHeight = window.innerHeight+'px'

    if(window.innerHeight !== this.state.window.h || window.innerWidth !== this.state.window.w) {
      this.setState({
        window: {
          h: window.innerHeight,
          w: window.innerWidth
        }
      })
    }
  }



  capture() {
    let videoWrapper = document.querySelector('.pt-video-wrapper')
    let video = document.querySelector('.pt-video-wrapper video')
    let canvas = document.querySelector('.pt-canvas-wrapper canvas')
    let context = canvas.getContext('2d')

    let vWHRatio = video.videoWidth/video.videoHeight
    canvas.setAttribute('width', videoWrapper.clientHeight*vWHRatio)
    canvas.setAttribute('height', videoWrapper.clientHeight)
    context.drawImage(video, 0, 0, videoWrapper.clientHeight*vWHRatio, videoWrapper.clientHeight)

    this.props.onCapture(canvas.toDataURL('image/png').replace('data:image/png;base64,', ''))
  }



  recapture() {
    this.props.onRecapture()
  }



  render() {
    return (
      <div className='pt-wrapper'>
        <div className='container'>
          {
            this.props.getCamera.result ? (
              <div className='center'>
                <div className={`pt-canvas-wrapper ${this.props.viewStream ? 'pt-hide' : 'pt-show'}`}>
                  <canvas/>
                </div>
                <div className={`pt-video-wrapper ${this.props.viewStream ? 'pt-show' : 'pt-hide'}`}>
                  <video className='responsive-video' autoPlay/>
                </div>
                <div className='pt-full-text'>
                  {
                    this.props.ocr.result ? (
                      this.props.ocr.result.fullTextAnnotation.text.split('\n').map((text, i) => {
                        return <h5 key={i} className='light'>{text}</h5>
                      })
                    ) : this.props.ocr.error ? (
                      <h5 className='light'>{this.props.ocr.error.message}</h5>
                    ) : null
                  }
                </div>
                {
                  this.props.viewStream ? (
                    <a className='btn btn-large indigo' onClick={this.capture}>Capture</a>
                  ) : this.props.ocr.inProg ? (
                    <h5 className='light'>Detecting text...</h5>
                  ) : (
                    <a className='btn btn-large light-blue' onClick={this.recapture}>Do another</a>
                  )
                }
              </div>
            ) : this.props.getCamera.error ? (
              <h5 className='center light'>{this.props.getCamera.error.message || 'Oops! There was an error while accessing your camera'}</h5>
            ) : (
              <h5 className='center light'>Accessing your camera...</h5>
            )
          }
        </div>
      </div>
    )
  }
}



const mapStateToProps = state => {
  console.log('Rendered with state', state.pictureText)

  return Object.assign({}, state.pictureText)
}



const mapDispatchToProps = dispatch => {
  return {
    accessCamera: () => {
      dispatch(accessCamera())
    },
    onCapture: (dataURL) => {
      dispatch(capture(dataURL))
    },
    onRecapture: () => {
      dispatch(recapture())
    }
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureText)
