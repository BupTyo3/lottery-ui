import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Lottery from "./views/Lottery.vue";
import Admin from "./views/Admin.vue";
import Info from "./views/Info.vue";
import Details from "./components/Lottery/Details.vue";
import IsolatedRound from "@/components/Lottery/IsolatedRound.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect() {
        return "/home";
      },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/lottery",
      name: "lottery",
      component: Lottery,
      children: [
        {
          path: "/lottery/details",
          name: "details",
          component: Details,
        },
        {
          path: "/lottery/round/:id/:hash",
          name: "isolatedRound",
          component: IsolatedRound,
        },
      ],
    },
    {
      path: "/info",
      component: Info,
      name: "info",
    },
    {
      path: "/admin",
      component: Admin,
      name: "admin",
    },
  ],
});

export default router;
