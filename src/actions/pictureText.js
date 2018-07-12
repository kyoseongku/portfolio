import * as types from '../constants/ActionTypes'
import axios from 'axios'
import CONFIG from '../constants/config'



export function accessCamera() {
  return async dispatch => {
    dispatch({
      type: types.GET_CAMERA_TRY
    })

    let wasOverConstrained = false
    let constraints = {
      audio: false,
      video: {
        facingMode: { exact: 'environment' }
      }
    }

    try {
      let stream = await navigator.mediaDevices.getUserMedia(constraints)
      dispatch({
        type: types.GET_CAMERA_SUCCESS,
        result: { stream }
      })
    } catch(error) {
      if(error.name === 'OverconstrainedError') {
        wasOverConstrained = true
        constraints.video = true
      } else {
        console.log(error)
        dispatch({
          type: types.GET_CAMERA_FAIL,
          error
        })
      }
    } finally {
      if(wasOverConstrained) {
        try {
          let stream = await navigator.mediaDevices.getUserMedia(constraints)
          dispatch({
            type: types.GET_CAMERA_SUCCESS,
            result: { stream }
          })
        } catch(error) {
          console.log(error)
          dispatch({
            type: types.GET_CAMERA_FAIL,
            error
          })
        }
      }
    }
  }
}



export function capture(dataURL) {
  return async dispatch => {
    dispatch({
      type: types.DO_CAPTURE
    })

    try {
      let response = await axios.post('https://vision.googleapis.com/v1/images:annotate?key='+CONFIG.GAPI_KEY, {
        requests: [{
          image: {
            content: dataURL
          },
          features: [{
            type: 'TEXT_DETECTION'
          }],
          imageContext: {
            languageHints: ['en']
          }
        }]
      })

      let result = response.data.responses[0]

      if(Object.keys(result).length === 0)
        throw new Error('Didn\'t find any text')

      dispatch({
        type: types.OCR_SUCCESS,
        result
      })
    } catch(error) {
      console.log(error)
      dispatch({
        type: types.OCR_FAIL,
        error
      })
    }
  }
}



export function recapture() {
  return dispatch => {
    dispatch({
      type: types.DO_RECAPTURE
    })
  }
}
