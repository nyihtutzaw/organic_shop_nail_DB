import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Select,
  notification,
  message,
  Alert
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { saveMembers, getShops, clearAlertMember } from "../../store/actions";
import { connect } from "react-redux";
import store from "../../store";

const { Title } = Typography;

const CreateMembers = ({ shop, saveMembers, getShops, clearAlertMember }) => {
  const member = useSelector((state) => state.member);
  const [form] = Form.useForm();

  useEffect(() => {
    store.dispatch(clearAlertMember());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

  const onFinish = async (values) => {
    await saveMembers(values);
    form.resetFields();
  };

  //for barcode
  const [barcodeInputValue, updateBarcodeInputValue] = useState("");
  const onChangeBarcode = (event) => {
    updateBarcodeInputValue(event.target.value);
  };

  return (
    <Layout style={{ margin: "20px" }}>
      {member.error.length > 0 ? (
        <Alert
          message="Errors"
          description={member.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {member.isSuccess && (
        <Alert message="Successfully Created" type="success" showIcon />
      )}
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          Member စာရင်းသွင်းခြင်း စာမျက်နှာ
        </Title>
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
            name="code"
            label="မန်ဘာကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ မန်ဘာကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              id="SearchbyScanning"
              className="SearchInput"
              value={barcodeInputValue}
              onChange={onChangeBarcode}
              placeholder="မန်ဘာကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="ဖုန်းနံပါတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="နေရပ်လိပ်စာ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ နေရပ်လိပ်စာထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="နေရပ်လိပ်စာထည့်ပါ"
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

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, {
  saveMembers,
  getShops,
  clearAlertMember
})(CreateMembers);
