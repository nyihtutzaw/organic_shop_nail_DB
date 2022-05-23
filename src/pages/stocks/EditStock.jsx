import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getMerchants,
  getItems,
  savePurchases,
  saveStocks,
  getStock,
  editStocks
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { successCreateMessage } from "../../util/messages";
import { successEditMessage } from "../../util/messages";

const { Title } = Typography;
const { Option } = Select;

const EditStock = ({
  item,
  getStock,
  editStocks,
  getMerchants,
  getItems,
  saveStocks
}) => {
  const param = useParams();
  const allItems = item.items;
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.status);

  const error = useSelector((state) => state.error);
  const stock = useSelector((state) => state.stock.stock);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await getStock(param?.id);
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStock]);

  useEffect(() => {
    form.setFieldsValue({ quantity: stock.quantity });
    form.setFieldsValue({ item_id: stock?.item?.id });
  }, [stock]);

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
      message.success(successEditMessage);
    }

    return () => status.success;
  }, [status.success]);

  const onFinish = async (values) => {
    await editStocks(param?.id, { ...values, shop_id: user.shop.id });
    navigate("/admin/show-stocks");
  };

  const handleChange = (item) => {
    // console.log(item.id);
  };

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
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "10px"
                }}
                size="large"
                htmlType="submit"
              >
                <PlusSquareOutlined />
                {/* အသစ်ထည့်မည် */}
                သိမ်းမည်
              </Button>
            </Form.Item>
          </Form>
          {/* <Space
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
          </Space> */}
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
  saveStocks,
  getStock,
  editStocks
})(EditStock);
