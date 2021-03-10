import React, { PureComponent } from 'react'
import { Table, Avatar, Tag } from 'antd'
import { withI18n } from '@lingui/react'
import { Link } from 'umi'
import styles from './List.less'
import { Color } from 'utils'

const status ={
  1: {
    text: "assigned",
    color: Color.red
  },
  2: {
    text: 'paid',
    color: Color.yellow
  },
  3: {
    text: 'posted',
    color: Color.green
  }
}

const type = {
  1: {
    text: 'TAX',
    color: Color.blue
  },
  2: {
    text: 'LEASE',
    color: Color.purple
  }
}
@withI18n()
class List extends PureComponent {
  render() {
    const { i18n, ...tableProps } = this.props
    const columns = [
      {
        title: "TYPE",
        dataIndex: 'type',
        render: (text, record) => <Link to={`/task/`}><Tag color={type[text].color}>{type[text].text}</Tag></Link>,
      },
      {
        title: i18n.t`STATUS`,
        dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
      },
      {
        title: 'PROJECT',
        dataIndex: 'projectId',
        render: text => <a href={`/user/${text}`}>Project</a>
      },
      {
        title: 'ASSIGNED TO',
        dataIndex: 'assignedTo',
      },
      {
        title: 'DUE',
        dataIndex: 'date'
      }
      
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        bordered
        scroll={{ x: 1200 }}
        className={styles.table}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

export default List
