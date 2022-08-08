import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  notification,
  message,
  Spin,
  Select
} from "antd";
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
import { successDeleteMessage } from "../../util/messages";

const { Title } = Typography;
const { Option } = Select;

const ShowItems = ({ item, getItems, deleteItems, editItems, getItem }) => {
  const allItems = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  // console.log("ii", allItems);
  const fileName = "Items"; // here enter filename for your excel file
  const result = allItems.map((item) => ({
    Id: item.id,
    uuid: item.uuid,
    Code: item.code,
    Name: item.name,
    Image: item.image,
    Buy_Price: item.buy_price,
    Sale_Price: item.sale_price,
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

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Deleted Your Data",
  //     description: "Your data have been deleted.",
  //     duration: 3
  //   });
  // };

  // const itemsUnique = [];
  // stockAll.forEach((i) => itemsUnique.push(i?.item?.name));
  // let unique = [...new Set(itemsUnique)];
  // console.log("uu", unique);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(allItems);
    } else {
      const filterBuyMerchant = allItems.filter((mer) => mer.name === value);
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

  const handleDelete = async (record) => {
    await deleteItems(record.id);
  };

  let columns = [];
  if (user?.position === "owner") {
    columns = [
      {
        title: "ပစ္စည်းပုံ",
        dataIndex: "image",
        render: (_, record) => (
          <img src={record.image} alt="ပစ္စည်းပုံ" width={70} height={70} />
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
        title: "လက်လီရောင်းဈေး",
        dataIndex: "sale_price"
      },
      {
        title: "လက်ကားရောင်းဈေး",
        dataIndex: "wholesale_price"
      },
      {
        title: "Actions",
        dataIndex: "action",
        render: (_, record) => (
          <Space direction="horizontal">
            {user?.position !== "owner" && (
              <Button type="primary" onClick={() => handleClick(record)}>
                <EditOutlined />
              </Button>
            )}
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              <DeleteOutlined />
            </Button>
          </Space>
        )
      }
    ];
  } else {
    columns = [
      {
        title: "ပစ္စည်းပုံ",
        dataIndex: "image",
        render: (_, record) => (
          <img src={record.image} alt="ပစ္စည်းပုံ" width={70} height={70} />
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
      // {
      //   title: "ဝယ်ဈေး",
      //   dataIndex: "buy_price"
      // },
      {
        title: "လက်လီရောင်းဈေး",
        dataIndex: "sale_price"
      },
      {
        title: "လက်ကားရောင်းဈေး",
        dataIndex: "wholesale_price"
      },
      {
        title: "Actions",
        dataIndex: "action",
        render: (_, record) => (
          <Space direction="horizontal">
            {user?.position !== "owner" && (
              <Button type="primary" onClick={() => handleClick(record)}>
                <EditOutlined />
              </Button>
            )}
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
            <Col span={10}>
              <Title level={3}>ပစ္စည်းစာရင်း</Title>
            </Col>
            <Col span={6}>
              {/* <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  marginBottom: "10px"
                }}
                size="large"
              > */}
                {/* <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text> */}
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                  size="large"
                  style={{ borderRadius: "10px" }}
                >
                  {allItems.map((item) => (
                    <Option key={Math.random() * 100} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              {/* </Space> */}
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
                  onClick={() => navigate("/admin/create-items")}
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
            pagination={{ defaultPageSize: 10 }}
            dataSource={showBuyMerchant != null ? showBuyMerchant : allItems}
            // size="small"
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  item: store.item
});

export default connect(mapStateToProps, { getItems, deleteItems, getItem })(
  ShowItems
);
