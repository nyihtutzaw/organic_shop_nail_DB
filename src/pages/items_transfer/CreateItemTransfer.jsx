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
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { saveItemTransfers } from "../../store/actions";

const { Title, Text } = Typography;
const { Option } = Select;

const CreateItemTransfer = ({ merchant, saveItemTransfers }) => {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await saveItemTransfers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [saveItemTransfers]);

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

  console.log("first", items);

  const handleSave = async () => {
    if (items.length === 0) {
      message.error("ကျေးဇူးပြု၍ပစ္စည်းများထည့်ပါ");
    } else {
      await saveItemTransfers(items);
      setItems([]);
    }
    console.log("first33", items);
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name"
    },
    {
      title: "ပစ္စည်:ကုတ်",
      dataIndex: "item_code"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          // onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      )
    }
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
            marginBottom: "10px"
          }}
          size="large"
        >
          <Select
            name="select"
            showSearch
            placeholder="ကျေးဇူးပြု၍ ကုန်သည်အမည်ရွေးပါ"
            optionFilterProp="children"
            // onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear={true}
            size="large"
            style={{ borderRadius: "10px" }}
          >
            <Option value="hh">HH</Option>
            <Option value="jj">JJ</Option>
            {/* {merchant.merchants.map((mer) => (
              <Option key={mer.id} value={mer.id}>
                {mer.name}
              </Option>
            ))} */}
          </Select>
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
            label="ပစ္စည်းအမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ပစ္စည်းအမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="item_code"
            label="ပစ္စည်:ကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်:ကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ပစ္စည်:ကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
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
  );
};

export default connect(null, { saveItemTransfers })(CreateItemTransfer);
