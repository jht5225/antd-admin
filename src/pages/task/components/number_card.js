import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import CountUp from 'react-countup'

import styles from './numberCard.less'


function NumberCard({ icon, color, title, number, countUp }) {
  return (
    <Card
      className={styles.numberCard}
      bordered={false}
      bodyStyle={{ padding: 10 }}
    >
      <span className={styles.iconWarp} style={{ color }}>
        {icon}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...(countUp || {})}
          />
        </p>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.object,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}

export default NumberCard
