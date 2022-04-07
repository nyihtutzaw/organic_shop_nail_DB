import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Table,
  Row,
  Col
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";

const { Title } = Typography;

const ShowPurchases = ({
  getPurchase,
  purchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();
  const allPurchases = useSelector(
    (state) => state.purchase.purchase.purchase_credits
  );
  const allCredits = useSelector((state) => state.purchase.purchase);
  const getTotalCredit = useSelector((state) => state.purchase.purchases);
  // console.log(getTotalCredit);
  // console.log("one",allCredits.credit);

  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
      await getPurchases();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase, getPurchases]);

  const result = allPurchases?.map((purchase) => ({
    key: purchase.id,
    amount: purchase.amount,
    date: purchase.created_at,
    id: purchase.id
  }));
  let allCredit = [];
  result?.forEach((re) => allCredit.push(parseInt(re.amount)));
  const finalCredit = allCredit.reduce((a, b) => a + b, 0);

  const onFinish = async (values) => {
    const result = {
      purchase_id: param.id,
      amount: values.amount
    };
    await savePurchaseCredits(result);
    form.resetFields();
    window.location.reload();
  };

  const handleDelete = async (record) => {
    await deletePurchaseCredits(record.id);
    window.location.reload();
  };
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date",
      render: (_, record) => getReadableDateDisplay(record.date)
    },
    {
      title: "ပေးခဲ့သည့်ငွေပမာဏ",
      dataIndex: "amount"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အကြွေးပေးချေရန်
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
            name="amount"
            label="ပေးချေမည့်ပမာဏ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပေးချေမည့်ပမာဏထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="ပေးချေမည့်ပမာဏထည့်ပါ"
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
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
              size="large"
            >
              <Title level={4}>ကနဦးပေးချေခဲ့သည့်ပမာဏ - </Title>
              <Title level={4}>{allCredits?.paid} Ks</Title>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
              size="large"
            >
              <Title level={4}>ပေးချေခဲ့ပြီးပမာဏ - </Title>
              <Title level={4}>{finalCredit} Ks</Title>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
              size="large"
            >
              <Title level={4}>ပေးရန်ကျန်ငွေ - </Title>
              <Title level={4}>{allCredits.credit} Ks</Title>
            </Space>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
})(ShowPurchases);
