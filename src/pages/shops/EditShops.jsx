import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editShops } from "../../store/actions";
import { connect } from "react-redux";

const { Title } = Typography;
const EditShops = ({ editShops }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const shops = useSelector((state) => state.shop.shops);
  const currentShop = shops.find((shop) => shop.id === parseInt(id));

  useEffect(() => {
    if (currentShop) {
      form.setFieldsValue({ name: currentShop.name });
    }
  }, [currentShop]);

  const onFinish = async (values) => {
    const data = {
      id: parseInt(id),
      key: parseInt(id),
      ...values,
    };
    await editShops(data);
    form.resetFields();
    navigate("/admin/show-shops");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ဆိုင်အမည် သွင်းခြင်း စာမျက်နှာ
        </Title>
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
            name="name"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ဆိုင်အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
              }}
              size="large"
              htmlType="submit"
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default connect(null, { editShops })(EditShops);
