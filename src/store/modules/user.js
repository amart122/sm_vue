const state = () => ({
  online_friends: [],
});

const getters = {
  getOnlineFriends(state) {
    return state.online_friends;
  },
};

const actions = {
  async updateOnlineFriends({ commit }) {
    let new_friends = await this.$sm.ajax({
      url: "/users/friend/",
      type: "GET",
      data: { online_only: true },
      dataType: "JSON",
    });
    commit("updateOnlineFriends", new_friends);
  },
};

const mutations = {
  updateOnlineFriends(state, new_friends) {
    state.online_friends = JSON.parse(new_friends);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
