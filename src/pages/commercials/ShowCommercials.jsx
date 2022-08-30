import React, { useEffect } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  message,
  Popconfirm,
  Spin,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { PlusSquareOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCommercials, deleteCommercial } from '../../store/actions'
import { successDeleteMessage } from '../../util/messages'

const { Title } = Typography

const ShowCommercials = ({
  status,
  error,
  commercial,
  getCommercials,
  deleteCommercial,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    getCommercials()

    return () => getCommercials()
  }, [getCommercials])

  useEffect(() => {
    error.message !== null && message.error(error.message)

    return () => error.message
  }, [error.message])

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage)
    }

    return () => status.success
  }, [status.success])

  const handleDelete = async (id) => {
    await deleteCommercial(id)
  }

  const columns = [
    {
      title: 'ဝန်ထမ်းအမည်',
      dataIndex: 'staff.name',
      render: (_, record) => record.staff.name,
    },
    {
      title: 'လ',
      dataIndex: 'month',
    },
    {
      title: 'နှစ်',
      dataIndex: 'year',
    },
    {
      title: 'ပမာဏ',
      dataIndex: 'amount',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (id) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            onClick={() => navigate(`/admin/edit-commercials/${id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="ဖျက်မှာ သေချာပြီလား"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 18 }}>
              <Title level={3}>ကော်မရှင်စာရင်း</Title>
            </Col>
            <Col xl={{ span: 3 }}>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '5px',
                }}
                size="middle"
                onClick={() => navigate('/admin/create-commercials')}
              >
                <PlusSquareOutlined />
                New
              </Button>
            </Col>
            <Col xl={{ span: 3 }}>
              {/* <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px",
                }}
                size="middle"
              >
                <ExportOutlined />
                Export
              </Button> */}
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={commercial.commercials}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  status: store.status,
  error: store.error,
  commercial: store.commercial,
})

export default connect(mapStateToProps, { getCommercials, deleteCommercial })(
  ShowCommercials,
)
