import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItemTransfers } from "../../store/actions";

const { Title } = Typography;

const ShowItemTransfer = ({ item_transfer, getItemTransfers}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getItemTransfers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItemTransfers]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Saved Your Data',
      description: 'Your data have been saved.',
      duration: 3
    });
  };
  
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "Date"
    },
    {
        title: "ဆိုင်အမည်",
        dataIndex: "store_name"
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
      dataIndex: "quantity"
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

  // console.log("first", item_transfer)
  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Title level={3}>လွှဲပြောင်းခဲ့သောပစ္စည်းများ</Title>
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
          dataSource={item_transfer.itemTransfers}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  item_transfer: store.item_transfer
});


export default connect(mapStateToProps, { getItemTransfers })(ShowItemTransfer);




