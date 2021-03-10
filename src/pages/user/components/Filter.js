import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'

import { Trans } from '@lingui/react'
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'
import city from 'utils/city'

const { Search } = Input
const { RangePicker } = DatePicker

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

  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }
  handleChange = (key, values) => {
    const { onFilterChange } = this.props
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, i18n } = this.props
    const { name, address } = filter

    let initialacquisitionDate = []
    if (filter.acquisitionDate && filter.acquisitionDate[0]) {
      initialacquisitionDate[0] = moment(filter.acquisitionDate[0])
    }
    if (filter.acquisitionDate && filter.acquisitionDate[1]) {
      initialacquisitionDate[1] = moment(filter.acquisitionDate[1])
    }

    return (
      <Form ref={this.formRef} name="control-ref" initialValues={{ name, address, acquisitionDate: initialacquisitionDate }}>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="name">
              <Search
                placeholder={i18n.t`Search Name`}
                onSearch={this.handleSubmit}
              />
            </Form.Item>
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="address">
              <Search
                placeholder={i18n.t`Please pick an address`}
                onSearch={this.handleSubmit}
              />
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 10 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button
                  type="primary" htmlType="submit"
                  className="margin-right"
                  onClick={this.handleSubmit}
                >
                  <Trans>Search</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>Reset</Trans>
                </Button>
              </div>
              <Button type="ghost" onClick={onAdd}>
                <Trans>Create</Trans>
              </Button>
            </Row>
          </Col>
        </Row>
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