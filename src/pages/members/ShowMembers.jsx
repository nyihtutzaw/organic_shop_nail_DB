import React, { useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  Alert
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  ReadOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getMembers,
  deleteMembers,
  getMember,
  clearAlertMember
} from "../../store/actions";
import { connect } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import store from "../../store";

const { Title } = Typography;

const ShowMembers = ({
  getMembers,
  deleteMembers,
  getMember,
  clearAlertMember
}) => {
  const navigate = useNavigate();
  const member = useSelector((state) => state.member);
  const members = useSelector((state) => state.member.members);
  const user = useSelector((state) => state.auth.user);

  const fileName = "Members"; // here enter filename for your excel file

  const result = members.map((member) => ({
    id: member.id,
    key: member.id,
    code: member.code,
    name: member.name,
    phone: member.phone,
    address: member.address,
    points: "10"
  }));

  const resultMember = members.map((member) => ({
    code: member.code,
    name: member.name,
    phone: member.phone,
    address: member.address
  }));

  useEffect(() => {
    store.dispatch(clearAlertMember());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getMembers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getMembers]);

  const handleClick = async (record) => {
    await getMember(record.id);
    navigate(`/admin/edit-members/${record.id}`);
  };

  const handleDelete = async (record) => {
    await deleteMembers(record.id);
  };

  const handleDetail = (record) => {
    navigate(`/admin/detail-members/${record.id}`);
  };

  const columns = [
    {
      title: "မန်ဘာကုတ်",
      dataIndex: "code"
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ဖုန်းနံပါတ်",
      dataIndex: "phone"
    },
    {
      title: "နေရပ်လိပ်စာ",
      dataIndex: "address"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button
            type="primary"
            style={{ background: "#5b8c00", borderColor: "yellow" }}
            onClick={() => handleDetail(record)}
          >
            <ReadOutlined/>
          </Button>
          {user?.position === "manager" ||
              user?.position === "casher" ||
              (user?.position === "staff" && (
          <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button>
              ))}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      {member.error.length > 0 ? (
        <Alert
          message="Errors"
          description={member.error}
          type="error"
          showIcon
          closable
        />
      ) : null}

      {member.isSuccess && (
        <Alert
          message="Successfully Deleted"
          type="success"
          showIcon
          closable
        />
      )}

      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>Member စာရင်း</Title>
          </Col>
          <Col span={4}>
          {user?.position === "manager" ||
            user?.position === "casher" ||
            (user?.position === "staff" && (
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-members")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
            ))}
          </Col>
          <Col span={4}>
            <ExportToExcel apiData={resultMember} fileName={fileName} />
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

export default connect(null, {
  getMembers,
  deleteMembers,
  getMember,
  clearAlertMember
})(ShowMembers);
