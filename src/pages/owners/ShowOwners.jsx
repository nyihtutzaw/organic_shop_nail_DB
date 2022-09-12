import React, { useEffect } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  message,
  Spin,
  Select,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getReadableDateDisplay } from '../../uitls/convertToHumanReadableTime'
import {
  saveOwners,
  getOwners,
  deleteOwners,
  getOwner,
  getItems,
} from '../../store/actions'
import { connect, useSelector } from 'react-redux'
import { successDeleteMessage } from '../../util/messages'
import { useState } from 'react'
import { GENERAL_MANAGER, OWNER } from '../../util/positions'

const { Title } = Typography
const { Option } = Select

const ShowOwners = ({ getOwners, deleteOwners, getOwner, getItems }) => {
  const [filterItems, setFilterItems] = useState(null)
  const allItems = useSelector((state) => state.item.items)
  const owners = useSelector((state) => state.owner.owners)
  const user = useSelector((state) => state.auth.user)
  const status = useSelector((state) => state.status)
  const error = useSelector((state) => state.error)

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

  useEffect(() => {
    const fetchData = async () => {
      await getOwners()
      await getItems()
    }
    fetchData()
    return () => {
      fetchData()
    }
  }, [getOwners, getItems])

  const navigate = useNavigate()

  const handleClick = async (id) => {
    await getOwner(id)
    navigate(`/admin/edit-owner/${id}`)
  }

  const handleDelete = async (record) => {
    await deleteOwners(record.id)
  }

  const handleFilter = (value) => {
    if (value === undefined) {
      setFilterItems(owners)
    } else {
      const filterItems = owners.filter(
        (owner) => owner.stock.item.id === value,
      )
      setFilterItems(filterItems)
    }
  }

  const columns = [
    {
      title: 'ရက်စွဲ',
      dataIndex: 'created_at',
      render: (_, record) => getReadableDateDisplay(record.created_at),
    },
    {
      title: 'ပစ္စည်းအမည်',
      dataIndex: 'name',
      render: (_, record) => record.stock?.item?.name,
    },
    {
      title: 'ပစ္စည်းကုတ်',
      dataIndex: 'code',
      render: (_, record) => record.stock?.item?.code,
    },
    {
      title: 'အရေအတွက်',
      dataIndex: 'quantity',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => (
        <Space direction="horizontal">
          {user?.position !== 'owner' && (
            <Button type="primary" onClick={() => handleClick(record.id)}>
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
            <Col span={20}>
              <Title level={3}>လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်း စာရင်း</Title>
            </Col>
            <Col span={3}>
              {user?.position !== OWNER && user?.position !== GENERAL_MANAGER && (
                <Button
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--white-color)',
                    borderRadius: '5px',
                  }}
                  size="middle"
                  onClick={() => navigate('/admin/create-owner')}
                >
                  <PlusSquareOutlined />
                  အသစ်ထည့်မည်
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={handleFilter}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
              >
                {allItems.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={filterItems === null ? owners : filterItems}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default connect(null, {
  saveOwners,
  getOwners,
  deleteOwners,
  getOwner,
  getItems,
})(ShowOwners)
