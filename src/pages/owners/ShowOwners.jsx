import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";

const { Title } = Typography;

const ShowOwners = () => {
  const owners = useSelector((state) => state.OwnerReducer);
  const now = new Date();
  const date = dateFormat(now, "mm/dd/yyyy");
  const result = owners.map((owner) => ({
    date: date,
    id: owner.id,
    key: owner.id,
    item_code: owner.item_code,
    item_name: owner.item_name,
    item_total: owner.item_total,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClick = (record) => {
    navigate(`/admin/edit-owner/${record.id}`);
  };

  const handleDelete = (record) => {
    dispatch({ type: "DELETE_OWNERS", payload:record.id})
  }

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name"
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item_code"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "item_total"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={()=> handleClick(record)}>Edit</Button>
          <Button type="primary" danger onClick={()=> handleDelete(record)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Title level={3}>လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်း စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-owner")}
            >
              <PlusSquareOutlined />
              New
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
            dataSource={result}
        />
      </Space>
    </Layout>
  );
};

export default ShowOwners;
