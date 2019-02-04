import * as types from '../constants/ActionTypes'

const intialState = {
  getCamera: {
    inProg: false,
    result: null,
    error: null
  },
  viewStream: true,
  ocr: {
    inProg: false,
    result: null,
    error: null
  }
}

export default function(state = intialState, action) {
  switch(action.type) {
    case types.GET_CAMERA_TRY:
      return Object.assign({}, state, {
        getCamera: {
          inProg: true,
          result: null,
          error: null
        }
      })
    case types.GET_CAMERA_SUCCESS:
      return Object.assign({}, state, {
        getCamera: {
          inProg: false,
          result: action.result,
          error: null
        }
      })
    case types.GET_CAMERA_FAIL:
      return Object.assign({}, state, {
        getCamera: {
          inProg: false,
          result: null,
          error: action.error
        }
      })
    case types.DO_CAPTURE:
      return Object.assign({}, state, {
        viewStream: false,
        ocr: {
          inProg: true,
          result: null,
          error: null
        }
      })
    case types.DO_RECAPTURE:
      return Object.assign({}, state, {
        viewStream: true,
        ocr: {
          inProg: false,
          result: null,
          error: null
        }
      })
    case types.OCR_SUCCESS:
      return Object.assign({}, state, {
        ocr: {
          inProg: false,
          result: action.result
        }
      })
    case types.OCR_FAIL:
      return Object.assign({}, state, {
        ocr: {
          inProg: false,
          error: action.error
        }
      })
    default:
      return state
  }
}
