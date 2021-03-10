import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './tasks.less'


const status = {
  1: {
    color: Color.green,
    text: 'TAX',
  },
  2: {
    color: Color.blue,
    text: 'LEASE',
  },
  3: {
    color: Color.red,
    text: 'TAX',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
}

const type = {
  'lease': {
    color: Color.green,
    text: 'LEASE'
  },
  'tax': {
    color: Color.green,
    text: 'TAX'
  }
}
function Tasks({ data }) {

  const columns = [
    {
      title: 'TYPE',
      dataIndex: 'type',
      render: (text, record) => <a href={`/assets/${record.id}`}><Tag color={(typeof(type[text]) === 'object')  ? type[text].color : Color.blue}>{text}</Tag></a>,
    },
    {
      title: 'PROJECT',
      dataIndex: 'projects',
      render: projects => (
        <span>
          {projects.map(project => {
            return(
            <a href={`/user/${project.id}`}>{project.name}</a>
            )
          })}
        </span>
      )
    },
    {
      title: 'DUE',
      dataIndex: ['main_priority_event', 'date'],
      render: text => moment(text).format('MM-DD-YYYY'),
      sorter: (a,b) => moment(a.main_priority_event.date).unix() - moment(b.main_priority_event.date).unix()
      
    },
    {
      title: 'PRICE',
      dataIndex: ['main_priority_event', 'amount'],
    },
  ]
  return (
    <div className={styles.tasks}>
      <Table
        pagination={false}
        columns={columns}
        rowKey='id'
        dataSource={data}
      />
    </div>
  )
}

Tasks.propTypes = {
  data: PropTypes.array,
}

export default Tasks
