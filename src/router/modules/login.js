const login = [
  // 登录
  {
    path: "/index",
    name: "index",
    component: () => import("@/pages/index")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login")
  }
];
export default login;
