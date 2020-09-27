import Vue from "vue";
import VueRouter from "vue-router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import Cities from "./components/Cities.vue";
import Schools from "./components/Schools.vue";
import DayNavigator from "./components/DayNavigator.vue";

import "./styles/main.css";

library.add(faAngleLeft, faAngleRight);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// arrow-alt-circle-left

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
    { path: "/  ", component: Cities },
    { path: "/cities", component: Cities },
    { path: "/city/:city", component: Schools },
    { path: "/city/:city/school/:school", component: DayNavigator },
];

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes, // short for `routes: routes`
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
