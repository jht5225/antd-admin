import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans } from '@lingui/react'
import FormWizard from './purchase_order'
import IssueForm from './issue_form'
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

const IssueModal = (modalProps) =>  {  
  const { onOk, type, ...modal} = modalProps.modalProps
  console.log(modal)
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields()
       .then(values=>{
         form.resetFields()
         onOk(values)
       })
  }
  if (type === 'createPurchaseOrder'){
    modal.footer = null
  }
  return (
    <Modal
     {...modal} 
     onOk={handleOk}
     >
      {type === 'createPurchaseOrder' ? <FormWizard onOk={onOk} /> : <IssueForm form={form} />}
    </Modal>
  )
}


IssueModal.propTypes = {
modalProps: PropTypes.object
}

export default IssueModal
