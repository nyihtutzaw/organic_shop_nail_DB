import React from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ShowItemChangeList = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ဘောင်ချာနံပါတ်",
      dataIndex: "voucher_number"
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name"
    },

    {
      title: "	အရေအတွက်",
      dataIndex: "number"
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>ပစ္စည်းလဲခြင်း စာရင်း</Title>
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

export default ShowItemChangeList;
