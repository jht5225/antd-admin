import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'antd'
import { Color } from 'utils'
import styles from './tasks.less'



function ProgressChart({ percent }) {
 

  return (
    <div className={styles.tasks}>
      
      <Progress
        strokeColor={{
            '0%': Color.blue,
            '100%': Color.green
        }}
        type="circle"
        percent={percent}
        />
    </div>
  )
}

ProgressChart.propTypes = {
  percent: PropTypes.number,
}

export default ProgressChart
