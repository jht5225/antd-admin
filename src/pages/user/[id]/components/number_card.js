import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import CountUp from 'react-countup'
import iconMap from 'utils/iconMap'
import styles from './number_card.less'



function NumberCard({ icon, color, title, number, countUp, decimals=0, suffix='' }) {
  const text_style = {
    color : "white",
    backgroundColor: color,
  }
  
  return (
    <Card
      className={styles.numberCard}
      bordered={false}
    
      bodyStyle={{ padding: 10 }}
      style={text_style}
    >
      <div style={{paddingTop:"30px"}}>
        <span className={styles.iconWarp} >
          {iconMap[icon]}
        </span>
        <div className={styles.content}>
          <p className={styles.title} >{title || 'No Title'}</p>
          <p className={styles.number} >
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              decimals={decimals}
              useEasing
              
              useGrouping
              suffix={suffix}
              separator=","
              {...(countUp || {})}
            />
          </p>
        </div>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  decimals: PropTypes.number,
  suffix: PropTypes.string
}

export default NumberCard
