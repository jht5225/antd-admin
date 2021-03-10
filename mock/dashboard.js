import { Mock, Constant } from './_utils'

const { ApiPrefix, Color } = Constant



let taskListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      'type|1-2':1,
      'duetype|1-3':1,
      'projectId|153-162':1,
      'progress|1-4':1,
      'quarterDue|1-4':1,
      'priceFlux|10': [{
        'price|10-200.1-2':1
      }],
      
      date() {
        return `${Mock.Random.integer(2021, 2022)}-${Mock.Random.date(
          'MM-dd'
        )} ${Mock.Random.time('HH:mm:ss')}`
      },
      'price|10-200.1-2': 1,
    },
  ],
})

let database = taskListData.data

const Dashboard = Mock.mock({
  'sales|12': [
    {
      'name|+1': 1,
      'Complete|300-550': 1,
      'Incomplete|200-400': 1,
      'Unassigned|20-30': 1,
      
    },
  ],
  cpu: {
    'usage|50-600': 1,
    space: 825,
    'cpu|40-90': 1,
    'data|20': [
      {
        'cpu|20-80': 1,
      },
    ],
  },
  browser: [
    {
      name: 'Google Chrome',
      percent: 43.3,
      status: 1,
    },
    {
      name: 'Mozilla Firefox',
      percent: 33.4,
      status: 2,
    },
    {
      name: 'Apple Safari',
      percent: 34.6,
      status: 3,
    },
    {
      name: 'Internet Explorer',
      percent: 12.3,
      status: 4,
    },
    {
      name: 'Opera Mini',
      percent: 3.3,
      status: 1,
    },
    {
      name: 'Chromium',
      percent: 2.53,
      status: 1,
    },
  ],
  user: {
    name: 'github',
    sales: 3241,
    sold: 3556,
  },
  'completed|18': [
    {
      'name|+1': 1,
      'Prod|350-500': 1,
      'Baseline|200-400': 1,
    },
  ],
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar() {
        return Mock.Random.image(
          '48x48',
          Mock.Random.color(),
          '#757575',
          'png',
          this.name.substr(0, 1)
        )
      },
      date() {
        return `2016-${Mock.Random.date('MM-dd')} ${Mock.Random.time(
          'HH:mm:ss'
        )}`
      },
    },
  ],
  'recentSales|36': [
    {
      'id|+1': 1,
      name: '@last',
      'type|1-2': 1,
      date() {
        return `${Mock.Random.integer(2015, 2016)}-${Mock.Random.date(
          'MM-dd'
        )} ${Mock.Random.time('HH:mm:ss')}`
      },
      'price|10-200.1-2': 1,
    },
  ],
  quote: {
    name: 'Joho Doe',
    title: 'Graphic Designer',
    content:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    avatar:
      '//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  },
  numbers: [
    {
      icon: 'pay-circle-o',
      color: Color.green,
      title: 'Online Review',
      number: 2781,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'New Customers',
      number: 3241,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Active Projects',
      number: 253,
    },
    {
      icon: 'shopping-cart',
      color: Color.red,
      title: 'Referrals',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    res.json(Dashboard)
  },
  [`GET ${ApiPrefix}/assets`](req, res) {
    // const { query } = req
    // let { pageSize, page, ...other } = query
    // pageSize = pageSize || 10
    // page = page || 1

    // let newData = database
    // for (let key in other) {
    //   if ({}.hasOwnProperty.call(other, key)) {
    //     newData = newData.filter(item => {
    //       if ({}.hasOwnProperty.call(item, key)) {
    //         if (key === 'address') {
    //           return other[key].every(iitem => item[key].indexOf(iitem) > -1)
    //         } else if (key === 'createTime') {
    //           const start = new Date(other[key][0]).getTime()
    //           const end = new Date(other[key][1]).getTime()
    //           const now = new Date(item[key]).getTime()

    //           if (start && end) {
    //             return now >= start && now <= end
    //           }
    //           return true
    //         }
    //         return (
    //           String(item[key])
    //             .trim()
    //             .indexOf(decodeURI(other[key]).trim()) > -1
    //         )
    //       }
    //       return true
    //     })
    //   }
    // }
    // var data = []
    // for (var key in database){
    //   data.push(database[key])
    // }
    // res.json(data)
    res.json(database)
  },
  [`GET ${ApiPrefix}/asset/:id`](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(200).json(NOTFOUND)
    }
  },
}
