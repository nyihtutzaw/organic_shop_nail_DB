import React, { useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getStocks, getShops, deleteStocks } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import { successDeleteMessage } from "../../util/messages";

const { Title } = Typography;

const ShowStocks = ({ stock, getStocks, getShops, deleteStocks }) => {
  const navigate = useNavigate();
  const stockAll = stock.stocks;
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
    Name: stock.item.name
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
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks, getShops]);

  const handleDelete = async (record) => {
    await deleteStocks(record.id);
  };

  const handleClick = async (record) => {
    navigate(`/admin/edit-stocks/${record.id}`);
  };


  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "item",
      render: (_, record) => (
        <img src={record.item.image} alt="ပစ္စည်းပုံ" width={80} height={80} />
      )
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.code}</span>;
        else return <span>{record.item.code}</span>;
      }
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.name}</span>;
        else return <span>{record.item.name}</span>;
      }
    },

    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.buy_price}</span>;
        else return <span>{record.item.buy_price}</span>;
      }
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.sale_price}</span>;
        else return <span>{record.item.sale_price}</span>;
      }
    },
    {
      title: "အရေအတွက်",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color : "red" }}>{record.quantity}</span>;
        else return <span>{record.quantity}</span>;
      }
    },
    {
      title: "ဆိုင်အမည်",
      render: (_, record) => record?.shop?.name
    }
  ];
  if(user?.position === "owner"){
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
        )
      },
      {
        title: "ပစ္စည်းကုတ်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.code}</span>;
          else return <span>{record.item.code}</span>;
        }
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.name}</span>;
          else return <span>{record.item.name}</span>;
        }
      },
      // {
      //   title: "ဝယ်ဈေး",
      //   dataIndex: "buy_price",
      //   render: (_, record) => {
      //     if (record.quantity < 10)
      //       return (
      //         <span style={{ color: "red" }}>{record.item.buy_price}</span>
      //       );
      //     else return <span>{record.item.buy_price}</span>;
      //   }
      // },
      {
        title: "ရောင်းဈေး",
        dataIndex: "sale_price",
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: "red" }}>{record.item.sale_price}</span>
            );
          else return <span>{record.item.sale_price}</span>;
        }
      },
      {
        title: "အရေအတွက်",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.quantity}</span>;
          else return <span>{record.quantity}</span>;
        }
      },
      {
        title: "ဆိုင်အမည်",
        render: (_, record) => {
          const getShopps = shopAll.find(
            (s) => s.id === Number(record?.shop_id)
          );
          return getShopps?.name;
        }
      }
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
        )
      },
      {
        title: "ပစ္စည်းကုတ်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.code}</span>;
          else return <span>{record.item.code}</span>;
        }
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "item",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.item.name}</span>;
          else return <span>{record.item.name}</span>;
        }
      },
      // {
      //   title: "ဝယ်ဈေး",
      //   dataIndex: "buy_price",
      //   render: (_, record) => {
      //     if (record.quantity < 10)
      //       return <span style={{ color: "red" }}>{record.item.buy_price}</span>;
      //     else return <span>{record.item.buy_price}</span>;
      //   }
      // },
      {
        title: "ရောင်းဈေး",
        dataIndex: "sale_price",
        render: (_, record) => {
          if (record.quantity < 10)
            return (
              <span style={{ color: "red" }}>{record.item.sale_price}</span>
            );
          else return <span>{record.item.sale_price}</span>;
        }
      },
      {
        title: "အရေအတွက်",
        render: (_, record) => {
          if (record.quantity < 10)
            return <span style={{ color: "red" }}>{record.quantity}</span>;
          else return <span>{record.quantity}</span>;
        }
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
        )
      }
    ];
  }

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Title level={3}>Stock စာရင်း</Title>
            </Col>
            <Col span={4}>
              {user?.position !== "owner" && (
                <Button
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--white-color)",
                    borderRadius: "5px"
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
          <Table
            bordered
            columns={columns}
            dataSource={stockAll}
            pagination={{ defaultPageSize: 6 }}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock
});

export default connect(mapStateToProps, { getStocks, getShops, deleteStocks })(
  ShowStocks
);
