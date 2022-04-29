<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  Input,
  Select,
  notification,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { DeleteOutlined, ReadOutlined } from "@ant-design/icons";
=======
import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, DatePicker, Input, Select, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { DeleteOutlined } from "@ant-design/icons";
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import queryString from "query-string";
import dayjs from "dayjs";
import { getVouchers, deleteVouchers } from "../../store/actions";
<<<<<<< HEAD
import Text from "antd/lib/typography/Text";
import { successDeleteMessage } from "../../util/messages";

<<<<<<< HEAD
=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

=======
>>>>>>> Last
const { Title } = Typography;
const { Option } = Select;

<<<<<<< HEAD
const VoucherReports = ({ voucher, getVouchers, deleteVouchers }) => {
=======
const VoucherReports = ({ voucher, getVouchers, deleteVouchers}) => {
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const location = useLocation();
  const status = useSelector((state) => state.status);
  const Vouchers = useSelector((state) => state.voucher.vouchers);
  const error = useSelector((state) => state.error);
  const vouchersUnique = [];
  Vouchers?.forEach((i) => vouchersUnique.push(i?.customer_name));
  let unique = [...new Set(vouchersUnique)];

  const start_date = new URLSearchParams(window.location.search).get(
    "start_date"
  );
  const end_date = new URLSearchParams(window.location.search).get("end_date");

  useEffect(() => {
    const fetchData = async () => {
      await getVouchers(queryString.parse(location.search));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getVouchers]);

<<<<<<< HEAD
  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage);
    }

    return () => status.success;
  }, [status.success]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(voucher?.vouchers);
    } else {
      const filterBuyMerchant = voucher?.vouchers?.filter(
        (mer) => mer?.member?.name === value
      );
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

<<<<<<< HEAD

=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
=======
>>>>>>> Last
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Delete Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };

<<<<<<< HEAD
  const handleDelete = async (record) => {
    await deleteVouchers(record.id);
    openNotificationWithIcon("error");
  };

=======
const handleDelete = async (record) => {
  await deleteVouchers(record.id)
  openNotificationWithIcon("error")
}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ဘောင်ချာကုတ်",
      dataIndex: "voucher_code"
    },

    {
      title: "ဝယ်သူအမည်",
      dataIndex: "customer_name"
    },
    {
      title: "ဝယ်ယူသောပမာဏ",
      dataIndex: "total",
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1
      }
    },

    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
<<<<<<< HEAD
          <Button
            type="primary"
            style={{
              backgroundColor: "#5b8c00"
            }}
            onClick={() => {
              window.location = `/admin/sale/${record.id}`;
            }}
          >
            <ReadOutlined />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
=======
        
          <Button type="primary" onClick={()=>{
            window.location=`/admin/sale/${record.id}`;
          }}>Detail</Button>
          <Button type="primary" danger
          onClick={() => handleDelete(record)}
          >
          <DeleteOutlined/>
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Spin spinning={status.loading}>
<<<<<<< HEAD

    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={13}>
            <Title level={3}>ဘောင်ချာအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={5}>
            <p
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "var(--white-color)"
              }}
            >
              Start Date= {start_date}
            </p>
          </Col>
          <Col span={5}>
            <p
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "var(--white-color)"
              }}
            >
              End Date= {end_date}
            </p>
          </Col>
        </Row>
<<<<<<< HEAD
        <Row>
          <Col span={10}>
            <RangePicker
              onChange={(val) => {
                //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                window.location = `/admin/voucher-report?start_date=${dayjs(
                  val[0]
                ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                  "YYYY-MM-DD"
                )}`;
              }}
            />
=======
        <Space direction="vertical" size={12}><RangePicker onChange={(val)=>{
          //alert(dayjs(val[0]).format("YYYY-MM-DD"))
          window.location=`/admin/voucher-report?start_date=${dayjs(val[0]).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format("YYYY-MM-DD")}`;
        }}/></Space>
        
        
        <Row>
          <Col span={5}>
            {/* <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
             SSort by ( ပမာဏ )
            </Button> */}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
          </Col>
          <Col span={10}>
            <Text type="secondary">ဝယ်သူအမည်ရွေးပါ</Text>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဝယ်သူအမည်ရွေးပါ"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {unique.map((item) => (
=======
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={13}>
              <Title level={3}>ဘောင်ချာအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
            </Col>
            <Col span={5}>
              <p
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)"
                }}
              >
                Start Date= {start_date}
              </p>
            </Col>
            <Col span={5}>
              <p
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)"
                }}
              >
                End Date= {end_date}
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <RangePicker
                onChange={(val) => {
                  //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                  window.location = `/admin/voucher-report?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }}
              />
            </Col>
            <Col span={10}>
              <Text type="secondary">ဝယ်သူအမည်ရွေးပါ</Text>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ဝယ်သူအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {unique.map((item) => (
>>>>>>> Last
                  <Option key={Math.random() * 100} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={14}></Col>
            <Col span={5}>
              {/* <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
              ဝယ်ယူသူအမည်
            </Button> */}
              {/* <Input.Group compact style={{ width: "100%" }}>
              <Select defaultValue="ဝယ်ယူသူအမည်">
                <Option value="Option1">ဝယ်ယူသူအမည်1</Option>
                <Option value="Option2">ဝယ်ယူသူအမည်2</Option>
              </Select>
            </Input.Group> */}
            </Col>
          </Row>

          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={
              showBuyMerchant != null ? showBuyMerchant : voucher.vouchers
            }
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  voucher: store.voucher
});

<<<<<<< HEAD
export default connect(mapStateToProps, { getVouchers, deleteVouchers })(
  VoucherReports
);
=======
export default connect(mapStateToProps, { getVouchers, deleteVouchers })(VoucherReports);
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
