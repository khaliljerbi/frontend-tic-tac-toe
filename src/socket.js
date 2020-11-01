import Vue from "vue";
import VueSocketIO from "vue-socket.io";

import store from "./store";

const HOST = location.origin;

Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV !== "production",
    connection:
      process.env.NODE_ENV !== "production" ? "http://localhost:5000" : HOST,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);
