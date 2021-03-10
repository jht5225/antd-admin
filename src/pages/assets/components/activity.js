import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'antd'
import { Color } from 'utils'
import styles from './activity.less'
import iconMap from 'utils/iconMap'

const {
  rightButton
} = iconMap


function Activity({ data }) {
    
    const activity_list = []
    for (let key in data){
        const item = data[key]
        activity_list.push(
            <Card 
            headStyle={{background: Color.purpleGrey}}
            bodyStyle={{background: Color.lightGrey}}
            extra={
              <Button type='primary' icon={rightButton} href={`/assets/${item.task_set}`} />
            }
            >
                <h5 className={styles.name}>{item.user}</h5>
                <p className={styles.content}>{item.full_text}</p>
                <div className={styles.daterow}>
                    <span className={styles.date}>{item.update_time}</span>
                </div>
            </Card>
        )
    }
 
  return (
    <div>
        {activity_list}
    </div>
  )
}

Activity.propTypes = {
  data: PropTypes.array,
}

export default Activity
