import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button, Progress } from 'antd'
import { Color } from 'utils'
import {
    RadialBarChart,
    RadialBar,
    Legend,
    Tooltip,
    PolarAngleAxis,
    ResponsiveContainer
} from 'recharts'

const data = [
    {
      "name": "All Regions",
      "uv": 31.47,
      "pv": 2400,
      "fill": "#8884d8"
    },
    {
      "name": "Northeast",
      "uv": 26.69,
      "pv": 4567,
      "fill": "#83a6ed"
    },
    {
      "name": "South",
      "uv": -15.69,
      "pv": 1398,
      "fill": "#8dd1e1"
    },
    {
      "name": "Midwest",
      "uv": 8.22,
      "pv": 9800,
      "fill": "#82ca9d"
    },
    {
      "name": "West",
      "uv": -8.63,
      "pv": 3908,
      "fill": "#a4de6c"
    },
    {
      "name": "Hawaii",
      "uv": -2.63,
      "pv": 4800,
      "fill": "#d0ed57"
    },
  ]

class IrradianceBar extends PureComponent{

  statusBar(color){
    
    return(
      <Progress
        percent={this.props.percent}
        strokeColor={color}
        showInfo={false}
      />
    )
  }
  render(){
    const fill_color = this.props.val > 0 ? Color.green : Color.red
    const pm = this.props.val > 0 ? '+' : ''
    return(
      <Row style={{color:fill_color}}>
        <Col span={6} >
          <p><b>{this.props.name}</b></p>
        </Col>
        <Col span={12}>
          {this.statusBar(fill_color)}
        </Col>
        <Col span={6}>
          <p><b>{`${pm}${this.props.val}%`}</b></p>
        </Col>
      </Row>
    )
  }
}
  const style = {
    top: 0,
    right: 0,
    lineHeight: '24px',
    marginRight: '0px',
    paddingRight: '0px',
  };

class RegionalIrradiance extends PureComponent{
    makeBars(){
      var bars = []
      for(var i in data){
        const ent = data[i]
        const percent = (Math.abs(ent['uv']))
        
        bars.push(
          <IrradianceBar name={ent['name']} val={ent['uv']} percent={percent} />
        )
      }

      return bars

    }
    render(){
        
        const bars = this.makeBars()

        
        return(
            // <ResponsiveContainer height={150} width={250} style={{padding:'0px',margin:'0px'}}>
            //     <RadialBarChart
            //         style={{padding:'0px',margin:'0px'}}
            //         cx='40%'
            //         cy='100%'
            //         title='Regional irradiance'
            //         innerRadius={20}
            //         outerRadius={140}
            //         data={new_data} 
            //         startAngle={180} 
            //         endAngle={0}
            //     >
                    
            //         <Tooltip offset={0}  />
            //         <PolarAngleAxis type="number"  domain={domain} angleAxisId={0} tick={false} />
            //         <RadialBar minAngle={15}  background clockwise={true} dataKey='uv' label={{position: 'insideStart', fill: '#000'}} wrapperStyle={{textColor:"black"}}  angleAxisId={0}  />
            //         {/* <Legend iconSize={10}  layout='vertical' verticalAlign='top' wrapperStyle={style}  /> */}
                    
            //     </RadialBarChart>
            // </ResponsiveContainer>
            <div>
              {bars}
            </div>
        )
    }
}


export default RegionalIrradiance;