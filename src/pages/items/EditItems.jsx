import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Table,
  InputNumber,
  message,
  Image
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { connect, useSelector } from "react-redux";
import { editItems } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

const EditItems = ({ editItems }) => {
  
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const allItems = useSelector((state) => state.item.items);
  const currentItem = allItems.find((item) => item.id === parseInt(id));
  // console.log(currentItem)

  useEffect(() => {
    if (currentItem) {
      form.setFieldsValue({ code: currentItem.code });
      form.setFieldsValue({ name: currentItem.name });
      form.setFieldsValue({ buy_price: currentItem.buy_price });
      form.setFieldsValue({ sale_price: currentItem.sale_price });
      setFileList([
        {
          uid: currentItem.image.uid,
          name: currentItem.image.name,
          status: "done",
          url: currentItem.image
        }
      ]);
    }
  }, [currentItem]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("name", values.name);
    formData.append("buy_price", values.buy_price);
    formData.append("sale_price", values.sale_price);
    if (fileList[0].status !== "done") {
      formData.append("image", fileList[0].originFileObj);
    }
    await editItems(id, formData);
    navigate('/admin/show-items')
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ပစ္စည်းအချက်အလက်သွင်းရန်စာမျက်နှာ Edit
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
          >
            <InputUpload
              src={fileList}
              fileList={fileList}
              setFileList={setFileList}
            />
            <Text type="secondary">ကျေးဇူးပြု၍ပစ္စည်းပုံထည့်ပါ</Text>
            {/* <Image
              width={200}
              src={fileList}
            /> */}
          </Space>
          <Form.Item
            name="code"
            label="ပစ္စည်းကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ပစ္စည်းကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="name"
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
            name="buy_price"
            label="ဝယ်ဈေး"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဝယ်ဈေးထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဝယ်ဈေးထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="sale_price"
            label="ရောင်းဈေး"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ရောင်းဈေးထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ရောင်းဈေးထည့်ပါ"
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

export default connect(null, { editItems })(EditItems);
