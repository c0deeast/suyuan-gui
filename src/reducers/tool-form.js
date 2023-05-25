const UPDATE_SERIAL = 'scratch-gui/toolForm/UPDATE_SERIAL'
const UPDATE_BAUDRATE = 'scratch-gui/toolForm/UPDATE_BAUDRATE'
const UPDATE_ANGELE1 = 'scratch-gui/toolForm/UPDATE_ANGELE1'
const UPDATE_ANGELE2 = 'scratch-gui/toolForm/UPDATE_ANGELE2'
const UPDATE_ANGELE3 = 'scratch-gui/toolForm/UPDATE_ANGELE3'
const UPDATE_ANGELE4 = 'scratch-gui/toolForm/UPDATE_ANGELE4'
const UPDATE_ANGELE5 = 'scratch-gui/toolForm/UPDATE_ANGELE5'
const UPDATE_ANGELE6 = 'scratch-gui/toolForm/UPDATE_ANGELE6'
const UPDATE_COORDSX = 'scratch-gui/toolForm/UPDATE_COORDSX'
const UPDATE_COORDSY = 'scratch-gui/toolForm/UPDATE_COORDSY'
const UPDATE_COORDSZ = 'scratch-gui/toolForm/UPDATE_COORDSZ'
const UPDATE_COORDSRX = 'scratch-gui/toolForm/UPDATE_COORDSRX'
const UPDATE_COORDSRY = 'scratch-gui/toolForm/UPDATE_COORDSRY'
const UPDATE_COORDSRZ = 'scratch-gui/toolForm/UPDATE_COORDSRZ'

const initialState = {
    formData: {
        serialValue: '',
        baudrateValue: '',
        angle1Value: 0,
        angle2Value: 0,
        angle3Value: 0,
        angle4Value: 0,
        angle5Value: 0,
        angle6Value: 0,
        coordsXValue: 0,
        coordsYValue: 0,
        coordsZValue: 0,
        coordsRXValue: 0,
        coordsRYValue: 0,
        coordsRZValue: 0,
    }
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
        case UPDATE_SERIAL:
            return {
                formData: Object.assign({}, state.formData, {
                    serialValue: action.value
                })
            }
        case UPDATE_BAUDRATE:
            return {
                formData: Object.assign({}, state.formData, {
                    baudrateValue: action.value
                })
            }
        case UPDATE_ANGELE1:
            return {
                formData: Object.assign({}, state.formData, {
                    angle1Value: action.value
                })
            }
        case UPDATE_ANGELE2:
            return {
                formData: Object.assign({}, state.formData, {
                    angle2Value: action.value
                })
            }
        case UPDATE_ANGELE3:
            return {
                formData: Object.assign({}, state.formData, {
                    angle3Value: action.value
                })
            }
        case UPDATE_ANGELE4:
            return {
                formData: Object.assign({}, state.formData, {
                    angle4Value: action.value
                })
            }
        case UPDATE_ANGELE5:
            return {
                formData: Object.assign({}, state.formData, {
                    angle5Value: action.value
                })
            }
        case UPDATE_ANGELE6:
            return {
                formData: Object.assign({}, state.formData, {
                    angle6Value: action.value
                })
            }
        case UPDATE_COORDSX:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsXValue: action.value
                })
            }
        case UPDATE_COORDSY:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsYValue: action.value
                })
            }
        case UPDATE_COORDSZ:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsZValue: action.value
                })
            }
        case UPDATE_COORDSRX:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsRXValue: action.value
                })
            }
        case UPDATE_COORDSRY:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsRYValue: action.value
                })
            }
        case UPDATE_COORDSRZ:
            return {
                formData: Object.assign({}, state.formData, {
                    coordsRZValue: action.value
                })
            }
        default:
            return state
    }
}

const setSerialValue = value => ({
    type: UPDATE_SERIAL,
    value: value
})

const setBaudrateValue = value => ({
    type: UPDATE_BAUDRATE,
    value: value
})
const setAngle1Value = value => ({
    type: UPDATE_ANGELE1,
    value: value
})
const setAngle2Value = value => ({
    type: UPDATE_ANGELE2,
    value: value
})
const setAngle3Value = value => ({
    type: UPDATE_ANGELE3,
    value: value
})
const setAngle4Value = value => ({
    type: UPDATE_ANGELE4,
    value: value
})
const setAngle5Value = value => ({
    type: UPDATE_ANGELE5,
    value: value
})
const setAngle6Value = value => ({
    type: UPDATE_ANGELE6,
    value: value
})
const setCoordsXValue = value => ({
    type: UPDATE_COORDSX,
    value: value
})
const setCoordsYValue = value => ({
    type: UPDATE_COORDSY,
    value: value
})
const setCoordsZValue = value => ({
    type: UPDATE_COORDSZ,
    value: value
})
const setCoordsRXValue = value => ({
    type: UPDATE_COORDSRX,
    value: value
})
const setCoordsRYValue = value => ({
    type: UPDATE_COORDSRY,
    value: value
})
const setCoordsRZValue = value => ({
    type: UPDATE_COORDSRZ,
    value: value
})

export {
    reducer as default,
    initialState as toolFormState,
    setSerialValue,
    setBaudrateValue,
    setAngle1Value,
    setAngle2Value,
    setAngle3Value,
    setAngle4Value,
    setAngle5Value,
    setAngle6Value,
    setCoordsXValue,
    setCoordsYValue,
    setCoordsZValue,
    setCoordsRXValue,
    setCoordsRYValue,
    setCoordsRZValue
}