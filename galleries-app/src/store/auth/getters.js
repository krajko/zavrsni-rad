export const getters = {
    activeUser: state => state.activeUser,
    isAuth: state => !!state.token
};