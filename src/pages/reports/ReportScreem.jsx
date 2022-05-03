import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  DatePicker,
  Select,
  Input,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getReport } from "../../store/actions";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import { successDeleteMessage } from "../../util/messages";


const { Title } = Typography;
const ReportScreem = () => {
  const [reportType, setReportType] = useState("1");
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const report = useSelector((state) => state.report.report);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const start_date = new URLSearchParams(window.location.search).get(
    "start_date"
  );
  const end_date = new URLSearchParams(window.location.search).get("end_date");
  
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

  useEffect(() => {
    const fetchData = () => {
      dispatch(getReport(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getReport]);

  const fileName = "Reports"; // here enter filename for your excel file
  let result = [];
  if (reportType === "1") {
    report.forEach((r) =>
      result.push({
        Service_Total: r.service_total,
        Item_Total: r.item_total,
        Sale_Total: r.sale_total
      })
    );
  } else {
    report.forEach((r) =>
      result.push({
        Service_Total: r.service_total,
        Item_Total: r.item_total,
        Sale_Total: r.sale_total,
        Item_Buy_Total: r.item_buy_total,
        Staff_Salary: r.staff_salary,
        TotalCommision: r.totalCommision,
        ExpenseTotal: r.expenseTotal,
        Profit: r.profit
      })
    );
  }

  let columns = [];

  if (reportType === "1") {
    columns = [
      {
        title: "ဝန်ဆောင်မှုမှရငွေစုစုပေါင်း",
        dataIndex: "service_total"
      },
      {
        title: "ပစ္စည်းရောင်းရငွေစုစုပေါင်း",
        dataIndex: "item_total"
      },
      {
        title: "ဝင်ငွေစုစုပေါင်း",
        dataIndex: "sale_total"
      }
    ];
  } else {
    columns = [
      {
        title: "ဝန်ဆောင်မှုမှရငွေစုစုပေါင်း",
        dataIndex: "service_total"
      },
      {
        title: "ပစ္စည်းရောင်းရငွေစုစုပေါင်း",
        dataIndex: "item_total"
      },
      {
        title: "ဝင်ငွေစုစုပေါင်း",
        dataIndex: "sale_total"
      },
      {
        title: "ပစ္စည်းအရင်းစုစုပေါင်း",
        dataIndex: "item_buy_total",
        render: (_, record) => (
          <span style={{ color: "red" }}>{record.item_buy_total}</span>
        )
      },
      {
        title: "ဝန်ထမ်းလစာစုစုပေါင်း",
        dataIndex: "staff_salary",
        render: (_, record) => (
          <span style={{ color: "red" }}>{record.staff_salary}</span>
        )
      },
      {
        title: "ကော်မရှင်စုစုပေါင်း",
        dataIndex: "totalCommision",
        render: (_, record) => (
          <span style={{ color: "red" }}>{record.totalCommision}</span>
        )
      },
      {
        title: "အထွေထွေကုန်ကျငွေစုစုပေါင်း",
        dataIndex: "expenseTotal",
        render: (_, record) => (
          <span style={{ color: "red" }}>{record.expenseTotal}</span>
        )
      },
      {
        title: "အမြတ်စုစုပေါင်း",
        dataIndex: "profit"
      }
    ];
  }

  return (
    <Spin spinning={status.loading}>

    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={13}>
            <Title level={3}>Report Screen</Title>
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
          <Col span={8}>
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={(val) => {
                  window.location = `/admin/report-screem?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }}
              />
            </Space>
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Input.Group compact style={{ width: "100%" }}>
              <Select
                showSearch
                placeholder="report အမျိုးအစားရွေးပါ"
                optionFilterProp="children"
                allowClear={true}
                onChange={(value) => setReportType(value)}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                <Option value="1">အရောင်းစာရင်းချုပ်</Option>
                <Option value="2">အရှံးအမြတ်စာရင်း</Option>
              </Select>
            </Input.Group>
          </Col>
          <Col span={8}>
            <ExportToExcel apiData={result} fileName={fileName} />
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ position: ["none", "none"] }}
          dataSource={report}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

export default ReportScreem;
