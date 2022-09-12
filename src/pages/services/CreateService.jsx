import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  message,
  Spin,
  Checkbox,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getServices, saveServices } from '../../store/actions'
import { connect } from 'react-redux'
import { successCreateMessage } from '../../util/messages'

const { Title } = Typography

const CreateService = ({ getServices, saveServices }) => {
  const [bonus, setBonus] = useState(false)
  const status = useSelector((state) => state.status)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    const fetchData = async () => {
      await getServices()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getServices])

  // useEffect(() => {
  //   store.dispatch(clearAlertServices());
  // }, []);

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage)
    }

    return () => status.success
  }, [status.success])

  const [supplierTable, setSupplierTable] = useState({ services: [] })

  const [form] = Form.useForm()

  const onFinish = (values) => {
    let commercial =
      parseInt(values.price) * (parseInt(values.percentage) / 100)
    setSupplierTable({
      services: [
        ...supplierTable.services,
        {
          key: Math.random() * 100,
          ...values,
          percentage: values.percentage,
          price: values.price,
          bonus: bonus ? 1 : 0,
          commercial: bonus ? Number(commercial) + 1000 : commercial,
        },
      ],
    })
    setBonus(false)
    form.resetFields()
  }

  const handleSave = async () => {
    if (supplierTable.services.length === 0) {
      message.error('ကျေးဇူးပြု၍ဝန်ဆောင်မှုအချက်အလက်များထည့်ပါ')
    } else {
      await saveServices(supplierTable)
      setSupplierTable([])
    }
  }

  const handleDelete = (record) => {
    const filterSuppliers = supplierTable.services.filter(
      (supplier) => supplier.key !== record.key,
    )
    setSupplierTable({
      services: [...filterSuppliers],
    })
  }

  const columns = [
    {
      title: 'ကုတ်',
      dataIndex: 'code',
    },

    {
      title: 'အမျိုးအစား',
      dataIndex: 'category',
    },
    {
      title: 'ကျသင့်ငွေ',
      dataIndex: 'price',
    },
    {
      title: 'အပိုဆုကြေး',
      dataIndex: 'bonus',
      render: (bonus) => (bonus ? 'ပေး' : 'မပေး'),
    },
    {
      title: 'ရာခိုင်နှုန်း',
      dataIndex: 'percentage',
    },
    {
      title: 'ကော်မရှင်',
      dataIndex: 'commercial',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: 'center' }} level={3}>
            ဝန်ဆောင်မှုအချက်အလက်သွင်းရန်စာမျက်နှာ
          </Title>
          <Form
            colon={false}
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
            {/* <Form.Item
            name="commercial"
            label="ကော်မရှင်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကော်မရှင်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကော်မရှင်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
              value={2000}
            />
          </Form.Item> */}
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '10px',
                }}
                size="large"
                htmlType="submit"
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Form.Item>
          </Form>
          <Table
            bordered
            columns={columns}
            dataSource={supplierTable.services}
            pagination={{ position: ['none', 'none'] }}
          />
          <Space
            direction="horizontal"
            style={{ width: '100%', justifyContent: 'right' }}
          >
            <Button
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white-color)',
                borderRadius: '10px',
              }}
              size="large"
              onClick={handleSave}
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Space>
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, { getServices, saveServices })(CreateService)
