const state = () => ({
  current_view: 0,
});

const getters = {
  getCurrentView(state) {
    return state.current_view;
  },
};

const actions = {
  setCurrentView({ commit }, curr_path) {
    commit("setCurrentView", curr_path);
  },
};

const mutations = {
  setCurrentView(state, curr_path) {
    state.current_view = this.$sm.path_to_view_state(curr_path.split("/"));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
