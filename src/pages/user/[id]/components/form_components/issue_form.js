
import React, {Component } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';

const FormItem = Form.Item

class IssueForm extends Component{

    constructor(props){
        super(props);
        this.state ={
            siteId: ""
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = e => {
        console.log(e)
    } 
    
    render(){
        return ( 
          
        <Form 
        form={this.props.form}
        layout="horizontal"
        >
            <FormItem name='name' rules={[{ required: true }]}
            label={"Title"} hasFeedback>
            <Input />
            </FormItem>
            <FormItem name='description' rules={[{ required: true }]}
            label={"Description"} hasFeedback>
            <Input />
            </FormItem>
            <FormItem name='sent_by' rules={[{ required: true }]}
            label={"Issue Created By"} hasFeedback>
            <Input />
            </FormItem>
        </Form>
        )
    };
}


export default IssueForm;