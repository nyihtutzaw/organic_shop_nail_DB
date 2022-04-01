import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStaffs, deleteStaffs } from "../../store/actions";
import { connect } from "react-redux";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const { Title } = Typography;

const ShowStaff = ({getStaffs, deleteStaffs}) => {
  const dispatch = useDispatch()
  const staffs = useSelector((state) => state.staff.staffs);
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

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Delete Your Data',
      description: 'Your data have been deleted.',
      duration: 3
    });
  };
  
  const handleDelete =async (record) => {
    await deleteStaffs(record.id);
    openNotificationWithIcon('error')
  }

  const columns = [
    {
      title: "ဓါတ်ပုံ",
      dataIndex: "image",
      render: (_, record) => (
        <img
        src={`${record.image}`}
          width={100}
          height={100}
        />
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
          <Button type="primary" onClick={() => handleClick(record)}> <EditOutlined/></Button>
          <Button type="primary" danger onClick={ () =>handleDelete(record) }>
          <DeleteOutlined/>
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ဝန်ထမ်းစာရင်း</Title>
          </Col>
          <Col span={4}>
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
          </Col>
          <Col span={4}>
          <ExcelFile
              element={
                <button
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--white-color)",
                    borderRadius: "5px"
                  }}
                >
                  <ExportOutlined />
                  စာရင်းထုတ်မည်
                </button>
              }
            >
              <ExcelSheet data={staffs} name="Staffs">
                <ExcelColumn label="Name" value="name" />
                <ExcelColumn label="Phone" value="phone" />
                <ExcelColumn label="Bank Account" value="bank_account" />
                <ExcelColumn label="Date of Birth" value="dob" />
                <ExcelColumn label="Salary" value="salary" />
                <ExcelColumn label="Start Work" value="start_work" />
              </ExcelSheet>
            </ExcelFile>
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
  )
}

export default connect(null, { getStaffs, deleteStaffs })(ShowStaff);