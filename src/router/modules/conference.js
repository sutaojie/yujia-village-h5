const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const conference = [
  {
		path: '/conference',
    redirect: '/conference/list',
    component: PageLayout,
    meta: {
      header_name: 'conference',
    },
    children: [
      {
        path: '/conference/list',
        name: 'conference list',
        meta: {
          header_name: 'conference',
          keepAlive: true
        },
        component: () => import('@/pages/conference/index.vue')
      }
    ]
  },
  {
		path: '/conference/:id',
		name: 'conference detail',
		component: () => import('@/pages/conference/detail.vue')
  }
];
export default conference;
