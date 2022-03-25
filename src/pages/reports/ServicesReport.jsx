import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, DatePicker } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getItems } from "../../store/actions";

const { Title } = Typography;

const ServicesReport = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();

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
        title: "စည်",
        dataIndex: "order"
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "date"
      },
      {
        title: "ဝန်ဆောင်မှုအမည်",
        dataIndex: "service_name"
      },
  
      {
        title: "အရေအတွက်",
        dataIndex: "quality"
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "total"
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


  return (
     <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ဝန်ဆောင်မှု မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={3}>
             
          </Col>
          <Col span={3}>
             
          </Col>
        </Row>

        <Space direction="vertical" size={12}><RangePicker /></Space>
        
        <Row>
          <Col span={5}>
            <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
             Sort by ( ဝန်ဆောင်မှုအမည် )
            </Button>
          </Col>
          <Col span={14}></Col>
          <Col span={5} >
            <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
              အရောင်းရဆုံးဝန်ဆောင်မှုများ
            </Button>
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
  )
}

export default ServicesReport