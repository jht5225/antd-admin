import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const PurchasItemForm = (props) => {
  const onFinish = values => {
    props.onFinish(values);
  };

  return (
    <Form style={{paddingTop: "20px"}}name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'item']}
                  fieldKey={[field.fieldKey, 'item']}
                  rules={[{ required: true, message: 'Missing item name' }]}
                >
                  <Input placeholder="Item Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'description']}
                  fieldKey={[field.fieldKey, 'description']}
                  rules={[{ required: true, message: 'Missing description' }]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'qty']}
                  fieldKey={[field.fieldKey, 'qty']}
                  rules={[{ required: true, message: 'Missing qty' }]}
                >
                  <Input placeholder="Qty" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'rate']}
                  fieldKey={[field.fieldKey, 'rate']}
                  rules={[{ required: true, message: 'Missing rate' }]}
                >
                  <Input placeholder="Rate" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'amount']}
                  fieldKey={[field.fieldKey, 'amount']}
                  rules={[{ required: true, message: 'Missing amount' }]}
                >
                  <Input placeholder="Amount" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item >
        
        <Button style={{float:'right'}} type="primary" htmlType="submit">
          Next
        </Button>
        <Button style={{float:'right'}} type="secondary" onClick={props.prev}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PurchasItemForm;