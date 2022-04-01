import React, { useState } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  ExportOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../store/actions";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const { Title } = Typography;

const ShowAccounts = () => {
  const [getData, setGetData] = useState([]);

  const accounts = useSelector((state) => state.account.accounts);
  console.log(accounts);

  const result = accounts.map((data) => ({
    ...data,
    shop: data.shop.name
  }));

  console.log(result)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (record) => {};

  const handleDelete = (record) => {};

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [getAccounts]);

  const columns = [
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ရာထူး",
      dataIndex: "position"
    },
    {
      title: "ဆိုင်အမည်",
      dataIndex: "shop",
      render: (_, data) => data.shop.name
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
            <Title level={3}>အကောင့်စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-accounts")}
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
              <ExcelSheet data={result} name="Accounts">
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Phone" value="phone" />
                <ExcelColumn label="Position" value="position" />
                <ExcelColumn label="Shop" value="shop" />
              </ExcelSheet>
            </ExcelFile>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={accounts}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default ShowAccounts;
