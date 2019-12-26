const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const homepage = [
  {
    path: "/homepage",
    name: "homepage",
    component: PageLayout,
    children: [
      {
        path: "/yoga-knowledge",
        component: () => import("@/pages/homepage/yogaknowledge")
      },
      {
        path: "/yaga-information",
        name: "yaga-information",
        component: () => import("@/pages/homepage/yogaInForMation")
      },
      {
        path: "/about-us",
        component: () => import("@/pages/homepage/aboutUs")
      },
      {
        path: "/explain",
        component: () => import("@/pages/homepage/explain")
      }
    ]
  },
  {
    path: "/information-detail/:id",
    name: "information-detail",
    component: () => import("@/pages/homepage/inForMationDetail.vue")
  },
  {
    path: "/knowledge-detail/:id",
    name: "knowledge-detail",
    component: () => import("@/pages/homepage/knowledgeDetail")
  }
];
export default homepage;
