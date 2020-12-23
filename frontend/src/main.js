import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// Importing Font Awesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

dom.watch();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
