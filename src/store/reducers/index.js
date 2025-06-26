const initialState = { 
    value: 0
}

export default function global(state = initialState, action) {
    switch (action.type) {
        case 'global/increment':
            return { ...state, value: state.value + 1 }
        case 'global/decrement':
            return { ...state, value: state.value - 1 }
        default:
            return state
    }
}