const UPDATE_CODE = 'scratch-gui/code/UPDATE_CODE';
const TOGGLE_LOCK = 'scratch-gui/code/TOGGLE_LOCK';
const SWITCH_STATUS = 'scratch-gui/code/SWITCH_STATUS';

const initialState = {
    codeEditorValue: '// Monaco editor',
    isCodeEditorLocked: true,
    codeEditorOrToolContainer: 'codeEditor'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case UPDATE_CODE:
            return Object.assign({}, state, {
                codeEditorValue: action.value
            });
        case TOGGLE_LOCK:
            return Object.assign({}, state, {
                isCodeEditorLocked: !state.isCodeEditorLocked
            });
        case SWITCH_STATUS:
            return Object.assign({}, state, {
                codeEditorOrToolContainer: action.value
            });
        default:
            return state;
    }
};

const setCodeEditorValue = value => ({
    type: UPDATE_CODE,
    value: value
});

const toggleLock = () => ({
    type: TOGGLE_LOCK
});

const setContainerStatus = value => ({
    type: SWITCH_STATUS,
    value: value
})

export {
    reducer as default,
    initialState as codeInitialState,
    setCodeEditorValue,
    toggleLock,
    setContainerStatus
};
