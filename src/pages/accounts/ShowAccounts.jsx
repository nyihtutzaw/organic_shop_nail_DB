import React from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const ShowAccounts = () => {
  const accounts = useSelector((state) => state.AccountReducer);
  // console.log("accounts", accounts);
  // const result = accounts.map((account) => ({
  //   id: account.id,
  //   key: account.id,
  //   row: account.row,
  //   name: account.name,
  //   shop: account.shop
  // }));

  // console.log("result", result);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (record) => {
    // console.log("record", record)
    navigate(`/admin/edit-accounts/${record.id}`);
  };

  const handleDelete = (record) => {
    dispatch({ type: "DELETE_ACCOUNTS", payload:record.id})
  }


  const columns = [
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ရာထူး",
      dataIndex: "row"
    },
    {
      title: "ဆိုင်အမည်",
      dataIndex: "shop"
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>Edit</Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
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
          <Col span={18}>
            <Title level={3}>အကောင့်စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-accounts")}
            >
              <PlusSquareOutlined />
              New
            </Button>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          // dataSource={result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default ShowAccounts;
