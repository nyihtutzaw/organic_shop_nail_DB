import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  Table,
  message,
  notification,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import {
  saveItemTransfers,
  getShops,
  getItems,
  getStocks
} from "../../store/actions";
import { successCreateMessage } from "../../util/messages";

const { Title } = Typography;
const { Option } = Select;

const CreateItemTransfer = ({
  merchant,
  getShops,
  getStocks,
  getItems,
  saveItemTransfers
}) => {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  const [buyShop, setBuyShop] = useState(null);
  // const [shoped, setShoped] = useState(null);
  // console.log(shoped);

  let shops = useSelector((state) => state.shop.shops);
  const user = useSelector((state) => state.auth.user);
  const stocks = useSelector((state) => state.stock.stocks);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }

    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
      await getStocks();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops, getStocks]);

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const onFinish = (values) => {
    const stock = stocks.find((stock) => stock.id === values.stock_id);
    const addedTransfer = items.find(
      (item) => item.stock_id === values.stock_id
    );

    if (addedTransfer === undefined) {
      if (stock.quantity >= values.quantity) {
        setItems([
          ...items,
          {
            ...values,
            Date: date,
            key: items.length + 1,
            name: stock.item.name
          }
        ]);
        form.resetFields();
      } else {
        message.error("လက်ကျန်အရေအတွက်ထက်များနေပါသည်။");
      }
    } else {
      message.error("ထည့်ပြီးသောပစ္စည်းဖြစ်နေပါသည်။");
    }
  };

  // const onChange = (value) => {
  //   if (value === undefined) {
  //     setBuyShop(null);
  //   } else {
  //     const filterShops = shops.find((mer) => mer.id === value);
  //     setBuyShop(filterShops);
  //   }
  // };

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းများထည့်ပါ");
    } else if (buyShop === null) {
      message.error("ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ");
    } else {
      const itemTransfer = items.map((item) => {
        return {
          stock_id: item.stock_id,
          quantity: item.quantity
        };
      });
      const saveItem = {
        item_transfers: itemTransfer,
        to_shop_id: buyShop
      };
      await saveItemTransfers(saveItem);
      setItems([]);
      setBuyShop(null);
    }
  };

  const handleDelete = (record) => {
    const filter = items.filter((item) => item.key !== record.key);
    setItems(filter);
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "name"
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
            ပစ္စည်းလွှဲပြောင်းရန်စာမျက်နှာ
          </Title>
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px"
            }}
            size="large"
          >
            <Select
              name="select"
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              optionFilterProp="children"
              // onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={buyShop}
              onChange={(value) => setBuyShop(value)}
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {shops.map((shop) => {
                if (shop.id !== parseInt(user?.shop?.id))
                  return (
                    <Option key={shop.id} value={shop.id}>
                      {shop.name}
                    </Option>
                  );
              })}
            </Select>
          </Space>

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
              name="stock_id"
              label="ပစ္စည်းအမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                }
              ]}
            >
              <Select
                name="name"
                // showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
                showSearch={true}
              >
                {stocks.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.item.name}
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
                လွှဲပြောင်းရန်
              </Button>
            </Form.Item>
          </Form>
          <Table
            bordered
            columns={columns}
            dataSource={items}
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

export default connect(null, {
  getShops,
  getItems,
  saveItemTransfers,
  getStocks
})(CreateItemTransfer);
