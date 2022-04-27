import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, notification, message, Spin } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined,  DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import dateFormat, { masks } from "dateformat";
import {
  saveOwners,
  getOwners,
  deleteOwners,
  getOwner
} from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { successDeleteMessage } from "../../util/messages";


const { Title } = Typography;

const ShowOwners = ({ getOwners, deleteOwners, getOwner }) => {
  const owners = useSelector((state) => state.owner.owners);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

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
    const fetchData = async () => {
      await getOwners();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getOwners]);

  const now = new Date();
  const date = dateFormat(now, "mm/dd/yyyy");
  const navigate = useNavigate();

  const handleClick = async (id) => {
    await getOwner(id);
    navigate(`/admin/edit-owner/${id}`);
  };

  const handleDelete = async (record) => {
    await deleteOwners(record.id);
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "created_at",
      render: (_, record) => getReadableDateDisplay(record.created_at)
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "name",
      render: (_, record) => record.stock.item.name
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "code",
      render: (_, record) => record.stock.item.code
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          {user?.position !== "owner" && (
          <Button type="primary" onClick={() => handleClick(record.id)}>
          <EditOutlined/>
          </Button>
          )}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
          <DeleteOutlined/>
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
          <Col span={20}>
            <Title level={3}>လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်း စာရင်း</Title>
          </Col>
          <Col span={3}>
          {user?.position !== "owner" && (
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-owner")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          )}
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={owners}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

export default connect(null, { saveOwners, getOwners, deleteOwners, getOwner })(
  ShowOwners
);
