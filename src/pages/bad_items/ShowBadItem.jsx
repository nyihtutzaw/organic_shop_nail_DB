import React from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ShowBadItem = () => {
  const navigate = useNavigate();

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
      title: "	ပစ္စည်းကုတ်",
      dataIndex: "item_code"
    },
    {
      title: "	အရေအတွက်",
      dataIndex: "number"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
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
            <Title level={3}>ချို့ယွင်းချက်ရှိပစ္စည်:များစာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-bad-item")}
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
        />
      </Space>
    </Layout>
  );
};

export default ShowBadItem;
