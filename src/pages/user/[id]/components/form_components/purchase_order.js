import React, {Component} from 'react';
import { Steps} from 'antd';
import ShippingInfo from './shipping_info_form';
import PurchasItemForm from './purchase_items';
import OrderPreview from './order_preview';
const { Step } = Steps;



class FormWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      order_info: [],
      vendor_info: [],
      shipping_info: {},
      items: [],

    };
  }

  setOrderInfo = values =>{
    this.setState({order_info:values.order,vendor_info:values.vendor,shipping_info:values.shipping});
    console.log(values.shipping);
    this.next();
  }

  setItems = values =>{
    console.log(values);
    this.setState({items:values.items});
    this.next();
  }
  setPlace = (place) => {
      console.log(place);
      this.setState({place: place});
  }

  handleFinish(){
    const data = {
     shipping: this.state.shipping_info,
     items: this.state.items
    }
    this.props.onOk({...data})
  }
  

  getSteps(){
    return [{
        title: 'Shipping Info',
        content: <ShippingInfo 
                  onFinish={
                    (values) => { 
                      this.setState({shipping_info: values}), 
                      this.next()
                      
                    }
                  }
                />,
      },
      {
        title: 'Items',
        content: <PurchasItemForm
                  onFinish={
                    (values) => { 
                      console.log(values)
                      this.setState({items: values}, () => {
                        this.handleFinish()
                      })
                    }
                  }
                  prev={() => {
                    this.setState({current: this.state.current - 1})
                  }}
                />,
      },
      {
        title: 'Success',
        content: <ShippingInfo onFinish={this.setOrderInfo} />,
      }
    ]
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current:current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ shipping_info: {}, current:current });
  }

  render() {
    const { current, form } = this.state;
    const steps = this.getSteps();
    const form_info = {
      shipping: this.state.shipping_info,
      items: this.state.items
    }
    console.log(form_info)
    return (
      <>
        <Steps className="step-container" current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} subtitle={item.subtitle}/>
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        
      </>
    );
  }
}

export default FormWizard;