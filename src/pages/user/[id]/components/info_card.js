import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Row, Col } from 'antd'
import styles from './info_card.less'
import iconMap from 'utils/iconMap'



function InfoCard({name='', info={}, parts=false}){

    var items  = []
    if (parts){
      for(var key in info){
        var entries = []
        for(var ent in info[key]){
          
          entries.push(
            <p>{info[key][ent].manufacturer__name}</p>
          )
        }
        items.push(
          <Col span={24}>
            <div className={styles.content}>
              <p className={styles.title}>{`${key}: `}</p>
              <div className={styles.val}>
                {entries}
              </div>
            </div>
          </Col>
        )
      }
    } else {
    for(var key in info){
      items.push(
        <Col span={24}>
          <div className={styles.content}>
            <p className={styles.title}>{`${key}: `}</p>
            <p className={styles.val}>{info[key]}</p>
          </div>
        </Col>
      )
    }
  }
    return(
        <Card
          className={styles.infoCard}
          bordered={false}
          bodyStyle={{ padding:10 }}
        > 
          <h1>{name}</h1>
          <Row> 
            {items}
          </Row>
        </Card>

    )
}

InfoCard.propTypes = {
  name: PropTypes.string,
  info: PropTypes.object,

}

export default InfoCard