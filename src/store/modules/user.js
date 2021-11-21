import axios from "axios";

const state = () => ({
  friends: [],
  notifications: []
});

const getters = {
  getFriends(state) {
    return state.friends;
  },
  getNotifications(state) {
    return state.notifications;
  },
};

const actions = {
  updateFriends({ commit }, page) {
    const url = (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : "https://simul-music.herokuapp.com"
    return axios.get(url + "/api/friends/", {
      headers: { "User": this.getters['getCurrentUser'] },
      params: { "page": page }
    }).then((response) => {
      commit("updateFriends", response.data);    
    }).catch((error) => {
      commit("updateFriends", []);
    })
  },
  updateNotifications({commit}, notifications) {
    commit("updateNotifications", notifications)
  },
};

const mutations = {
  updateFriends(state, new_friends) {
    state.friends = [...state.friends, ...new_friends];
  },
  updateNotifications(state, notifications) {
    if(notifications instanceof Array) {
      state.notifications = notifications;
    } else {
      for(const notification of state.notifications) {
        if(notification.id === notification.id) {
          notification.message = notifications.content;
        }
        break;
      }

      state.notifications = state.notifications;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
