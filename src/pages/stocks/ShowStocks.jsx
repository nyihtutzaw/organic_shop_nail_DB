import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStocks, deleteServices } from "../../store/actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const { Title } = Typography;

const ShowStocks = ({ stock, getStocks }) => {
  const stockAll = stock.stocks;
  const result = stockAll.map((data) => ({
    ...data,
    name: data.item.name,
    code:  data.item.name,
    buy_price:  data.item.buy_price,
    sale_price:  data.item.sale_price,
  }));


  const navigate = useNavigate();
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
      render: (_, record) => (
        <img src={record.item.image} alt="ပစ္စည်းပုံ" width={50} height={50} />
      )
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
    // {
    //   title: "Actions",
    //   dataIndex: "action",
    //   render: (_) => (
    //     <Space direction="horizontal">
    //       <Button type="primary">Edit</Button>
    //       <Button type="primary" danger>
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>Stock စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => navigate("/admin/create-buy-merchants")}
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
              <ExcelSheet data={result}   name="Stocks">
                <ExcelColumn label="Buy_price" value="buy_price" />
                <ExcelColumn label="Sale_price" value="sale_price" />
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Code" value="code" />
                <ExcelColumn label="Quantity" value="quantity" />
              </ExcelSheet>
            </ExcelFile>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={stockAll}
          pagination={{ defaultPageSize: 6 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock,
});

export default connect(mapStateToProps, { getStocks })(ShowStocks);
