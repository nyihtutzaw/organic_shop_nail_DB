import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Spin,
  message,
  Select,
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getStocks,
  getShops,
  deleteStocks,
  getItems,
} from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import { successDeleteMessage } from "../../util/messages";
import { GENERAL_MANAGER, OWNER } from "../../util/positions";

const { Title } = Typography;
const { Option } = Select;

const ShowStocks = ({ getStocks, getShops, deleteStocks, getItems }) => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.item.items);
  const stockAll = useSelector((state) => state.stock.stocks);
  const [stocks, setStocks] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const shopAll = useSelector((state) => state.shop.shops);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const fileName = "Stocks"; // here enter filename for your excel file
  const result = stockAll.map((stock) => ({
    Quantity: stock.quantity,
    Code: stock.item.code,
    Buy_Price: stock.item.buy_price,
    Sale_Price: stock.item.sale_price,
    Name: stock.item.name,
  }));

  useEffect(() => {
    error.message !== null && message.error(error.message);
    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage);
    }
    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
      await getShops();
      await getItems();
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks, getShops]);

  useEffect(() => {
    setStocks(stockAll);
  }, [stockAll, setStocks]);

  const handleDelete = async (record) => {
    await deleteStocks(record.id);
  };

  const handleClick = async (record) => {
    navigate(`/admin/edit-stocks/${record.id}`);
  };

  const onChange = (id) => {
    if (id === undefined) {
      setStocks(stockAll);
    } else {
      const filterStocks = stockAll.filter((stock) => stock.item.id === id);

      setStocks(filterStocks);
    }
  };

  const handleLessStock = () => {
    const filterStocks = stockAll.filter((stock) => stock.quantity < 10);

    setStocks(filterStocks);
  };

  let columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "item",
      render: (_, record) => (
        <img src={record.item.image} alt="ပစ္စည်းပုံ" width={80} height={80} />
      ),
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.code}</span>;
        else return <span>{record.item.code}</span>;
      },
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.name}</span>;
        else return <span>{record.item.name}</span>;
      },
    },

    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.buy_price}</span>;
        else return <span>{record.item.buy_price}</span>;
      },
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.sale_price}</span>;
        else return <span>{record.item.sale_price}</span>;
      },
    },
    {
      title: "အရေအတွက်",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.quantity}</span>;
        else return <span>{record.quantity}</span>;
      },
    },
    {
      title: "ဆိုင်အမည်",
      render: (_, record) => record?.shop?.name,
    },
  ];
  if (user?.position === OWNER) {
    columns = [
      {
        title: "ပစ္စည်းပုံ",
        dataIndex: "item",
        render: (_, record) => (
          <img
            src={record.item.image}
            alt="ပစ္စည်းပုံ"
            width={70}
            height={70}
          />
        ),
      },
      {
        title: "ပစ္စည်းကုတ်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.code}</span>;
          else return <span>{record.item.code}</span>;
        },
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.name}</span>;
          else return <span>{record.item.name}</span>;
        },
      },
      {
        title: "ဝယ်ဈေး",
        dataIndex: "buy_price",
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: "red" }}>{record.item.buy_price}</span>
            );
          else return <span>{record.item.buy_price}</span>;
        },
      },
      {
        title: "ရောင်းဈေး",
        dataIndex: "sale_price",
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: "red" }}>{record.item.sale_price}</span>
            );
          else return <span>{record.item.sale_price}</span>;
        },
      },
      {
        title: "အရေအတွက်",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.quantity}</span>;
          else return <span>{record.quantity}</span>;
        },
      },
      {
        title: "ဆိုင်အမည်",
        render: (_, record) => {
          const getShopps = shopAll.find(
            (s) => s.id === Number(record?.shop_id)
          );
          return getShopps?.name;
        },
      },
    ];
  } else {
    columns = [
      {
        title: "ပစ္စည်းပုံ",
        dataIndex: "item",
        render: (_, record) => (
          <img
            src={record.item.image}
            alt="ပစ္စည်းပုံ"
            width={70}
            height={70}
          />
        ),
      },
      {
        title: "ပစ္စည်းကုတ်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.code}</span>;
          else return <span>{record.item.code}</span>;
        },
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.name}</span>;
          else return <span>{record.item.name}</span>;
        },
      },
      {
        title: "ရောင်းဈေး",
        dataIndex: "sale_price",
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: "red" }}>{record.item.sale_price}</span>
            );
          else return <span>{record.item.sale_price}</span>;
        },
      },
      {
        title: "အရေအတွက်",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.quantity}</span>;
          else return <span>{record.quantity}</span>;
        },
      },
      {
        title: "Actions",
        dataIndex: "action",
        render: (_, record) => (
          <Space direction="horizontal">
            {/* {user?.position !== "owner" && ( */}
            <Button type="primary" onClick={() => handleClick(record)}>
              <EditOutlined />
            </Button>
            {/* )} */}
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        ),
      },
    ];
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Title level={3}>Stock စာရင်း</Title>
            </Col>
            <Col span={6}>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {items.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              {user?.position !== OWNER && user?.position !== GENERAL_MANAGER && (
                <Button
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--white-color)",
                    borderRadius: "5px",
                  }}
                  size="middle"
                  // onClick={() => navigate("/admin/create-buy-merchants")}
                  onClick={() => navigate("/admin/create-stocks")}
                >
                  <PlusSquareOutlined />
                  အသစ်ထည့်မည်
                </Button>
              )}
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px",
                }}
                size="middle"
                onClick={() => setStocks(stockAll)}
              >
                All
              </Button>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px",
                }}
                size="middle"
                onClick={handleLessStock}
              >
                လက်ကျန်နဲသော
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={stocks}
            pagination={{ defaultPageSize: 6 }}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock,
});

export default connect(mapStateToProps, {
  getStocks,
  getShops,
  deleteStocks,
  getItems,
})(ShowStocks);
