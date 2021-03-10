import React, { useState } from 'react';
import { Card, Button, Row, Col, Popover, Input, Form} from 'antd'
import moment from 'moment';
import { Trans } from '@lingui/react'


const count = (object) => {
    var len = 0
    for (var key in object){
        len = len + 1
    }
    return len
}

function NotesList({notes, onAdd, bodyStyle}){

    const [ visible, setVisible ] = useState(false)
    console.log(notes)
    const content = ( 
        count(notes) > 0 ? 
        notes.map(item => 
            <Col span={24}>
                <Card 
                    title={`From: ${item.username}`}
                    extra={moment(item.date, 'YYYY-MM-DD').format('MM-DD-YYYY')}
                >
                    {item.comment}
                </Card>
            </Col>
            )
        :
        <Col span={24}>
            <p>No Notes</p>
        </Col>
    )
    
    const onFinish = values => {
        onAdd(values)
        setVisible(false)
    }

    const noteForm = (
        <Form
            onFinish={onFinish}
        >
            <Form.Item
                label="Input Note"
                name="comment"
            >
                <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Add
            </Button>
        </Form>
    )

    console.log(bodyStyle)
    return (
        <Card
            title={"Notes"}
            bodyStyle={bodyStyle.bodyStyle}
            extra={
                <Popover
                visible={visible}
                content={noteForm}
                >
                    <Button type="ghost" onClick={() => {setVisible(true)}} >
                        <Trans>Create</Trans>
                    </Button>
                </Popover>
            }
            bodyStyle={{height:"300px",overflow:"scroll"}}
        >
            <Row gutter={24}>                                                                     
                {content}
            </Row>
        </Card>
    )
}

export default NotesList