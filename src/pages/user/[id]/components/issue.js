import React from 'react'
import { Card, Button } from 'antd'
import { DropOption } from 'components'

const { Meta } = Card

function Issue({issueData, onComplete, OnUpdate, onDelete}){
    
    const handleMenuClick = (e) => {
        if (e.key === '1'){
            onComplete(issueData.id)
        } else if (e.key === '2'){
            OnUpdate(issueData.id)
        } else if (e.key === '3'){
            onDelete(issueData.id)
        }
    }


    return (
        <Card
        title={issueData.subject}
            extra={
                <DropOption
                    onMenuClick={e => handleMenuClick(e)}
                    menuOptions={[
                        { key: '1', name: 'Complete'},
                        { key: '2', name: 'Update'},
                        { key: '3', name: 'Delete'}
                    ]}
                />
            }
        >
            <Meta
                description={`Sent By: ${issueData.from}`}
            />
            <p>{issueData.description}</p>
        </Card>
    )
}

export default Issue