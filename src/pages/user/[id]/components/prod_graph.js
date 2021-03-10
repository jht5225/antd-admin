import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Color } from 'utils'
class ProdGraph extends React.Component {
  constructor(props) {
    super(props)
    this.timeTicket = null
    this.count = 51 
  }

  graphOption(){
    return {
      title: {
        text: 'YTD Production/Baseline Comp',
        left: 'left',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Production', 'Baseline'],
        left: 'right',
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     dataView: { readOnly: false },
      //     restore: {},
      //     saveAsImage: {},
      //   },
      // },
      grid: {
        top: 60,
        left: 60,
        right: 60,
        bottom: 30,
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: this.props.days,
        },
      ],
      yAxis: [
        {
            type: 'value',
            scale: true,
            max: Math.max(...this.props.prod),
            min: Math.min(...this.props.prod),
            // boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: 'Baseline',
          type: 'line',
          step: 'end',
          areaStyle: { normal: {} },
          data: this.props.baseline,
          color: Color.sky
        },
        {
          name: 'Production',
          type: 'line',
          color: Color.darkBlue,
          data: this.props.prod,
        },
      ],
    }
  }

  render() {
    
    return (
      
          
          <ReactEcharts
            ref="echarts_react"
            option={this.graphOption()}
            style={{ height: 400 }}
          />
         
        
    )
  }
}

export default ProdGraph
