import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Button, Progress } from 'antd'
import { Page } from 'components'
import styles from './index.less'
import { NumberCard, LineChartPage} from './components'
import { isThisTypeNode } from 'typescript'
import { Color } from 'utils'
import iconMap from 'utils/iconMap'
const {
  user,
  calendar,
  dollar,
} = iconMap

@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {

  state = {
    instance: true
  }

  get_details = () => {
    const { userDetail } = this.props
    const { data } = userDetail
    var details = []
    for (let key in data){
      details.push(
        <Col lg={6} md={12}>
          <p><b>{key}: </b>{data[key]}</p>
        </Col> 
      )
    }
    return details
  }
  instance_page = () => {
    return (
      <Row gutter={24} >
        <Col lg={8} sm={24}>
          <NumberCard title="Due" icon={ calendar } number={10} color={Color.yellow} />
        </Col>
        <Col lg={8} sm={24}>
          <NumberCard title="Amount" icon={ dollar } number={15} color={Color.green} />
        </Col>
        <Col lg={8} sm={24}>
          <NumberCard title="Assigned to" icon={ user } number={10} color={Color.blue} />
        </Col>
        <Col span={24}>
          
          <Card
          title='Status: Paid'
          >
            <Progress 
            percent={66}
            strokeColor={{
              '0%': Color.red,
              '100%': Color.green,
            }}
             />
          </Card>
        </Col>
        <Col lg={12} sm={24}>
          <Card title="Notes"></Card>
        </Col>
        <Col lg={12} sm={24}>
          <Card title="Recent Activity"></Card>
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
    const content = this.state.instance ? this.instance_page() : this.general_page()
    return (
      <Page className={styles.user_id}>
        <Row gutter={24}>
          <Col lg={24}>
            <Card 
              title="Issue #3"
              extra={<Button type="primary" onClick={this.on_button_click}>
                        Switch Page
                    </Button>}
              >
                <Row gutter={24}>
                  <p>General Data Goes Here</p>
                </Row>

              </Card>
            
          </Col>
          
        </Row>
        {content}
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
