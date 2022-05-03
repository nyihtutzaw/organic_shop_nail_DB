import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  Select,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
// import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getBestService } from "../../store/actions";
import queryString from "query-string";
import dayjs from "dayjs";
import Text from "antd/lib/typography/Text";
const { Title } = Typography;
const { Option } = Select;

const ServicesReport = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const services = useSelector((state) => state.service.services);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  // console.log(services);
  const servicesUnique = [];
  services.forEach((i) => servicesUnique.push(i?.service?.category));
  let unique = [...new Set(servicesUnique)];
  const start_date = new URLSearchParams(window.location.search).get(
    "start_date"
  );
  const end_date = new URLSearchParams(window.location.search).get("end_date");

  const result = services.map((s) => ({
    ...s,
    key: Math.random() * 100
  }));

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);


  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestService(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestService, location]);

  const [showBuyServices, setshowBuyServices] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyServices(services);
    } else {
      // console.log(services)
      const filterBuyServices = services.filter(
        (mer) => mer?.service?.category === value
      );
      // console.log(filterBuyServices)
      setshowBuyServices(filterBuyServices);
    }
  };
  // console.log(showBuyServices)

  let columns;

  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.id
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "invoice.created_at",
        render: (_, record) =>
          getReadableDateDisplay(record.invoice?.created_at)
      },
      {
        title: "ဝန်ဆောင်မှုအမည်",
        dataIndex: "service.category",
        render: (_, record) => record.service?.category
      },

      {
        title: "အရေအတွက်",
        dataIndex: "quantity",
        sorter: {
          compare: (a, b) => a.quantity - b.quantity,
          multiple: 1
        }
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "subtotal",
        sorter: {
          compare: (a, b) => a.subtotal - b.subtotal,
          multiple: 1
        }
      }
    ];
  } else {
    columns = [
      {
        title: "ဝန်ဆောင်မှုအမည်",
        dataIndex: "service.category",
        render: (_, record) => record.service.category
      },

      {
        title: "အရေအတွက်",
        dataIndex: "total_qty",
        sorter: {
          compare: (a, b) => a.total_qty - b.total_qty,
          multiple: 1
        }
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.service.price * record.total_qty,
        sorter: {
          compare: (a, b) => a.subtotal - b.subtotal,
          multiple: 1
        }
      }
    ];
  }

  return (
    <Spin spinning={status.loading}>

    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={13}>
            <Title level={3}>ဝန်ဆောင်မှု မှတ်တမ်းစာမျက်နှာ</Title>
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

        <Space direction="vertical" size={12}></Space>

        <Row>
          <Col span={6}>
            <RangePicker
              onChange={(val) => {
                //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                if (queryString.parse(location.search).best) {
                  window.location = `/admin/service-report?best=true&start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                } else {
                  window.location = `/admin/service-report?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }
              }}
            />
          </Col>
          <Col span={10}>
            <Text type="secondary">ဝန်ဆောင်မှုအမည်အမည်ရွေးပါ</Text>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ 	ဝန်ဆောင်မှုအမည်အမည်ရွေးပါ"
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
                <Option key={Math.random() * 100} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <Button
              onClick={() => {
                window.location = "/admin/service-report?best=true";
              }}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              အရောင်းရဆုံးဝန်ဆောင်မှုများ
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={showBuyServices != null ? showBuyServices : result}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

export default ServicesReport;
