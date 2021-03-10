import React from 'react';
import { Card, Button, Row, Col, Badge} from 'antd'
import Issue from './issue'
import { Trans, withI18n } from '@lingui/react'
import { List } from 'antd/lib/form/Form';

const count = (object) => {
    var len = 0
    for (var key in object){
        len = len + 1
    }
    return len
}

function IssuesList({siteIssues, actions}){
    const { onAdd, ...otherActions } = actions
    console.log(siteIssues)
    const content = ( 
        count(siteIssues) > 0 ? 
        siteIssues.map(item => 
            <Col span={24}>
                <Issue issueData={item} {...otherActions} />
            </Col>
            )
        :
        <Col span={24}>
            <p>No New Issues</p>
        </Col>
    )

    const numIssues = typeof(siteIssues) === "object" ? count(siteIssues) : 0
    return (
        <Card
            title={ 
                <Badge offset={[10,2]} size="small" count={numIssues}>
                    <h1>New Issues</h1>
                </Badge>
            }
            extra={
                <Button type="ghost" onClick={onAdd}>
                    <Trans>Create</Trans>
                </Button>
            }
            bodyStyle={{height:"300px",overflow:"scroll"}}
        >
            <Row gutter={24}>
                {content}
            </Row>
        </Card>
    )
}

export default IssuesList