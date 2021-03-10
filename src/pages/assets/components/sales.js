import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Color } from 'utils'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './sales.less'

function Sales({ data }) {

  return (
    <div className={styles.sales}>
      <div className={styles.title}>Progress</div>
      <ResponsiveContainer minHeight={315}>
        <BarChart data={data}>
          <Legend
            verticalAlign="top"
            content={prop => {
              const { payload } = prop
              
              return (
                <ul
                  className={classnames({
                    [styles.legend]: true,
                    clearfix: true,
                  })}
                >
                  {payload.map((item, key) => (
                    <li key={key}>
                      <span
                        className={styles.radiusdot}
                        style={{ background: item.color }}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
            tickLine={false}
            label="Month"
          />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid
            vertical={false}
            stroke={Color.borderBase}
            strokeDasharray="3 3"
          />
          <Tooltip />
          <Bar
            dataKey="complete"
            stackId="a"
            fill={Color.green}
          />
          <Bar
            dataKey="incomplete"
            stackId="a"
            fill={Color.red}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

Sales.propTypes = {
  data: PropTypes.array,
}

export default Sales
