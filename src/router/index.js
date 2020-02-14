import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import fullRoutes from "./fullRoutes";
import NProgress from "nprogress";

Vue.use(Router);

export function initRoutes(routes) {
  return new Router({
    routes: routes
  });
}

export function cleanRouter(route) {
  route.matcher = new Router([]).matcher; // reset router
}

export function routeEureka(paths, routes) {
  let tempPaths = [...paths];
  let index = indexOfPath(tempPaths.shift(), routes);
  if (index < 0) {
    return false;
  } else if (tempPaths.length !== 0) {
    return routeEureka(tempPaths, routes[index].children);
  } else {
    return true;
  }
}

export function indexOfPath(path, routes) {
  let routeArr = [];
  for (let route of routes) {
    routeArr.push(route.path);
  }
  return routeArr.indexOf(path);
}

export function pathToArray(path) {
  let arr = path.split("/");
  arr.splice(0, 1);
  if (arr[0] === "") {
    return ["/"];
  } else {
    arr[0] = "/" + arr[0];
  }
  return arr;
}

// export const fullRouter = fullRoutes.concat(dynamicRoutes);
export const fullRouter = fullRoutes;

const _router = initRoutes(fullRouter);

// _router.beforeEach(((to, from, next) => {
// 	console.log(to);
// 	if (to.matched.length > 0) {
// 		next();
// 	} else {
// 		let pathArray = pathToArray(to.path);
// 		if (!routeEureka(pathArray, fullRouter)) {
// 			next('/error/404')
// 		} else if (!routeEureka(pathArray, store.getters.isLoggedIn)) {
// 			next('/error/403')
// 		}
// 	}
// }));
_router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn || sessionStorage.getItem("jwtUtente")) {
      next();
      return;
    }
    next("/error/403");
  } else {
    next();
  }
});

// _router.afterEach((to, from) => {
// 	NProgress.done()
// })
export default _router;
