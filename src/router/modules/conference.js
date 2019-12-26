const conference = [
  {
		path: '/conference',
		name: 'conference list',
		meta: {
			keepAlive: true
		},
		component: () => import('@/pages/conference/index.vue')
  },
  {
		path: '/conference/:id',
		name: 'conference detail',
		component: () => import('@/pages/conference/detail.vue')
  }
];
export default conference;
