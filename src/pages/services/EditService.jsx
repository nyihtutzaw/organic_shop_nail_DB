import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Spin,
  message,
  Checkbox,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { editServices, getService } from '../../store/actions'
import { successEditMessage } from '../../util/messages'

const { Title } = Typography

const EditService = ({ editServices, getService }) => {
  const param = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [bonus, setBonus] = useState(false)
  const service = useSelector((state) => state.service.service)
  const status = useSelector((state) => state.status)
  const error = useSelector((state) => state.error)
  useEffect(() => {
    const fetchData = async () => {
      await getService(param?.id)
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getService, param?.id])

  useEffect(() => {
    error.message !== null && message.error(error.message)
    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage)
    }
    return () => status.success
  }, [status.success])

  useEffect(() => {
    form.setFieldsValue({ code: service?.code })
    form.setFieldsValue({ commercial: service?.commercial })
    form.setFieldsValue({ percentage: service?.percentage })
    form.setFieldsValue({ price: service?.price })
    form.setFieldsValue({ category: service?.category })
    setBonus(service?.bonus === '1' ? true : false)
  }, [form, service])

  const onFinish = async (values) => {
    await editServices(param?.id, { bonus: bonus ? 1 : 0, ...values })
    navigate('/admin/show-service')
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            ဝန်ဆောင်မှုအချက်အလက်ပြုပြင်ရန်စာမျက်နှာ
          </Title>
          <Form
            labelCol={{
              xl: {
                span: 3,
              },
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Space
              direction="vertical"
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            ></Space>
            <Form.Item
              name="code"
              label="ကုတ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ကုတ်ထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ကုတ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="category"
              label="အမျိုးအစား"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ အမျိုးအစားထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="အမျိုးအစားထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px' }}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="ကျသင့်ငွေ"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ကျသင့်ငွေထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ကျသင့်ငွေထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="percentage"
              label="ရာခိုင်နှုန်း"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ရာခိုင်နှုန်းထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ရာခိုင်နှုန်းထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
              <Checkbox
                checked={bonus}
                onChange={(event) => setBonus(event.target.checked)}
              >
                အပိုဆုကြေး
              </Checkbox>
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '10px',
                }}
                size="large"
                htmlType="submit"
              >
                <SaveOutlined />
                သိမ်းမည်
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, { editServices, getService })(EditService)
