import React from 'react'
import PropTypes from 'prop-types'
import { Color } from 'utils'
import CountUp from 'react-countup'
import styles from './cpu.less'

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimals: 2,
}

function Cpu({ title='', data={}}) {
  return (
    <div className={styles.cpu}>
      <div className={styles.header}>
        <h2 className={styles.name}>{title}</h2>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>
          <p>Complete</p>
          <p>
            <CountUp end={data.perccomp} suffix="%" {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p>Raw Var</p>
          <p>
            <CountUp end={data.rawvariance} suffix="%" {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p>Adj. Var</p>
          <p>
            <CountUp end={data.adjvariance} suffix="%" {...countUpProps} />
          </p>
        </div>
      </div>
    </div>
  )
}

Cpu.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
}

export default Cpu
