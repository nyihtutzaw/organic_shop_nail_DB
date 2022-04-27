import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
<<<<<<< HEAD
  message,
  Spin
=======
  InputNumber,
  Select,
  notification
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { saveMembers, getShops, clearAlertMember } from "../../store/actions";
import { connect } from "react-redux";
import store from "../../store";
import { successCreateMessage } from "../../util/messages";


const { Title } = Typography;

<<<<<<< HEAD
const CreateMembers = ({ saveMembers, getShops, clearAlertMember }) => {
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  const [form] = Form.useForm();
  useEffect(() => {
    store.dispatch(clearAlertMember());
  }, []);
=======
const CreateMembers = ({ shop, saveMembers, getShops }) => {
  const shops = useSelector((state) => state.shop.shops);
  const navigate = useNavigate();
  const [form] = Form.useForm();
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

<<<<<<< HEAD

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }

    return () => status.success;
  }, [status.success]);


  const onFinish = async (values) => {
    await saveMembers(values);
    form.resetFields();
=======
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Saved Your Data",
      description: "Your data have been saved.",
      duration: 3
    });
  };
  const onFinish = async (values) => {
    await saveMembers(values);
    form.resetFields();
    openNotificationWithIcon("success");
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  };

  //for barcode
  const [barcodeInputValue, updateBarcodeInputValue] = useState("");
  const onChangeBarcode = (event) => {
    updateBarcodeInputValue(event.target.value);
  };

  
  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          Member စာရင်းသွင်းခြင်း စာမျက်နှာ
        </Title>
        <Form
<<<<<<< HEAD
          colon={false}
=======
        colon={false}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
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
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  shop: store.shop
});

<<<<<<< HEAD
export default connect(mapStateToProps, {
  saveMembers,
  getShops,
  clearAlertMember
})(CreateMembers);
=======
export default connect(mapStateToProps, { saveMembers, getShops })(
  CreateMembers
);
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
