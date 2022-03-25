import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button, InputNumber } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const EditOwners = () => {
  const { id } = useParams();
  const owners = useSelector((state) => state.OwnerReducer);
  const currentOwner = owners.find((owner) => owner.id === parseInt(id));
  useEffect(() => {
    if (currentOwner) {
      form.setFieldsValue({ item_name: currentOwner.item_name });
      form.setFieldsValue({ item_code: currentOwner.item_code });
      form.setFieldsValue({ item_total: currentOwner.item_total });
    }
  }, [currentOwner]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const data = {
      id: parseInt(id),
      key: parseInt(id),
      ...values
    };
    dispatch({ type: "UPDATE_OWNERS", payload: data });
    // console.log("data", data);
    form.resetFields();
    navigate("/admin/show-owner");
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်းစာမျက်နှာ {id}
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

export default EditOwners;
