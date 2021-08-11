const state = () => ({
  active_friends: [],
});

const getters = {
  getActiveFriends(state) {
    return state.active_friends;
  },
};

const actions = {
  async updateActiveFriends({ commit }) {
    let new_friends = await this.$sm.ajax({
      url: "/users/friend/",
      type: "GET",
      data: { online_only: true },
      dataType: "JSON",
    });
    commit("updateActiveFriends", new_friends);
  },
};

const mutations = {
  updateActiveFriends(state, new_friends) {
    state.active_friends = JSON.parse(new_friends);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
