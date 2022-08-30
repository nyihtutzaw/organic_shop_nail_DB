import React, { useEffect } from 'react'
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  message,
  Select,
  Spin,
  InputNumber,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { EditOutlined, SaveOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { createFine, getStaffs } from '../../store/actions'
import { successCreateMessage } from '../../util/messages'

const { Title } = Typography
const { Option } = Select

const CreateFines = ({ status, error, staff, createFine, getStaffs }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    getStaffs()

    return () => getStaffs()
  }, [getStaffs])

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      form.resetFields()
      message.success(successCreateMessage)
    }

    return () => status.success
  }, [form, status.success])

  const onFinish = async (values) => {
    await createFine(values)
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            ဒဏ်ကြေး သွင်းခြင်း စာမျက်နှာ
          </Title>
          <Form
            colon={false}
            labelCol={{
              xl: {
                span: 3,
              },
            }}
            wrapperCol={{
              xl: {
                span: 24,
              },
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="staff_id"
              label="ဝန်ထမ်းအမည်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ထည့်ပါ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {staff.staffs.map((staff) => (
                  <Option value={staff.id} key={staff.id}>
                    {staff.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="month"
              label="လ"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ လထည့်ပါ',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ လရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                <Option value="01">01</Option>
                <Option value="02">02</Option>
                <Option value="03">03</Option>
                <Option value="04">04</Option>
                <Option value="05">05</Option>
                <Option value="06">06</Option>
                <Option value="07">07</Option>
                <Option value="08">08</Option>
                <Option value="09">09</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="year"
              label="ခုနှစ်"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ခုနှစ်ထည့်ပါ',
                },
              ]}
            >
              <InputNumber
                placeholder="ခုနှစ်ထည့်ပါ  ဥပမာ(2022)"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="amount"
              label="ပမာဏ"
              rules={[
                {
                  required: true,
                  message: 'ကျေးဇူးပြု၍ ပမာဏထည့်ပါ',
                },
              ]}
            >
              <Input
                placeholder="ပမာဏထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
              />
            </Form.Item>
            <Form.Item name="note" label="မှတ်စု">
              <Input
                placeholder="မှတ်စုထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: '10px' }}
                size="large"
              />
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

const mapStateToProps = (store) => ({
  status: store.status,
  error: store.error,
  staff: store.staff,
})

export default connect(mapStateToProps, { createFine, getStaffs })(CreateFines)
