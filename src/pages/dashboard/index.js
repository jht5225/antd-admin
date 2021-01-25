import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import {
  NumberCard,
  Quote,
  Sales,
  Weather,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
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
  render() {
    const userDetail = store.get('user')
    const { avatar, username } = userDetail
    const { dashboard, loading } = this.props
    const {
      weather,
      sales,
      quote,
      comments,
      completed,
      user,
      dayname,
      monthname,
      yearname,
      adjytdperf,
      rawytdperf,
      worstmonthperfabs,
      worstyearperfabs,
      worstyearperf,
      worstmonthperf,
      downtimemonth,
      downtimeyear,
      restofmonth,
      restofyear,
      rollingyear,
      irrvariance,
      num_projects,
      num_reporting,
    } = dashboard

   

    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
        <Row gutter={24}>
          <Col key={0} lg={6} md={12}>
            <NumberCard icon={"down-trend"} title={"Raw Perf"} decimals={2} suffix='%' number={rawytdperf} color={Color.red}/>
          </Col>
          <Col key={1} lg={6} md={12}>
            <NumberCard icon={"down-trend"} title={"Adj Perf"} decimals={2} suffix='%' number={adjytdperf} color={Color.red}/>
          </Col>
          <Col key={2} lg={6} md={12}>
            <NumberCard icon={"down-trend"} title={"# Projects"} number={num_projects} color={Color.red}/>
          </Col>
          <Col key={3} lg={6} md={12}>
            <NumberCard icon={"down-trend"} title={"# Reporting"} number={num_projects} color={Color.red}/>
          </Col>
          <Col lg={8} md={24}>
            <Card title={monthname} bordered={false} >
              <ScrollBar>
                <Cpu data={restofmonth} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card title={yearname} bordered={false} >
              <ScrollBar>
                <Cpu data={restofyear} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card title={"Rolling Year"} bordered={false} >
              <ScrollBar>
                <Cpu data={rollingyear} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card title={monthname} bordered={false} >
              <ScrollBar>
                <Browser data={irrvariance} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card title={yearname} bordered={false} >
              <ScrollBar>
                <Browser data={irrvariance} type="year"/>
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card title={"Rolling Year"} bordered={false} >
              <ScrollBar>
                <Browser data={irrvariance} type="rolling" />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Sales data={sales} />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.blue,
                  }}
                >
                  <Weather
                    {...weather}
                    loading={loading.effects['dashboard/queryWeather']}
                  />
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  bordered={false}
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach,
                  }}
                >
                  <ScrollBar>
                    <Quote {...quote} />
                  </ScrollBar>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={`Biggest Contributors to Underperformance for ${monthname}`} {...bodyStyle}>
              <RecentSales data={worstmonthperfabs}  />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={"Biggest Contributors to Underperformance for Rolling Year"} {...bodyStyle}>
              <RecentSales data={worstyearperfabs}  />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={`Worst Performers for ${monthname}`}  {...bodyStyle}>
              <RecentSales type="variance" data={worstmonthperf}  />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={"Worst Performers for Rolling Year"}  {...bodyStyle}>
              <RecentSales type="variance" data={worstyearperf}  />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={`Most Downtime for ${monthname}`}  {...bodyStyle}>
              <RecentSales type="days" data={downtimemonth}  />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card bordered={false} title={"Most Downtime for Rolling Year"}  {...bodyStyle}>
              <RecentSales type="days" data={downtimeyear}  />
            </Card>
          </Col>
          
          <Col lg={12} md={24}>
            <Card bordered={false} {...bodyStyle}>
              <ScrollBar>
                <Comments data={comments} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bordered={false}
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          
          <Col lg={8} md={24}>
            <Card
              bordered={false}
              bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}
            >
              <User {...user} avatar={avatar} username={username} />
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