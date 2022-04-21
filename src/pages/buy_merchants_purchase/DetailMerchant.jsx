import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getPurchase } from "../../store/actions";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";

const { Title, Text } = Typography;

const DetailMerchant = ({ getPurchase }) => {
  const navigate = useNavigate();
  const allPurchase = useSelector(
    (state) => state.purchase.purchase.purchase_items
  );
  const result = allPurchase?.map((p) => ({
    name: p.item.name,
    quantity: p.quantity,
    key: p.id,
    date: p.created_at
  }));
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase]);

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: `created_at`,
      render: (_, record) => getReadableDateDisplay(record.date)
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: `created_at`,
      render: (_, record) => record?.name
    },
    {
      title: "အရေအတွက်",
      dataIndex: `created_at`,
      render: (_, record) => record.quantity
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>အဝယ်စာရင်း</Title>
          </Col>
          <Col span={4}></Col>

          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/show-buy-merchants")}
            >
              {/* <PlusSquareOutlined /> */}
              ပြန်သွားရန်
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={15}></Col>
          <Col span={9}></Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getPurchase
})(DetailMerchant);
