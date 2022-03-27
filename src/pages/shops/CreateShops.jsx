import React, { useEffect, useState } from "react";
import { Form, Input, Typography, Space, Button, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { saveShops } from "../../store/actions";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;


const CreateShops = ({saveShops}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Save Your Data',
      description: 'Your data have been saved.',
      duration: 3
    });
  };

  const onFinish = async (values) => {
    await saveShops(values)
    form.resetFields();
    openNotificationWithIcon('success')
    // navigate("/admin/show-shops")
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
            name="name"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ"
              }
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
                borderRadius: "10px"
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

export default connect(null, { saveShops })(CreateShops);
