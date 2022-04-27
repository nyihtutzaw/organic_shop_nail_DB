import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, Spin, message } from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStaffs, deleteStaffs, clearAlertStaffs } from "../../store/actions";
import { connect } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import store from "../../store";
import { successDeleteMessage } from "../../util/messages";

const { Title } = Typography;

const ShowStaff = ({ getStaffs, deleteStaffs, clearAlertStaffs }) => {
  const staffs = useSelector((state) => state.staff.staffs);

  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const fileName = "Staffs"; // here enter filename for your excel file
  const result = staffs.map((staff) => ({
    Date_Of_Birth: staff.dob,
    Bank_Account: staff.bank_account,
    Name: staff.name,
    Phone: staff.phone,
    Salary: staff.salary,
    Start_Work: staff.start_work
  }));

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
    store.dispatch(clearAlertStaffs());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getStaffs();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStaffs]);

  const navigate = useNavigate();

  const handleClick = (record) => {
    navigate(`/admin/edit-staff/${record.id}`);
  };

  const handleDelete = async (record) => {
    await deleteStaffs(record.id);
  };

  const handleDailyRecord = async (record) => {
    navigate(`/admin/dailyAttendance-staff/${record.id}`);
  }

  const columns = [
    {
      title: "ဓါတ်ပုံ",
      dataIndex: "image",
      render: (_, record) => (
        <img src={`${record.image}`} width={80} height={80} />
      )
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "အလုပ်စဝင်သောနေ့",
      dataIndex: "start_work"
    },
    {
      title: "ဖုန်းနံပါတ်",
      dataIndex: "phone"
    },
    {
      title: "လခ",
      dataIndex: "salary"
    },
    {
      title: "ဘဏ်အကောင့်",
      dataIndex: "bank_account"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
           {user?.position !== "owner" && (
          <Button type="primary" onClick={() => handleClick(record)}>
            {" "}
            <EditOutlined />
          </Button>
            )}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" style={{ backgroundColor: "#ad6800" }} danger onClick={() => handleDailyRecord(record)}>
            ရက်မှန်ကြေးထည့်ရန်
          </Button>
        </Space>
      )
    }
  ];


  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ဝန်ထမ်းစာရင်း</Title>
          </Col>
          <Col span={4}>
          {user?.position !== "owner" && (
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-staff")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
            )}
          </Col>
          <Col span={4}>
            <ExportToExcel apiData={result} fileName={fileName} />
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={staffs}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

export default connect(null, { getStaffs, deleteStaffs, clearAlertStaffs })(ShowStaff);
