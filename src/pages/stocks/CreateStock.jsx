import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  Table,
  Row,
  Col,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getMerchants,
  getItems,
  savePurchases,
  saveStocks
} from "../../store/actions";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { successCreateMessage } from "../../util/messages";

const { Title, Text } = Typography;
const { Option } = Select;

const CreateStock = ({ item, getMerchants, getItems, saveStocks }) => {
  const [buys, setBuys] = useState([]);
  const [dataMerchant, setDataMerchant] = useState([]);
  const allItems = item.items;
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [buyMerchant, setBuyMerchant] = useState(null);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      await getMerchants();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMerchants]);

  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
      setDataMerchant([]);
      setBuyMerchant([]);
      // navigate("/admin/show-stocks");
    }

    return () => status.success;
  }, [status.success]);

  const now = new Date();
  const date = dateFormat(now, "yyyy-mm-dd");

  const onFinish = (values) => {
    const data = allItems.find((item) => item.id == values.item_id);
    setBuys([
      ...buys,
      {
        ...values,
        key: buys.length + 1,
        shop_id: user.shop.id
      }
    ]);
    setDataMerchant([
      ...dataMerchant,
      {
        ...values,
        item_id: data.id,
        item_name: data.name,
        subtotal: values.quantity * data?.sale_price,
        key: buys.length + 1,
        data: date
      }
    ]);
    form.resetFields();
  };

  const handleDelete = (record) => {
    const filterMerchant = dataMerchant.filter((f) => f.key !== record.key);
    setDataMerchant(filterMerchant);
    setBuys(filterMerchant);
  };

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Saved Your Data",
  //     description: "Your data have been saved.",
  //     duration: 3
  //   });
  // };

  const handleSave = async () => {
    // if (buyMerchant === null) {
    //   message.error("ကျေးဇူးပြု၍ ကုန်သည်အချက်အလက်ထည့်ပါ");
    // } else

    // if (buys.length === 0) {
    //   message.error("ကျေးဇူးပြု၍ ဝယ်ရန်ထည့်ပါ");
    // } else if (paid === null) {
    //   message.error("ကျေးဇူးပြု၍ ပေးငွေထည့်ပါ");
    // } else {

    if (buys.length === 0) {
      message.error("ကျေးဇူးပြု၍ ဝယ်ရန်ထည့်ပါ");
    } else {
      const stocksAll = buys.map((buy) => {
        return {
          item_id: buy.item_id,
          quantity: buy.quantity,
          shop_id: buy.shop_id
        };
      });

      const saveBuy = {
        stocks: stocksAll
      };
      await saveStocks(saveBuy);
    }
  };

  const handleChange = (item) => {
    // console.log(item.id);
  };

  const onChange = (value) => {
    if (value === undefined) {
      setBuyMerchant(null);
    } else {
      const filterBuyMerchant = allItems.find((mer) => mer.id === value);
      setBuyMerchant(filterBuyMerchant);
    }
  };


  const columns = [
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_id",
      render: (_, record) => record.item_name
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            Stock စာရင်းသွင်းရန်
          </Title>
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px"
            }}
            size="large"
          ></Space>
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "center" }}
            size="large"
          ></Space>
          <Form
            colon={false}
            labelCol={{
              xl: {
                span: 3
              }
            }}
            wrapperCol={{
              span: 24
            }}
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="item_id"
              label="ပစ္စည်း"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                }
              ]}
            >
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
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
                {allItems.map((item) => (
                  <Option
                    key={item.id}
                    value={item.id}
                    onChange={(item) => handleChange(item)}
                  >
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="quantity"
              label="အရေအတွက်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ"
                }
              ]}
            >
              <InputNumber
                placeholder="အရေအတွက်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px", width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "center" }}
              size="large"
            >
              <Title level={4}>စျေးနှုန်း - </Title>
              <Title level={4}>
                {buyMerchant === null ? "0" : buyMerchant.sale_price} Ks
              </Title>
            </Space>

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white-color)",
                  borderRadius: "10px"
                }}
                size="large"
                htmlType="submit"
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Form.Item>
          </Form>
          <Table
            bordered
            columns={columns}
            dataSource={dataMerchant}
            pagination={{ position: ["none", "none"] }}
          />
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "right" }}
          >
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px"
              }}
              size="large"
              onClick={handleSave}
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Space>
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  item: store.item
});

export default connect(mapStateToProps, {
  getMerchants,
  getItems,
  savePurchases,
  saveStocks
})(CreateStock);
