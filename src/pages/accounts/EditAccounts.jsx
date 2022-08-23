import React, { useEffect } from 'react'
import { Form, Input, Typography, Space, Button, Select } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const { Title } = Typography
const { Option } = Select

const EditAccounts = () => {
  const { id } = useParams()
  const accounts = useSelector((state) => state.AccountReducer)
  const currentAccount = accounts.find((account) => account.id === parseInt(id))
  // console.log("AC", currentAccount)
  useEffect(() => {
    form.setFieldsValue({ name: currentAccount.name })
    form.setFieldsValue({ row: currentAccount.row })
    form.setFieldsValue({ shop: currentAccount.shop })
  }, [currentAccount])

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const data = {
      id: parseInt(id),
      key: parseInt(id),
      ...values,
    }
    dispatch({ type: 'UPDATE_ACCOUNTS', payload: data })
    // console.log("data", data);
    form.resetFields()
    navigate('/admin/show-accounts')
  }

  return (
    <Layout style={{ margin: '20px' }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: 'center' }} level={3}>
          အကောင့် ဖွင့်ခြင်း စာမျက်နှာ {id}
        </Title>
        <Form
          labelCol={{
            span: 3,
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
          <Form.Item
            name="name"
            label="အမည်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ အမည်ထည့်ပါ',
              },
            ]}
          >
            <Input
              placeholder="အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: '10px' }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="row"
            label="ရာထူး"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ ရာထူးရွေးပါ',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ရာထူးရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: '10px' }}
            >
              <Option value="manager">Manager</Option>
              <Option value="cashier">Cashier</Option>
              <Option value="sale staff">Sale Staff</Option>
              <Option value="service staff">Service Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="shop"
            label="ဆိုင်"
            rules={[
              {
                required: true,
                message: 'ကျေးဇူးပြု၍ ဆိုင်ရွေးပါ',
              },
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: '10px' }}
            >
              <Option value="Joker One">Joker One</Option>
              <Option value="Joker Two">Joker Two</Option>
              <Option value="Joker Three">Joker Three</Option>
            </Select>
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
  )
}

export default EditAccounts
