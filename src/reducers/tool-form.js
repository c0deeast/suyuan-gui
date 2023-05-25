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
        angle1Value: '',
        angle2Value: '',
        angle3Value: '',
        angle4Value: '',
        angle5Value: '',
        angle6Value: '',
        coordsXValue: '',
        coordsYValue: '',
        coordsZValue: '',
        coordsRXValue: '',
        coordsRYValue: '',
        coordsRZValue: '',
    }
}

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState
    switch (action.type) {
        case UPDATE_SERIAL:
            return Object.assign({}, state, {
                serialValue: action.value
            })
        case UPDATE_BAUDRATE:
            return Object.assign({}, state, {
                baudrateValue: action.value
            })
        case UPDATE_ANGELE1:
            return Object.assign({}, state, {
                angle1Value: action.value
            })
        case UPDATE_ANGELE2:
            return Object.assign({}, state, {
                angle2Value: action.value
            })
        case UPDATE_ANGELE3:
            return Object.assign({}, state, {
                angle3Value: action.value
            })
        case UPDATE_ANGELE4:
            return Object.assign({}, state, {
                angle4Value: action.value
            })
        case UPDATE_ANGELE5:
            return Object.assign({}, state, {
                angle5Value: action.value
            })
        case UPDATE_ANGELE6:
            return Object.assign({}, state, {
                angle6Value: action.value
            })
        case UPDATE_COORDSX:
            return Object.assign({}, state, {
                coordsXValue: action.value
            })
        case UPDATE_COORDSY:
            return Object.assign({}, state, {
                coordsYValue: action.value
            })
        case UPDATE_COORDSZ:
            return Object.assign({}, state, {
                coordsZValue: action.value
            })
        case UPDATE_COORDSRX:
            return Object.assign({}, state, {
                coordsRXValue: action.value
            })
        case UPDATE_COORDSRY:
            return Object.assign({}, state, {
                coordsRYValue: action.value
            })
        case UPDATE_COORDSRZ:
            return Object.assign({}, state, {
                coordsRZValue: action.value
            })
        default:
            return state
    }
}

const setSerialValue = value => ({
    type: UPDATE_SERIAL,
    value, value
})

const setBaudrateValue = value => ({
    type: UPDATE_BAUDRATE,
    value, value
})
const setAngle1Value = value => ({
    type: UPDATE_ANGELE1,
    value, value
})
const setAngle2Value = value => ({
    type: UPDATE_ANGELE2,
    value, value
})
const setAngle3Value = value => ({
    type: UPDATE_ANGELE3,
    value, value
})
const setAngle4Value = value => ({
    type: UPDATE_ANGELE4,
    value, value
})
const setAngle5Value = value => ({
    type: UPDATE_ANGELE5,
    value, value
})
const setAngle6Value = value => ({
    type: UPDATE_ANGELE6,
    value, value
})
const setCoordsXValue = value => ({
    type: UPDATE_COORDSX,
    value, value
})
const setCoordsYValue = value => ({
    type: UPDATE_COORDSY,
    value, value
})
const setCoordsZValue = value => ({
    type: UPDATE_COORDSZ,
    value, value
})
const setCoordsRXValue = value => ({
    type: UPDATE_COORDSRX,
    value, value
})
const setCoordsRYValue = value => ({
    type: UPDATE_COORDSRY,
    value, value
})
const setCoordsRZValue = value => ({
    type: UPDATE_COORDSRZ,
    value, value
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