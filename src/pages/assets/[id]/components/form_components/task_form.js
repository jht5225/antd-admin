import React, {Component } from 'react'
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Select,
} from 'antd'

const { Option } = Select

const FormItem = Form.Item

class InfoForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            siteId: ""
        }
        
    }
    
    render(){
        const { start_amount, annual_min, rate_kwh, start_date, first_renew, frequency, user_assigned } = this.props.item

        const user_options = []
        
        for (let key in this.props.users){
            const item = this.props.users[key]
            user_options.push(
                <Option value={item.username}>{item.username}</Option>
            )
        }
        
        
        const formatted_start_date = moment(start_date,'YYYY-MM-DD')
        const formatted_first_renew = moment(first_renew,'YYYY-MM-DD')

        const username = user_assigned ? user_assigned : "Not Assigned"

        return ( 
          
        <Form 
        form={this.props.form}
        layout="horizontal"
        initialValues={{start_amount: start_amount, annual_min: annual_min, rate_kwh: rate_kwh, start_date: formatted_start_date, first_renew: formatted_first_renew, user_assigned: username, frequency: frequency }}
        >
            <FormItem name='start_amount' 
            label={"Start Amount"} hasFeedback>
                <Input />
            </FormItem>
            <FormItem name='annual_min' 
            label={"Minimum"} hasFeedback>
                <Input />
            </FormItem>
            <FormItem name='rate_kwh' 
            label={"Rate"} hasFeedback>
                <Input />
            </FormItem>
            <FormItem name='start_date' 
            label={"Start Date"} hasFeedback>
                <DatePicker format='YYYY-MM-DD'/>
            </FormItem>
            <FormItem name='first_renew' 
            label={"First Renewal Date"} hasFeedback>
                <DatePicker format='YYYY-MM-DD'/>
            </FormItem>
            <Form.Item name='user_assigned' >
                <Select placeholder="Assign User">
                    {user_options}
                </Select>
            </Form.Item>
            <FormItem label="Frequency" name="frequency">
                <Radio.Group>
                    <Radio.Button value="monthly">Monthly</Radio.Button>
                    <Radio.Button value="quarterly">Quarterly</Radio.Button>
                    <Radio.Button value="yearly">Yearly</Radio.Button>
                </Radio.Group>
            </FormItem>

        </Form>
        )
    }
}


export default InfoForm