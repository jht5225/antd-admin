import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card, Menu, Dropdown, Timeline } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  ProdTable,
  PerfTable,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
  RegionalIrradiance
} from './components'
import styles from './index.less'
import store from 'store'


const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {

  handleTimeChange = (e) => {
    const { dispatch } = this.props
    const newTime = e.key
    dispatch({
      type: 'dashboard/setTime',
      payload: {
        time: newTime
      }
    })
  }

  getTimeValues = () => {
    const { dashboard } = this.props
    const {
      monthname,
      yearname,
      time,
    } = dashboard

    const timeTags = {
      'month': {
        category: 'Monthly',
        label: monthname,
        time: time
      },
      'year': {
        category: 'Year To Date',
        label: yearname,
        time: time
      },
      'rolling': {
        category: 'Rolling Year',
        label: 'Rolling Year',
        time: time
      },
    }

    return timeTags[time]
  }


  render() {
    const { dashboard, loading } = this.props
    const {
      completed,
      completeness,
      worstyearperf,
      restofmonth,
      irrvariance,
      num_projects,
      num_reporting,
      perfdata,
    } = dashboard

    const { category, label, time } = this.getTimeValues()
    
    const completenessData = completeness[time]


    const data_menu =(
      <Menu onClick={this.handleTimeChange} >
        <Menu.Item key="month">Monthly</Menu.Item>
        <Menu.Item key="year">Year to Date</Menu.Item>
        <Menu.Item key="rolling">Rolling Year</Menu.Item>
      </Menu>
    )
    return (
      <Page
        loading={loading.models.dashboard && worstyearperf.length === 1}
        className={styles.dashboard}
      >
        <Row gutter={24}>
        <Col key={0} lg={6} md={12}>
              <NumberCard icon={"up-trend"} title={"Raw Perf"} decimals={2} suffix='%' number={100} color={Color.green}/>
            </Col>
            <Col key={1} lg={6} md={12}>
              <NumberCard icon={"up-trend"} title={"Adj Perf"} decimals={2} suffix='%' number={100} color={Color.green}/>
            </Col>
            <Col key={2} lg={6} md={12}>
              <NumberCard icon={"up-trend"} title={"# Projects"} number={num_projects} color={Color.green}/>
            </Col>
            <Col key={3} lg={6} md={12}>
              <NumberCard icon={"up-trend"} title={"# Reporting"} number={num_projects} color={Color.green}/>
          </Col>
          <Col span={24}>
            <div style={{paddingBottom:28}} >
              <Dropdown.Button
                overlay={data_menu}
    > Data Span: <b>{category}</b> </Dropdown.Button>
            </div >
          </Col>
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card  bordered={false} >
                  <ScrollBar>
                    <Cpu data={completenessData} />
                  </ScrollBar>
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card title="Regional Irradiance" bordered={false}>
                  <RegionalIrradiance data={irrvariance} />
                </Card>
              </Col>
            </Row>
          </Col>
          
          <Col span={24} >
            <Card title={`Production data for ${label}`} bordered={false}>
              <ProdTable time={time} data={perfdata} />
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Dashboard