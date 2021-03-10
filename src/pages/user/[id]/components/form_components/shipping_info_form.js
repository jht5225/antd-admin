import React, { Component} from 'react';
import {Row, Col, Form, Input, Button, DatePicker } from 'antd';


class ShippingInfo extends Component{
    
    
    handleChange = values => {
        this.props.onFinish(values);
    };
    onFinish = values => {
        console.log(values);
      };
    render(){
        return(
        <>
             
            <Row justify="center"  align="middle" style={{marginTop: '20px'}}>
                <Form onFinish={this.handleChange}>
                <Form.Item label="Order Info">
                        <Input.Group compact>
                            <Form.Item name='order_date'>
                                <DatePicker  />
                            </Form.Item>
                            <Form.Item name='order_number' >
                                <Input placeholder="Order Number" />
                            </Form.Item>
                            <Form.Item name='order_terms' >
                                <Input placeholder="Terms" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="Vendor Info">
                        <Input.Group compact>
                            <Form.Item name='vendor_name'>
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item name='vendor_street' >
                                <Input placeholder="Street Address" />
                            </Form.Item>
                        
                            <Form.Item name='vendor_city' >
                                <Input placeholder="City" />
                            </Form.Item>
                        
                            <Form.Item name='vendor_state' >
                                <Input  placeholder="State" />
                            </Form.Item>
                            <Form.Item name='vendor_zip_code' >
                                <Input placeholder="Zip Code" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label="Shipping Info">
                        <Input.Group compact>
                            <Form.Item name='shipping_name'>
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item name='shipping_street' >
                                <Input placeholder="Street Address" />
                            </Form.Item>
                        
                            <Form.Item name='shipping_city' >
                                <Input placeholder="City" />
                            </Form.Item>
                        
                            <Form.Item name='shipping_state' >
                                <Input  placeholder="State" />
                            </Form.Item>
                            <Form.Item name='shipping_zip_code' >
                                <Input placeholder="Zip Code" />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{float:'right'}} type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </>  
        );
    }
}

export default ShippingInfo;