import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form, Alert } from 'antd'
import { GlobalFooter } from 'components'
import { Trans, withI18n } from '@lingui/react'
import config from 'utils/config'

import styles from './index.less'

const FormItem = Form.Item

@withI18n()
@connect(({ changePassword, loading, dispatch }) => ({ changePassword, loading, dispatch }))
class ChangePassword extends PureComponent {

  render() {
    
    const { dispatch, loading, changePassword} = this.props
    const { notice, notice_type } = changePassword

    const handleOk = ( values) => {
        const { new_password, repeat_new_password } = values
        if(new_password === repeat_new_password){
            dispatch({
                type: 'changePassword/changePassword',
                payload: {
                    ...values
                }
            })
        }
        else{
            dispatch({
                type: 'changePassword/updateState',
                payload:{
                    notice: 'Error: Passwords Must Match',
                    notice_type: 'error'
                }
            })
        }
    }
    console.log(notice)

    return (
      <Fragment>
          {notice && (
              <Alert
                
                message={notice}
                type={notice_type}
                showIcon
                closable
              />
            )}
        <div className={styles.form}>
        
          <div className={styles.logo}>
         
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
            >
            <FormItem name="old_password"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  type="password"
                  placeholder="Old Password"
                />
            </FormItem>
            <FormItem name="new_password"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  type="password"
                  placeholder="New Password"
                />
            </FormItem>
            <FormItem name="repeat_new_password"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  type="password"
                  placeholder="Retype New Password"
                />
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>Submit</Trans>
              </Button>
            </Row>
          </Form>
        </div>
      </Fragment>
    )
  }
}

ChangePassword.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ChangePassword
