const initialState = {
    showBackground: false,
    top: 0
}

export const BackgroundReducer = (state = initialState, action) => {

    let { showBackground, top } = state

    switch (action.type) {
        case 'SHOW-BACKGROUND-SIGN-IN':
            showBackground = true
            top = 99
            return {
                ...state, showBackground, top
            }
        case 'HIDE-BACKGROUND-SIGN-IN':
            showBackground = false
            top = 0
            return {
                ...state, showBackground, top
            }

        default:
            break;
    }

    return state
}
