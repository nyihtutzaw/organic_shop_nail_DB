import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  ExportOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItems } from "../../store/actions";
import { Form, Input, InputNumber, Select, message, DatePicker } from "antd";
// import {
//     EditOutlined,
//     SaveOutlined,
//     PlusSquareOutlined,
//   } from "@ant-design/icons";


const { Title } = Typography;

const StaffComession = () => {

  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [buyMerchant, setBuyMerchant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  const columns = [
    {
      title: "အမည်",
      dataIndex: "code"
    },
    {
      title: "လခ",
      dataIndex: "type"
    },
    {
      title: "ရက်မှန်ကြေး",
      dataIndex: "total_amount"
    },
    {
      title: "ကော်မရှင်",
      dataIndex: "percentage"
    },
    {
      title: "စုစုပေါင်း",
      dataIndex: "commession"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const onChange = (value) => {
    if (value === undefined) {
      setBuyMerchant(null);
    } else {
      //   const filterBuyMerchant = merchant.merchants.find(
      //     (mer) => mer.id === value
      //   );
      //   setBuyMerchant(filterBuyMerchant);
    }
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Title level={3}>၀န်ထမ်းလခနှင့်ကော်မရှင်စုစုပေါင်း</Title>
          </Col>

          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button>
          </Col>
        </Row>
        <Row>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </Row>
        <Row>
          <Col span={6}>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ကုန်သည်အမည်ရွေးပါ"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {/* {merchant.merchants.map((mer) => (
              <Option key={mer.id} value={mer.id}>
                {mer.name}
              </Option>
            ))} */}
            </Select>
          </Col>

          <Col span={6}> </Col>
          <Col span={5}> </Col>
          <Col span={7}>
            <Form.Item
              name="total"
              label="စုစုပေါင်း (Total)"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
                }
              ]}
            >
              <Input style={{ borderRadius: "10px" }} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          //   dataSource={item.items}
        />
      </Space>
    </Layout>
  );
};

export default StaffComession;
