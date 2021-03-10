import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd'
import { Color } from 'utils'

function TaskInfo({ title, project, buttons, info, vendors }) {
  const info_cols = []

  for(let key in info){
    info_cols.push(
        <Col span={4}>
            <p><b>{key}:</b> {info[key]} </p>
        </Col>
    )
  }

  return (
        <Card
            title={title}
            extra={buttons}
        >
            <Row gutter={24} >
                <Col span={4} >
                    <a href={`/user/${project.id}`}> {project.name} </a>
                </Col>
                <Col span={4}>
                    <p><b>Vendors:</b> {vendors.name}</p>
                </Col>
                {info_cols}
            </Row>            
        </Card>
    
  )
}

TaskInfo.propTypes = {
  title: PropTypes.string,
  project: PropTypes.object,
  buttons: PropTypes.object,
  info: PropTypes.object,
}

export default TaskInfo
