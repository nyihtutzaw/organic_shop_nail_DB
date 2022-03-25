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
  Row,
  Col,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { getMerchants } from "../../store/actions";

const CreateBadItem = ({ merchant, getMerchants }) => {
  const { Title, Text } = Typography;
  const { Option } = Select;

  const [buys, setBuys] = useState([]);
  const [credit, setCredit] = useState(0);
  const [paid, setPaid] = useState(null);
  const [buyMerchant, setBuyMerchant] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      //   await getMerchants();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMerchants]);

  const onFinish = (values) => {
    setBuys([
      ...buys,
      {
        ...values,
        subtotal: values.quantity * values.price,
        key: buys.length + 1
      }
    ]);
    form.resetFields();
  };

  const onChange = (value) => {
    if (value === undefined) {
      setBuyMerchant(null);
    } else {
      //   const filterBuyMerchant = merchant.merchants.find(
      //     (mer) => mer.id === value
      //   );
      //   setBuyMerchant(filterBuyMerchant);
    }
  };

  const handleDelete = (record) => {
    const filterBuys = buys.filter((buy) => buy !== record);
    setBuys(filterBuys);
  };

  const handleSave = () => {
    if (buyMerchant === null) {
      message.error("ကျေးဇူးပြု၍ ကုန်သည်အချက်အလက်ထည့်ပါ");
    } else if (buys.length === 0) {
      message.error("ကျေးဇူးပြု၍ ဝယ်ရန်ထည့်ပါ");
    } else if (paid === null) {
      message.error("ကျေးဇူးပြု၍ ပေးငွေထည့်ပါ");
    } else {
      const singleBuys = buys.map((buy) => {
        return {
          item_name: buy.item_name,
          quantity: buy.quantity,
          price: buy.price,
          subtotal: buy.subtotal
        };
      });

      const saveBuy = {
        single_buys: singleBuys,
        merchant: buyMerchant.id,
        paid: paid,
        credit: credit
      };

      console.log(saveBuy);
    }
  };

  const buyTotal =
    buys.length > 0
      ? buys.map((buy) => buy.subtotal).reduce((a, b) => a + b)
      : 0;

  const handlePayment = (value) => {
    setCredit(buyTotal - value);
    setPaid(value);
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်/ကုတ်",
      dataIndex: "item_name"
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
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ချို့ယွင်းချက်ရှိပစ္စည်းများ
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
        </Space>

        <Form
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
            name="item_name"
            label="ပစ္စည်းကုတ်/အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ရွေးပါ"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {/* {merchant.merchants.map((mer) => (
              <Option key={mer.id} value={mer.id}>
                {mer.name}
              </Option>
            ))} */}
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
              အသစ်ထည့်မည်
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          columns={columns}
          dataSource={buys}
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
  );
};

export default CreateBadItem;
