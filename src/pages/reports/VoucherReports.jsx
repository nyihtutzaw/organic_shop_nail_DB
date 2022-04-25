import React, { useEffect } from "react";
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
  notification
} from "antd";
import Layout from "antd/lib/layout/layout";
import { DeleteOutlined, ReadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import dayjs from "dayjs";
import { getVouchers, deleteVouchers } from "../../store/actions";

const { Title } = Typography;

const VoucherReports = ({ voucher, getVouchers, deleteVouchers }) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const location = useLocation();
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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Delete Your Data",
      description: "Your data have been deleted.",
      duration: 3
    });
  };

  const handleDelete = async (record) => {
    await deleteVouchers(record.id);
    openNotificationWithIcon("error");
  };

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
      dataIndex: "total"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
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
          </Button>
        </Space>
      )
    }
  ];

  return (
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
        <Space direction="vertical" size={12}>
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
        </Space>

        <Row>
          <Col span={5}>
            {/* <Button style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }} block>
             SSort by ( ပမာဏ )
            </Button> */}
          </Col>
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
          dataSource={voucher.vouchers}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  voucher: store.voucher
});

export default connect(mapStateToProps, { getVouchers, deleteVouchers })(
  VoucherReports
);
