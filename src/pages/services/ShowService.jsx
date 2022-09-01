import React, { useEffect, useRef, useState } from 'react'
import { Typography, Space, Row, Col, Button, Table, Spin, message } from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getServices, deleteServices, getService } from '../../store/actions'
import { connect } from 'react-redux'
import { notification } from 'antd'
import { ExportToExcel } from '../../excel/ExportToExcel'
import { successDeleteMessage } from '../../util/messages'

const { Title } = Typography

const ShowService = ({ getServices, deleteServices, getService }) => {
  const allServices = useSelector((state) => state.service.services)
  const user = useSelector((state) => state.auth.user)
  const status = useSelector((state) => state.status)
  const error = useSelector((state) => state.error)

  const fileName = 'Services' // here enter filename for your excel file
  const result = allServices.map((service) => ({
    Code: service.code,
    Commercial: service.commercial,
    Category: service.category,
    Percentage: service.percentage,
    Price: service.price,
    key: service.id,
  }))

  const navigate = useNavigate()

  const mountedRef = React.useRef(true)
  const getShopYearly = async () => {
    if (!mountedRef.current) return null
    try {
      const response = await getServices()
      const result = response.data
      // setGetData(result);
    } catch (error) {
      // console.log(error.response);
    }
  }

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

  React.useEffect(() => {
    getShopYearly()
    return () => {
      mountedRef.current = false
    }
  }, [])

  const handleClick = async (record) => {
    await getService(record.id)
    navigate(`/admin/edit-service/${record.id}`)
  }

  const handleDelete = async (record) => {
    await deleteServices(record.id)
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
      render: (bonus) => (bonus === "1" ? 'ပေး' : 'မပေး'),
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
        <Space direction="horizontal">
          {user?.position !== 'owner' && (
            <Button type="primary" onClick={() => handleClick(record)}>
              <EditOutlined />
            </Button>
          )}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Title level={3}>ဝန်ဆောင်မှုစာရင်း</Title>
            </Col>
            <Col span={4}>
              {user?.position !== 'owner' && (
                <Button
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--white-color)',
                    borderRadius: '5px',
                  }}
                  size="middle"
                  onClick={() => navigate('/admin/create-service')}
                >
                  <PlusSquareOutlined />
                  အသစ်ထည့်မည်
                </Button>
              )}
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={allServices}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

const mapStateToProps = (store) => ({
  service: store.service,
})

export default connect(mapStateToProps, {
  getServices,
  deleteServices,
  getService,
})(ShowService)
