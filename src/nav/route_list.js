const route_list = [
    {
      id: '1',
      icon: 'dashboard',
      name: 'Dashboard',
      zh: {
        name: '仪表盘'
      },
      'pt-br': {
        name: 'Dashboard'
      },
      route: '/dashboard',
    },
    {
      id: '2',
      breadcrumbParentId: '1',
      name: 'Projects',
      zh: {
        name: '用户管理'
      },
      'pt-br': {
        name: 'Projetos'
      },
      icon: 'panel',
      route: '/user',
    },
   
    {
      id: '21',
      menuParentId: '-1',
      breadcrumbParentId: '2',
      name: 'User Detail',
      zh: {
        name: '用户详情'
      },
      'pt-br': {
        name: 'Detalhes do usuário'
      },
      route: '/user/:id',
    },
    {
      id: '26',
      menuParentId: '-1',
      breadcrumbParentId: '6',
      name: 'Task Detail',
      zh: {
        name: '用户详情'
      },
      'pt-br': {
        name: 'Detalhes do usuário'
      },
      route: '/assets/:id',
    },
    {
      id: '6',
      name: 'Asset Management',
      zh: {
        name: 'UI组件'
      },
      'pt-br': {
        name: 'Elementos UI'
      },
      icon: 'audit',
      route: '/assets',
    },
    {
      id: '12',
      name: 'Change Passord',
      menuParentId: '-1',
      icon: 'audit',
      route: '/change_password',
    },
    // {
    //   id: '45',
    //   breadcrumbParentId: '4',
    //   menuParentId: '4',
    //   name: 'Editor',
    //   zh: {
    //     name: 'Editor'
    //   },
    //   'pt-br': {
    //     name: 'Editor'
    //   },
    //   icon: 'edit',
    //   route: '/editor',
    // },
    // {
    //   id: '5',
    //   breadcrumbParentId: '1',
    //   name: 'Charts',
    //   zh: {
    //     name: 'Charts'
    //   },
    //   'pt-br': {
    //     name: 'Graficos'
    //   },
    //   icon: 'code-o',
    // },
    // {
    //   id: '51',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'ECharts',
    //   zh: {
    //     name: 'ECharts'
    //   },
    //   'pt-br': {
    //     name: 'ECharts'
    //   },
    //   icon: 'line-chart',
    //   route: '/chart/ECharts',
    // },
    // {
    //   id: '52',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'HighCharts',
    //   zh: {
    //     name: 'HighCharts'
    //   },
    //   'pt-br': {
    //     name: 'HighCharts'
    //   },
    //   icon: 'bar-chart',
    //   route: '/chart/highCharts',
    // },
    // {
    //   id: '53',
    //   breadcrumbParentId: '5',
    //   menuParentId: '5',
    //   name: 'Rechartst',
    //   zh: {
    //     name: 'Rechartst'
    //   },
    //   'pt-br': {
    //     name: 'Rechartst'
    //   },
    //   icon: 'area-chart',
    //   route: '/chart/Recharts',
    // },
  ]

  export default route_list;
