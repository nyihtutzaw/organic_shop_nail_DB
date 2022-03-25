import React, { useState } from "react";
import { Form, Input, Typography, Space, Button, InputNumber } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";

const { Title, Text } = Typography;

const CreateOwners = () => {
  const owners = useSelector((state) => state.OwnerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const now = new Date();
  const date = dateFormat(now, "mm/dd/yyyy");
  const onFinish = (values) => {
   
    const data = {
      date: date,
      id: owners[owners.length - 1].id + 1,
      key: owners[owners.length - 1].id + 1,
      ...values
    };
    dispatch({ type: "ADD_OWNERS", payload: data });
    form.resetFields();
    navigate("/admin/show-owner");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်းစာမျက်နှာ
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
          <Space
            direction="vertical"
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: "10px"
            }}
          ></Space>
          <Form.Item
            name="item_code"
            label="ပစ္စည်းကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်ထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="ပစ္စည်းကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
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
            name="item_total"
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
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default CreateOwners;
