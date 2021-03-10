import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect, history } from 'umi'
import { Page, ScrollBar } from 'components'
import { Row, Col, Card, Button, Tag } from 'antd'
import { Color } from 'utils'
import { stringify } from 'qs'
import { InfoCard, ProdGraph, NumberCard, IssuesList, PurchaseOrders }from './components'
import styles from './index.less'
import { IssueModal } from './components/form_components'


@connect(({ userDetail, loading }) => ({ userDetail, loading }))
class UserDetail extends PureComponent {
  handleRefresh = () => {
    const { location } = this.props
    const { query, pathname } = location
    
    history.push({
      pathname,
    })
  }


  modalProps(){
    const {dispatch, userDetail, loading} = this.props
    const {modalVisible, modalType, id} = userDetail
    return {
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      title: "New Issue",
      type: modalType,
      width: 750,
      centered: true,
      onOk: data => {
        console.log(data)
        var send = data 
        send.project = parseInt(id)
        
        dispatch({
          type: `userDetail/${modalType}`,
          payload: send,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'userDetail/hideModal',
        })
      },
    }
  }

  purchaseOrderProps(){
    const { dispatch } = this.props

    return () => {
        dispatch({
        type: 'userDetail/showModal',
        payload: {modalType: "createPurchaseOrder"}
        })
    }
  }

  get issuesListProps(){
    const {dispatch, userDetail, loading} = this.props  
    return {
      actions: {
        onAdd: () => {
          dispatch({
            type: 'userDetail/showModal',
            payload: {modalType: "createIssue"}
          })
        },
        onComplete: (val) => {
          dispatch({
            type: 'userDetail/close',
            payload: {
              pk: val
            }
          }).then(() => {
            this.handleRefresh()
          })
        },
        onUpdate: (val) => {
          console.log(`Update ${val}`)
        },
        onDelete: (val) => {
          dispatch({
            type: 'userDetail/delete',
            payload: {
              pk:val
            }
          }).then(()=>
            this.handleRefresh()
          )
        },
      },
      
    }
  }

  getGraph(){
    const { userDetail } = this.props
    const { values, baseline, dates } = userDetail
    return(
      <ProdGraph days={dates} baseline={baseline} prod={values}/>
    )
  }
  
  render() {
    const { userDetail } = this.props
    const { data, avg_total_comp, avg_total_val, modalVisible, values, baseline_comp, parts, issues } = userDetail
    
    console.log(modalVisible)
    
    
    const content = []
    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
      }
    }
    const baseline_fixed = []
    const baseline_length = baseline_comp.length
    for (var i = 0; i < baseline_length; i++){
      baseline_fixed.push(values[i] - baseline_comp[i])  
    }
    var number_colors = Color.green
    var number_icon = "up-trend"
    if (avg_total_comp < 0){
      number_colors = Color.red
      number_icon = "down-trend"
    }

    
    return (
      <Page>
        <Row gutter={24} type="flex">
          <Col lg={18} md={24} >
            {/* Main Content */}
            <Row gutter={24} type="flex">
              <Col span={24}>
                <Card 
                  title={data.name}
                  headStyle={{border:"none", fontSize:'36px'}}
                  style={{marginBottom: "24px"}}
                  extra={
                    <Button type="ghost">Edit</Button>
                  }
                  >
                    <Tag color={number_colors}>{number_colors === Color.red ? "Below Baseline" : "Above Baseline" }</Tag>
                    <Tag color={data.is_on_performance_report ? Color.green : Color.red}>{data.is_on_performance_report ? "Reporting" : "Not Reporting"}</Tag>
                </Card>
              </Col>
              <Col lg={18} md={24} >
                <Card>
                  {this.getGraph()}
                </Card>
              </Col>
              <Col lg={6} md={24}>
                <Row gutter={24} type="flex">
                  <Col lg={24} md={12}>
                    <NumberCard 
                      title={"Avg Monthly Production"}
                      number={avg_total_val}
                      color={number_colors}
                      icon={number_icon}
                      decimals={2}
                    />
                  </Col>
                  <Col lg={24} md={12}>
                    <NumberCard
                      title={"Avg Prod Compared to Baseline"}
                      number={avg_total_comp}
                      color={number_colors}
                      icon={number_icon}
                      decimals={2}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} md={24}>
                <IssuesList siteIssues={issues} {...this.issuesListProps} />
              </Col>
              <Col lg={12} md={24}>
                <Card
                  title="Purchase Orders"
                  extra={<Button type="ghost" onClick={this.purchaseOrderProps()} >Create</Button>}
                  bodyStyle={{height:"300px", overflow:"scroll"}}
                >
                  <PurchaseOrders />
                </Card>
              </Col>
            </Row>
          </Col>
          {/* Side Content */}
          <Col lg={6} md={24} maxheight="100vh">
            <Row gutter={24} >
            <Col span={24} >
                <ScrollBar>
                  <InfoCard 
                    height="100%"
                    name={"Parts"}
                    parts={true}
                    info={parts}
                  />
                </ScrollBar>
              </Col>
              <Col span={24}>
                <ScrollBar>
                  <InfoCard 
                    name={"Other Info"}
                    info={{
                      Address: data.full_address,
                      Size: data.kw_size,
                      Capacity_DC: data.dc_capacity,
                      Capacity_AC: data.ac_capacity,
                    }}
                  />
                </ScrollBar>
              </Col>
            </Row>
          </Col>
        </Row>
        <IssueModal modalProps={this.modalProps()} />
      </Page>
    )
  }
}

UserDetail.propTypes = {
  userDetail: PropTypes.object,
}

export default UserDetail
