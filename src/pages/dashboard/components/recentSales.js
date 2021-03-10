import React, { PureComponent } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag, Button } from 'antd'
import { Color } from 'utils'
import styles from './recentSales.less'

const status = {
  'down': Color.red,
  'no data': Color.yellow,
  'operating': Color.green,
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

function RecentSales({ data, type="diff", time="month" }) {
  var columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'IMPACT',
      dataIndex: [time,type],
      // render: (text, it) => (
      //   <span style={{ color: status[it.status] }}>{text}</span>
      // ),
      defaultSortOrder: 'descend',
      sorter: true,
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
        defaultSortOrder: 'descend',
        sorter: true,
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
  time: PropTypes.string,
}

class PerfTable extends PureComponent{

 columns(){
    return (this.props.type === 'downdays') ?
      [
        {
          title: 'NAME',
          dataIndex: 'name',
        },
        {
          title: 'DOWN DAYS',
          dataIndex: [this.props.time,this.props.type],
          render: (text, it) => (
            <span style={{ color: status[it.status] }}>{text}</span>
          ),
          defaultSortOrder: 'descend',
          sorter: (a, b) => a[this.props.time][this.props.type] - b[this.props.time][this.props.type],
        },
        {
          title: 'LOST REVENUE',
          dataIndex: [this.props.time,'lostrevenue'],
          sorter: (a, b) => a[this.props.time]['lostrevenue'] - b[this.props.time]['lostrevenue'],
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
      :
      [
        {
          title: 'NAME',
          dataIndex: 'name',
        },
        {
          title: 'IMPACT',
          dataIndex: [this.props.time,this.props.type],
          // render: (text, it) => (
          //   <span style={{ color: status[it.status] }}>{text}</span>
          // ),
          defaultSortOrder: 'descend',
          sorter: (a, b) => a[this.props.time][this.props.type] - b[this.props.time][this.props.type],
        },
        {
          title: 'STATUS',
          dataIndex: 'status',
          render: text => <Tag color={status[text]}>{text}</Tag>,
        },
        
      ]
  }

  render(){
    return(
      <div className={styles.recentsales}>
        <Table
          pagination={false}
          columns={this.columns()}
          rowKey='id'
          scroll={{y:400}}
          dataSource={this.props.data}
        />
      </div>
    )
  }

}

export default PerfTable
