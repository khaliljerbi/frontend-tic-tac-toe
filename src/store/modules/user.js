import { v4 as uuidv4 } from "uuid";
import router from "../../router";

const state = {
  user: window.localStorage.getItem("user"),
};

const getters = {
  isLoggedIn: (state) => !!state.user,
  parsedUser: (state) =>
    typeof state.user === "string" ? JSON.parse(state.user) : state.user,
};

const actions = {
  login({ commit }, username) {
    const user = { id: uuidv4(), username };

    commit("setUser", user);

    // persist user
    window.localStorage.setItem("user", JSON.stringify(user));

    this._vm.$socket.emit("joinGame", user);

    // push to route
    router.push("/board");
  },
  logout({ commit }) {
    commit("setUser", null);

    window.localStorage.removeItem("user");
    this._vm.$socket.emit("logout");
    // push to route
    router.push("/");
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
