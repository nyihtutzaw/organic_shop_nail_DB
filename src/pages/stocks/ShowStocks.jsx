import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStocks, deleteServices } from "../../store/actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const { Title } = Typography;

const ShowStocks = ({ stock, getStocks }) => {
  const navigate = useNavigate();
  const stockAll = stock.stocks;
  console.log(stockAll)
  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks]);

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "item",
      render: (_, record) => console.log("s",record),
      // <img
      //   src={record.item.image}
      //   alt="ပစ္စည်းပုံ"
      //   width={100}
      //   height={100}
      // />
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item",
      render: (_, record) => record.item.code,
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (_, record) => record.item.name,
    },

    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
      render: (_, record) => record.item.buy_price,

    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
      render: (_, record) => record.item.sale_price,

    },
    {
      title: "	အရေအတွက်",
      dataIndex: "quantity",
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
      ),
    },
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>Stock စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => navigate("/admin/create-stocks")}
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
                borderRadius: "5px",
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
          dataSource={stockAll}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock,
});

export default connect(mapStateToProps, { getStocks })(ShowStocks);
