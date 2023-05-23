const UPDATE_SERIAL = 'scratch-gui/toolForm/UPDATE_SERIAL'

const initialState = {
    serialValue:''
}

const reducer = function(state,action){
    if(typeof state === 'undefined')state = initialState
    switch(action.type){
        case  UPDATE_SERIAL:
            return Object.assign({},state,{
                serialValue:action.value
            })
        default:
            return state
    }
}

const setSerialValue = value =>({
    type:UPDATE_SERIAL,
    value,value
})

export {
    reducer as default,
    initialState as toolFormState,
    setSerialValue
}