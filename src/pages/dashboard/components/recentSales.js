import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './recentSales.less'

const status = {
  'Down': Color.red,
  'No Data': Color.yellow,
  'Operating': Color.green,
  1: {
    color: Color.green,
    text: 'Operating',
  },
  2: {
    color: Color.yellow,
    text: 'No Data',
  },
  3: {
    color: Color.red,
    text: 'Down',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
}

function RecentSales({ data, type="diff" }) {
  var columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'IMPACT',
      dataIndex: type,
      render: (text, it) => (
        <span style={{ color: status[it.status] }}>{text}</span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: text => <Tag color={status[text]}>{text}</Tag>,
    },
    
  ]
  
  if (type === 'days'){
    columns = [
      {
        title: 'NAME',
        dataIndex: 'name',
      },
      {
        title: 'DOWN DAYS',
        dataIndex: type,
        render: (text, it) => (
          <span style={{ color: status[it.status] }}>{text}</span>
        ),
      },
      {
        title: 'LOST REVENUE',
        dataIndex: 'lostrev',
        render: (text, it) => (
          <span style={{ color: status[it.status] }}>{text}</span>
        ),
      },
      {
        title: 'STATUS',
        dataIndex: 'status',
        render: text => <Tag color={status[text]}>{text}</Tag>,
      },
      
    ]
  } 
  return (
    <div className={styles.recentsales}>
      <Table
        pagination={false}
        columns={columns}
        rowKey='id'
        dataSource={data.filter((item, key) => key < 11)}
      />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
}

export default RecentSales
