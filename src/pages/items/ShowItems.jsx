import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getItems, deleteItems, getItem } from "../../store/actions";
import { ExportToExcel } from "../../excel/ExportToExcel";

const { Title } = Typography;

const ShowItems = ({ item, getItems, deleteItems, editItems, getItem }) => {
  const allItems = useSelector((state) => state.item.items);
  // console.log(allItems)
  const fileName = "Items"; // here enter filename for your excel file
  const result = allItems.map((item) => ({
    Name: item.name,
    Code: item.code,
    Buy_Price: item.buy_price,
    Sale_Price: item.sale_price,
    key: item.id
  }));

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  const handleClick = async (record) => {
    await getItem(record.id);
    navigate(`/admin/edit-items/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Deleted Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };
  const handleDelete = async (record) => {
    await deleteItems(record.id);
    openNotificationWithIcon("error");
  };

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "image",
      render: (_, record) => (
        <img src={record.image} alt="ပစ္စည်းပုံ" width={80} height={80} />
      )
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "code"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "name"
    },
    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price"
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price"
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ပစ္စည်းစာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-items")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Col>
          <Col span={4}>
            <ExportToExcel apiData={result} fileName={fileName} />
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={item.items}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  item: store.item
});

export default connect(mapStateToProps, { getItems, deleteItems, getItem })(
  ShowItems
);
