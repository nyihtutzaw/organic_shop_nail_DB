import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Table,
  message,
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { saveItemTransfers, getShops, getItems } from "../../store/actions";

const { Title, Text } = Typography;
const { Option } = Select;

const CreateItemTransfer = ({
  merchant,
  getShops,
  getItems,
  saveItemTransfers,
}) => {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  const [shopData, setShopData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [buyShop, setBuyShop] = useState(null);
  
  const shops = useSelector((state) => state.shop.shops);
  const AllItems = useSelector((state) => state.item.items);
  // console.log(AllItems);

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const onFinish = (values) => {
    setItems([...items, { ...values, Date: date, key: items.length + 1 }]);
    form.resetFields();

  };

  // console.log("first", items);

  const onChange = (value) => {
    if (value === undefined) {
      setBuyShop(null);
    } else {
      const filterShops = shops.find(
        (mer) => mer.id === value
      );
      setBuyShop(filterShops);
    }
  };

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းများထည့်ပါ");
    } else if (buyShop === null) {
      message.error("ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ");
    }else {
      const itemTransfer = items.map((item) => {
        return {
          stock_id: item.stock_id,
          quantity: item.quantity
        }
      });
      const saveItem = {
        item_transfers: itemTransfer,
        to_shop_id: buyShop.id
      }
      console.log(saveItem)
      await saveItemTransfers(saveItem);
      setItems([]);
    setBuyShop(null);

    }
    // console.log("first33", items);
  };

  const handleDelete = (record) => {
    console.log(record.key);
    const filter = items.filter((item) => item.key !== record.key)
    setItems(filter)
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "stock_id",
    },
    // {
    //   title: "ပစ္စည်:ကုတ်",
    //   dataIndex: "item_code",
    // },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
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
            marginBottom: "10px",
          }}
          size="large"
        >
          <Select
            name="select"
            showSearch
            placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear={true}
            size="large"
            style={{ borderRadius: "10px" }}
          >
            {shops.map((shop) => (
              <Option key={shop.id} value={shop.id}>
                {shop.name}
              </Option>
            ))}
          </Select>
        </Space>

        <Form
          labelCol={{
            xl: {
              span: 3,
            },
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
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
                message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {AllItems.map((item) => (
                <Option key={item.id} value={item.id}>
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
                message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ",
              },
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
                borderRadius: "10px",
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
              borderRadius: "10px",
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
  );
};

export default connect(null, { getShops, getItems, saveItemTransfers })(
  CreateItemTransfer
);
