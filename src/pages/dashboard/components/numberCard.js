import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import CountUp from 'react-countup'
import iconMap from 'utils/iconMap'
import styles from './numberCard.less'


function NumberCard({ icon, color, title, number, countUp, decimals=0, suffix='' }) {

  return (
    <Card
      className={styles.numberCard}
      bordered={false}
      bodyStyle={{ padding: 10 }}
    >
      <span className={styles.iconWarp} style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
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
