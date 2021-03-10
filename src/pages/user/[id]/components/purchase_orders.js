import React, { PureComponent } from 'react'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Link } from 'umi'
import styles from './purchase_orders.less'

const data=[
    {
        name: 'purchase_order1.pdf',
        date: '01/13/15'
    },
    {
        name: 'purchase_order2.pdf',
        date: '09/18/15'
    },
    {
        name: 'purchase_order3.pdf',
        date: '02/04/16'
    },{
        name: 'purchase_order4.pdf',
        date: '07/23/16'
    },{
        name: 'purchase_order5.pdf',
        date: '10/09/17'
    },{
        name: 'purchase_order6.pdf',
        date: '11/30/17'
    },{
        name: 'purchase_order7.pdf',
        date: '01/18/18'
    },{
        name: 'purchase_order8.pdf',
        date: '03/11/19'
    },{
        name: 'purchase_order9.pdf',
        date: '04/01/19'
    },
]

@withI18n()
class PurchaseOrders extends PureComponent {
  

  render() {
  

    const columns = [
     
      {
        title: <Trans>File Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      
      {
        title: <Trans>Upload Date</Trans>,
        dataIndex: 'date',
        key: 'date',
      },
      
    ]

    return (
      <Table
        dataSource={data}
        pagination={false}
        bordered
        
        columns={columns}
        simple
        
      />
    )
  }
}

export default PurchaseOrders