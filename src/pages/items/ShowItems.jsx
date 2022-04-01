import React, { useEffect, useState } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined,  DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getItems,deleteItems, editItems, getItem } from "../../store/actions";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const { Title } = Typography;

const ShowItems = ({ item, getItems, deleteItems, editItems, getItem }) => {
  const itemAll = useSelector((state) => state.item.items);

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
  
  const handleClick =async (record) => {
    await getItem(record.id)
    navigate(`/admin/edit-items/${record.id}`);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Deleted Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  const handleDelete = async (record) => {
    // console.log(record.id);
    await deleteItems(record.id);
    openNotificationWithIcon('error')
  };

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "image",
      render: (_, record) => (
        <img src={record.image} alt="ပစ္စည်းပုံ" width={100} height={100} />
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
          <EditOutlined/>
          </Button>
          <Button type="primary" danger 
          onClick={() => handleDelete(record)}
          >
            <DeleteOutlined/>
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
          <ExcelFile
              element={
                <button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)",
                    borderRadius: "5px"
                  }}
                >
                  <ExportOutlined />
                  စာရင်းထုတ်မည်
                </button>
              }
            >
              <ExcelSheet data={itemAll}  name="Items">
                <ExcelColumn label="Buy_price" value="buy_price" />
                <ExcelColumn label="Sale_price" value="sale_price" />
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Code" value="code" />
              </ExcelSheet>
            </ExcelFile>
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

export default connect(mapStateToProps, { getItems, deleteItems, getItem })(ShowItems);
