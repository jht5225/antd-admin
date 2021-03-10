import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import EventForm from './event_form'
import InfoForm from './task_form'
import { Trans } from '@lingui/react'
import city from 'utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const TaskModal = (modalProps) =>  {  
  const { onOk, item, type, users,  ...modal} = modalProps.modalProps
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields()
       .then(values=>{
         const { date } = values
         if(date){
          values.date = values.date._i
         }
         form.resetFields()
         onOk(values)
       })
  }


 
  return (
    <Modal
     {...modal} 
     onOk={handleOk}
     >
      {
        ( type === 'editEvent') ?
        <EventForm form={form} item={item} /> :
        <InfoForm form={form} item={item} users={users} />
      }
    </Modal>
  )
}


TaskModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default TaskModal