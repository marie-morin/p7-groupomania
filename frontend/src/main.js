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

import OutsideClick from "./directives/OutsideClick";

dom.watch();
Vue.config.productionTip = false;

Vue.directive("outside-click", OutsideClick);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
