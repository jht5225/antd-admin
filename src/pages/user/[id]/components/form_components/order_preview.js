import React, {Component} from 'react';
import {Row, Col, List, Card, Table} from 'antd';

const our_address = {
    city: "Greenwich",
    name: "Altus Power, LLC",
    state: "CT",
    street: "102 Greenwich Ave, 3rd Floor" ,
    zip_code: "06830"
}

class OrderPreview extends Component{

    formatAddress(address){
        return(
            <>
                <p>{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zip_code}</p>
            </>
        );

    }
    headerInfo(){
        
        const headerData = [
            {
                title: "Date",
                val: this.props.order_info.date.format("MMM Do YY")  
            },
            {
                title: "P.O No.",
                val: this.props.order_info.number
            },
            {
                title: "Terms",
                val: this.props.order_info.terms
            },
        ];
        return (
            <List
                grid={{
                
                xs: 3,
                sm: 3,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3,
                }}
                dataSource={headerData}
                renderItem={item => (
                <List.Item>
                    <Card title={item.title}>{item.val}</Card>
                </List.Item>
                )}
            />
        )
    }
    formatHeader(){
        return(
            <>
            <Row style={{paddingTop: "20px"}}>
                <Col span={6}>
                    {this.formatAddress(our_address)}
                </Col>
                <Col offset={6} span={12}>
                    <h1>Purchase Order</h1>
                    {this.headerInfo()}
                </Col>
            </Row>
            <Row style={{paddingTop: "20px"}}>
                <Col offset={1} span={10}>
                    <p>Vendor</p>
                    {this.formatAddress(this.props.vendor)}
                </Col>
                <Col offset={2} span={10}>
                    
                    <p><b>Ship To:</b></p>
                    {this.formatAddress(this.props.shipping)}
                </Col>
            </Row>
        </>
        )
    }
    makeTable(){
        const columns = [
            {
              title: 'Item',
              dataIndex: 'item',
              key: 'item',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Qty',
              dataIndex: 'qty',
              key: 'qty',
            },
            {
                title: 'Rate',
                dataIndex: 'rate',
                key: 'rate',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            },
        ];
        return( 
            <Row justify="center">
                <Table dataSource={this.props.items} pagination={false} columns={columns} />
            </Row>
        );
    }

    makePreview(){
        return(
            <Col offset={4} span={16} className="page">
                <div style={{padding: "10px"}}>
                    {this.formatHeader()}
                    {this.makeTable()}
                </div>
            </Col>
        )
    }

    render(){
        
        return (
            <>
                <h1 style={{marginTop: "10px"}}>Purchase Order Preview</h1>  
                {this.makePreview()}
            </>
        )

        
    }
}
export default OrderPreview;