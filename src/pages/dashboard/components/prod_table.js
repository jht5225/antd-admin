import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Link } from 'umi'
import styles from './prod_table.less'
import {Color} from 'utils'

const { confirm } = Modal

const status = {
    'down': Color.red,
    'no data': Color.yellow,
    'operating': Color.green,
    '': Color.green,
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

class ProdTable extends PureComponent {

  render() {
   

    const columns = [
     
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'status',
        render: text => <Tag color={status[text]}>{text.length === 0 ? 'Operating' : text}</Tag>,
      },
      {
        title: <Trans>Down Days</Trans>,
        dataIndex: [this.props.time,'downdays'],
        render: (text, it) => (
          <span style={{ color: status[it.status] }}>{text}</span>
        ),
        defaultSortOrder: 'descend',
        sorter: true,
      },
      {
        title: 'IMPACT',
        dataIndex: [this.props.time,'lostproduction'],
        render: (text, it) => (
          <span style={{ color: status[it.status] }}>{text}</span>
        ),
        defaultSortOrder: 'descend',
        sorter: (a, b) => a[this.props.time]['lostproduction'] - b[this.props.time]['lostproduction'],
      },
      {
        title: <Trans>Lost Revenue</Trans>,
        dataIndex: [this.props.time,'lostrevenue'],
        sorter: (a, b) => a[this.props.time]['lostrevenue'] - b[this.props.time]['lostrevenue'],
        render: (text, it) => (
          <span style={{ color: status[it.status] }}>{`$${typeof(text) === 'number' ? text : 0.00}`}</span>
        ),
      }
      
    ]

    return (
      <Table

        pagination={false}
        className={styles.table}
        bordered
        scroll={{ y: 600 }}
        columns={columns}
        simple
        dataSource={this.props.data}
        rowKey={record => record.id}
      />
    )
  }
}

ProdTable.propTypes = {
  time: PropTypes.string,
  data: PropTypes.array,
}

export default ProdTable