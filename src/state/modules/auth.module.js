

import AuthenticationService from "../../services/authentication.service";

const initialState = {
    jwt : "",
    user: null,
};

export default {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * Get config
     */
    async loginEmailPassword({commit,dispatch},value){
        const result = await AuthenticationService.login(value.email,value.password,value.isSaveLogin)
        if (!result.token) {
            dispatch('notification/error',{message: 'Taì khoản và mật khẩu của bạn không chính xác!',showButton: false},{root: true})
            return false
        }
        dispatch('notification/success',{message: 'Đăng nhập thành công!',showButton: false},{root:true})
        commit('setJwt',result.token)
        commit('setProfile',result.data)
        return true
    },
  },
  mutations: {
    setJwt(state,value){
        state.jwt = value
        localStorage.setItem("jwt",value)
    }
    ,
    setProfile(state,value){
      state.user = value,
      localStorage.setItem('profile',JSON.stringify(value))
    }
  },
};
