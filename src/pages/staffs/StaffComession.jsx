import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col, Table, Select, DatePicker } from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getStaffReport, getDailyStaffs, getBestDailyStaff } from "../../store/actions";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { connect, useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

const StaffComession = ({ getDailyStaffs, getBestDailyStaff }) => {
  const [filterStaffs, setFilterStaffs] = useState([]);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const staffs = useSelector((state) => state.staff.staffs);
  const dailyStaffsFree = useSelector((state) => state.daily.dailys);
  // console.log(dailyStaffsFree);
  // console.log("ss",staffs);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getStaffReport(queryString.parse(location.search)));
      // dispatch(getBestDailyStaff(queryString.parse(location.search)));
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStaffReport, location]);

  useEffect(() => {
    setFilterStaffs(staffs);
    const fetchData = async () => {
      await getDailyStaffs();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [staffs, getDailyStaffs]);

  let columns;

  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: "အမည်",
        dataIndex: "name"
      },
      {
        title: "လခ",
        dataIndex: "salary"
      },
      {
        title: "ရက်မှန်ကြေး",
        dataIndex: "fee",
        render: (_, record) => {
          // console.log("dd",record)
          let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id);
          // console.log("aa",result.amount)
          return result?.amount;
        }
      },
      {
        title: "ကော်မရှင်",
        dataIndex: "",
        render: (_, record) => {
          return record?.services?.length > 0
            ? record.services
                .map((service) => service.service.commercial)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;
        }
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "",
        render: (_, record) => {
          const commercial =
            record?.services?.length > 0
              ? record.services
                  .map((service) => service.service.commercial)
                  .reduce((a, b) => Number(a) + Number(b))
              : 0;
          let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id);
          return (
            Number(commercial) + Number(record.salary) + Number(result?.amount)
          );
        }
      }
    ];
  } else {
    columns = [
      {
        title: "အမည်",
        dataIndex: "name"
      },
      {
        title: "လခ",
        dataIndex: "salary"
      },
      {
        title: "ရက်မှန်ကြေး",
        dataIndex: "fee",
        render: (_, record) => {
          // console.log("dd",record)
          let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id);
          // console.log("aa",result.amount)
          return result?.amount;
        }
      },
      {
        title: "ကော်မရှင်",
        dataIndex: "",
        render: (_, record) => {
          return record?.services?.length > 0
            ? record.services
                .map((service) => service.service.commercial)
                .reduce((a, b) => Number(a) + Number(b))
            : 0;
        }
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "",
        render: (_, record) => {
          const commercial =
            record?.services?.length > 0
              ? record.services
                  .map((service) => service.service.commercial)
                  .reduce((a, b) => Number(a) + Number(b))
              : 0;
          let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id);
          return (
            Number(commercial) + Number(record.salary) + Number(result?.amount)
          );
        }
      }
    ];
  }

  let total = 0;
  filterStaffs.forEach((filterStaff) => {
    const commercial =
      filterStaff?.services?.length > 0
        ? filterStaff?.services
            .map((service) => service.service.commercial)
            .reduce((a, b) => Number(a) + Number(b))
        : 0;
    let result = dailyStaffsFree.find((d) => d?.staff?.id === filterStaff?.id);

    total +=
      Number(commercial) + Number(filterStaff.salary) + Number(result?.amount);
  });

  const handleOnChange = (value) => {
    if (value === undefined) {
      setFilterStaffs(staffs);
    } else {
      setFilterStaffs(staffs.filter((staff) => staff.id === value));
    }
  };

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Title level={3}>၀န်ထမ်းလခနှင့်ကော်မရှင်စုစုပေါင်း</Title>
          </Col>

          <Col span={3}>
            {/* <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button> */}
            {/* <ExportToExcel apiData={result} fileName={fileName} /> */}
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Space direction="vertical" size={12}>
              <RangePicker
                onChange={(val) => {
                  if (queryString.parse(location.search).best) {
                    window.location = `/admin/show-staff-commession?best=true&start_date=${dayjs(
                      val[0]
                    ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                      "YYYY-MM-DD"
                    )}`;
                  } else {
                    window.location = `/admin/show-staff-commession?start_date=${dayjs(
                      val[0]
                    ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                      "YYYY-MM-DD"
                    )}`;
                  }
                }}
              />
            </Space>
          </Col>
          <Col span={8}>
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              onChange={(value) => handleOnChange(value)}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {staffs.map((staff) => (
                <Option value={staff.id} key={staff.id}>
                  {staff.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Text
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "var(--white-color)"
              }}
            >
              စုစုပေါင်း = {total}
            </Text>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={filterStaffs}
        />
      </Space>
    </Layout>
  );
};

export default connect(null, { getDailyStaffs, getBestDailyStaff })(StaffComession);
