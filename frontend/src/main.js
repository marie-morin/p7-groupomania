import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
import vuetify from './plugins/vuetify';

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
dom.watch();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
