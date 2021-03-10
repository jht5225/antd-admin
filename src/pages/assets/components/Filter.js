import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'


import { Trans } from '@lingui/react'
import { Button, Row, Col, Form, Input, } from 'antd'

const { Search } = Input


const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {
  formRef = React.createRef()

  handleFields = fields => {
    const { acquisitionDate } = fields
    if (acquisitionDate && acquisitionDate.length) {
      fields.acquisitionDate = [
        moment(acquisitionDate[0]).format('YYYY-MM-DD'),
        moment(acquisitionDate[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {

    return (
      <Form ref={this.formRef} name="control-ref" >
        <Form.Item name="project_name">
          <Search
            allowClear
            placeholder={"Search by project"}
            onSearch={this.handleSubmit}
            onChange={this.handleChange}
          />
        </Form.Item>
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter