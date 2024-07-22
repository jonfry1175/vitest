const valToken = localStorage.getItem("token");

const DEFAULT_STATE = {
    token: valToken,
    isAuthenticated: !!valToken, // Convert token to boolean
};


    export const authReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.token, isAuthenticated: true };
        case "LOGOUT":
            return { ...state, token: null, isAuthenticated: false }
        case "CHECK_AUTH_STATUS":
            return {
                ...state,
                isAuthenticated: state.token ? true : false
            }
        default:
            return state
    }
}