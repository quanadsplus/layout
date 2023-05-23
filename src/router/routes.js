
export default [
  {
    path: "/",
    name: "loading",
    meta: {
      title: "Loading",
      authRequired: true,
    },
    component: () => import("../views/loading/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("../views/account/forgot-password.vue"),
    meta: {
      title: "Forgot Password",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
       
    
          // Continue to the login page
          next();
        
      },
    },
  },  
  {
    path: "/dashboard/dashboard-overview",
    name: "dashboard-overview",
    meta: { title: "Dashboard Overview", authRequired: true },
    component: () => import("../views/dashboard/overview/index"),
  },
  {
    path: "/dashboard/dashboard-by-service",
    name: "dashboard-by-service",
    meta: { title: "Dashboard Service", authRequired: true },
    component: () => import("../views/dashboard/overview/index"),
  },
  {
    path: "/dashboard/dashboard-by-contract",
    name: "dashboard-by-contract",
    meta: { title: "Dashboard Contract", authRequired: true },
    component: () => import("../views/dashboard/overview/index"),
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      title: "Logout", authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        localStorage.clear();
        sessionStorage.clear();
        next();
      },
    },
    component: () => import("../views/auth/logout/basic")
  },  
];