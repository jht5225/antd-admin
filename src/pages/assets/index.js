import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Button } from 'antd'
import { stringify } from 'qs'
import { history } from 'umi'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  Sales,
  Tasks,
  Comments,
  ProgressChart,
  Activity,
  Filter,
} from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({assets, loading }) => ({
  assets,
  loading,
}))
class TaskManager extends PureComponent {
  
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }
  

  get filterProps() {
    const { location, dispatch, i18n } = this.props
    const { query } = location

    return {
      i18n,
      filter: {
        ...query,
      },
      onFilterChange: value => {
        dispatch({
          type: 'assets/updateTaskList',
          payload:{
            ...value
          }
        })
        
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { assets } = this.props
    const {
      task,
      tasks,
      event_data,
      activity,
    } = assets
    console.log(assets)
    var complete_leases = 0

    if(event_data){
      complete_leases = Math.round((event_data[0].complete/(event_data[0].complete + event_data[0].incomplete))*100)
    }
    
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.taskmanager}
      >
        <Row gutter={24}>
          
          <Col lg={18} md={24}>
            <Card
              bordered={false}
             
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Sales data={event_data} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  title="Completed Lease Payments"
                  bordered={false}
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 125,
                  }}
                >
                  <Row>
                    <Col span={8} offset={8}>
                      <ProgressChart percent={complete_leases} />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  title="Completed Tax Payments"
                  bordered={false}
                  className={styles.weather}
                  
                  bodyStyle={{
                    padding: 0,
                    height: 125,
                  }}
                >
                  <Row>
                    <Col span={8} offset={8}>
                      <ProgressChart percent={0} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title="Tasks" extra={<Filter {...this.filterProps} />} bodyStyle={{height: 400, background: '#fff',}}>
              <Tasks data={task} />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title="Activity" {...bodyStyle}>
              <ScrollBar>
                <Activity data={activity} />
              </ScrollBar>
            </Card>
          </Col>
          
        </Row>
      </Page>
    )
  }
}

TaskManager.propTypes = {
  assets: PropTypes.object,
  loading: PropTypes.object,
}

export default TaskManager
