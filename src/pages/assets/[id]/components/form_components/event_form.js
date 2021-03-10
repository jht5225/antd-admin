import React, {Component } from 'react'
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
} from 'antd'

const FormItem = Form.Item

class EventForm extends Component{

    constructor(props){
        super(props)
        this.state ={
            siteId: ""
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit = e => {
        console.log(e)
    } 
    
    render(){
        const { amount, date, status } = this.props.item
        const formatted_date = moment(date,'YYYY-MM-DD')
        console.log(formatted_date)
        return ( 
          
        <Form 
        form={this.props.form}
        layout="horizontal"
        initialValues={{amount: amount, status: status, date:formatted_date}}
        >
            <FormItem name='amount' 
            label={"Amount"} hasFeedback>
                <Input />
            </FormItem>
            <FormItem name='date' 
            label={"Due Date"} hasFeedback>
                <DatePicker format='YYYY-MM-DD'/>
            </FormItem>
            <FormItem label="Form Size" name="status">
                <Radio.Group>
                    <Radio.Button value="entered">Entered</Radio.Button>
                    <Radio.Button value="paid">Paid</Radio.Button>
                    <Radio.Button value="posted">Posted</Radio.Button>
                </Radio.Group>
            </FormItem>

        </Form>
        )
    }
}


export default EventForm