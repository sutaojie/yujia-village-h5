const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const teacherClub = [
  {
    //名师机构
    path: "/teacher-club",
    name: "teacher-club",
    component: PageLayout,
    redirect: {
      name: "teacher-club list"
    },
    children: [
      {
        path: "list",
        name: "teacher-club list",
        meta: {
          header_name: "teacher-club",
          keepAlive: true
        },
        component: () => import("@/pages/teacherClub/teacherClub")
      }
    ]
  },
  {
    path: "/teacher-club/teacher-details",
    name: "teacher-details",
    component: () => import("@/pages/teacherClub/teacherDetails")
  },
  {
    path: "/teacher-club/club-house-details",
    name: "club-house-details",
    component: () => import("@/pages/teacherClub/clubhouseDetails")
  }
];
export default teacherClub;
