const initialState = {
    type: null,
    message: null,
    showButton: true
};

export default {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * Get config
     */
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }) {
        commit('clear');
    }
  },
  mutations: {
    success(state, value) {
        state.type = 'success';
        state.message = value.message;
        state.showButton = value.showButton
    },
    error(state, value) {
        state.type = 'error';
        state.message = value.message;
        state.showButton = value.showButton

    },
    clear(state) {
        state.type = null;
        state.message = null;
        state.showButton = true;
    }
  },
};
