import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  InputNumber,
  Select,
  Table,
  Col,
  Row
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { editMembers, getShops, shop } from "../../store/actions";

const { Title } = Typography;
const { Option } = Select;

const DetailMembers = ({ editMembers, getShops }) => {
  const { id } = useParams();
  const members = useSelector((state) => state.member.members);
  const currentMember = members.find((member) => member.id === parseInt(id));
  const currentId = parseInt(currentMember.shop_id);

  const shops = useSelector((state) => state.shop.shops);
  // console.log(shop)
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops]);

  useEffect(() => {
    if (currentMember) {
      form.setFieldsValue({ code: currentMember.code });
      form.setFieldsValue({ name: currentMember.name });
      form.setFieldsValue({ phone: currentMember.phone });
      form.setFieldsValue({ address: currentMember.address });
    }
  }, [currentMember]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await editMembers(id, values);
    form.resetFields();
    navigate("/admin/show-members");
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ဝယ်ယူခဲ့သောပမာဏ",
      dataIndex: "amount"
    },
    {
      title: "ပွိုင့်အရေအတွက်",
      dataIndex: "points"
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row>
        <Col span={12}>
          <Title style={{ textAlign: "center" }} level={3}>
            မန်ဘာအသေးစိတ်စာမျက်နှာ
          </Title>
        </Col>
        <Col span={8}></Col>
        <Col span={4}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
              borderRadius: "5px"
            }}
            size="middle"
            onClick={() => navigate("/admin/show-members")}
          >
            ပြန်သွားရန်
          </Button>
        </Col>
        </Row>
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
            ["shop_id"]: currentId
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
              placeholder="မန်ဘာကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
              readOnly={true}
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
              readOnly={true}
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
              readOnly={true}
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
              readOnly={true}
            />
          </Form.Item>

          <Form.Item
            name="shop_id"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
              readOnly={true}
            >
              {shops.map((shop) => (
                <Option value={shop.id} key={shop.id}>
                  {shop.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Table
            bordered
            columns={columns}
            // dataSource={result}
            pagination={{ defaultPageSize: 10 }}
          />
        </Form>
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, { editMembers, getShops })(
  DetailMembers
);
