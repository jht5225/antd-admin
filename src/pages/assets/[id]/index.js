import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect, history } from 'umi'
import { Row, Col, Card, Button, Progress } from 'antd'
import { Page, ScrollBar } from 'components'
import styles from './index.less'
import { NumberCard, LineChartPage, TaskInfo, TaskModal, NotesList, Activity } from './components'
import { isThisTypeNode } from 'typescript'
import { Color } from 'utils'
import iconMap from 'utils/iconMap'
import { toUpper } from 'lodash'
import { stringify } from 'qs'
const {
  user,
  calendar,
  dollar,
} = iconMap

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

const statuses = {
  'not assigned': {
    entered: false,
    paid: false,
    posted: false,
  },
  'entered': {
    entered: true,
    paid: false,
    posted: false,
  },
  'paid': {
    entered: true,
    paid: true,
    posted: false,
  },
  'posted': {
    entered: true,
    paid: true,
    posted: true,
  }
}

const parse_status = ( entered, paid, posted ) => {
    var completeness = 0
    var status = "not assigned"
    if (entered) {
      completeness = 33
      status = "Entered"
      if (paid) {
         completeness = 66
         status = "Paid"
         if (posted) {
           completeness = 100
           status = "Posted"
         }
      }
   }

   return {
      completeness: completeness,
      status: status
    }
}

@connect(({ assetDetail }) => ({ assetDetail }))
class TaskDetail extends PureComponent {

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
  modalProps() {
    const { dispatch, assetDetail, loading, } = this.props
    const { modalVisible, user_assigned, main_priority_event, id, info, frequency, modalType, users,} = assetDetail
    const { entered, paid, posted, date,  amount } = main_priority_event
    const { status } = parse_status( entered, paid, posted )
    return {
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      title: "edit",
      type: modalType, 
      users: users,
      item: {
        amount: amount,
        user_assigned: user_assigned,
        date: date,
        status: status,
        frequency: frequency,
        ...info
      },
      centered: true,
      onOk: data => {
        data['task-set'] = id
        dispatch({
          type: `assetDetail/${modalType}`,
          payload: { 
            ...data,
            ...statuses[data.status]
          }
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'assetDetail/hideModal',
        })
      },
    }
  }

  editEventModal = () => {
    const { dispatch } = this.props
    dispatch ({
      type: 'assetDetail/showModal',
      payload: {modalType: "editEvent"}
    })
  }
  editInfoModal = () => {
    const { dispatch } = this.props
    dispatch ({
      type: 'assetDetail/showModal',
      payload: {modalType: "editInfo"}
    })
  }

  addNote = data => {
    const { dispatch, assetDetail } = this.props
    const { id } = assetDetail
    data['task_set'] = id
    dispatch({
      type: 'assetDetail/createNote',
      payload: data
    })
    this.handleRefresh()
  }

  instance_page = () => {
    const { assetDetail } = this.props
    const { user_assigned, main_priority_event, notes, activity } = assetDetail
    const { entered, paid, posted } = main_priority_event
    const { completeness, status } = parse_status( entered, paid, posted )
    return (
      <Row gutter={24} >
        <Col lg={8} sm={24}>
          <NumberCard title='Due' icon={ calendar } number={main_priority_event.date} color={Color.yellow} />
        </Col>
        <Col lg={8} sm={24}>
          <NumberCard title="Amount" icon={ dollar } number={`$${main_priority_event.amount}`} color={Color.green} />
        </Col>
        <Col lg={8} sm={24}>
          <NumberCard title="Assigned to" icon={ user } number={user_assigned ? user_assigned : "not assigned"} color={Color.blue} />
        </Col>
        <Col span={24}>
          
          <Card
          title={`Status: ${status}`}
          style={{marginBottom:24}}
          >
            <Progress 
            percent={completeness}
            strokeColor={{
              '0%': Color.red,
              '100%': Color.green,
            }}
             />
          </Card>
        </Col>
        <Col lg={12} sm={24}>
          <NotesList notes={notes} onAdd={this.addNote} bodyStyle={bodyStyle} />
        </Col>
        <Col lg={12} sm={24}>
            <Card bordered={false} title="Activity" {...bodyStyle}>
              <ScrollBar>
                <Activity data={activity} />
              </ScrollBar>
            </Card>
        </Col>
      </Row>
    )
  }

  general_page = () => {
    return (
      <Row gutter={24}>
        <Col lg={16} md={24}>
          <Card><LineChartPage /></Card>
        </Col>
        <Col lg={8} md={24}>
          <Row gutter={24} >
            <Col lg={24} md={12}>
              <Card><NumberCard title="Avg Time" icon={ calendar } number={3} color={Color.blue} /></Card>
            </Col>
            <Col lg={24} md={12}>
              <Card><NumberCard title="Avg Amount" icon={ dollar } number={13} color={Color.blue} /></Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Card></Card>
        </Col>
      </Row>
    )
  }
  on_button_click = () => {
    const new_page = !this.state.instance
    this.setState({instance:new_page})
  }
  render() {
    const { assetDetail } =  this.props
    const { event, type, id, projects, info, vendors, alert_days } = assetDetail
    
    const content = event ? this.instance_page() : this.general_page()
    return (
      <Page className={styles.user_id}>
        <Row gutter={24} style={{marginBottom:24}}>
          <Col lg={24}>
            <TaskInfo
              vendors={vendors}
              altert={alert_days}
              title={`${type} #${id}`}
              buttons={
                  <>
                    <Button type="primary" onClick={this.editEventModal}>
                        Update
                    </Button>
                    <Button type="primary" onClick={this.editInfoModal}>
                        Edit
                    </Button>
                  </>
                    }
                  
              project={projects[0]}
              info={info}
              />
                
            
          </Col>
          
        </Row>
        {content}
        <TaskModal modalProps={this.modalProps()} />
      </Page>
    )
  }
}

TaskDetail.propTypes = {
  assetDetail: PropTypes.object,
}

export default TaskDetail
