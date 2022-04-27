import React, { useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  notification,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getExpenseNames,
  deleteExpenseNames,
  getExpenseName
} from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import { successDeleteMessage } from "../../util/messages";

const { Title } = Typography;

const ShowExpenseNames = ({
  expenseNames,
  getExpenseNames,
  deleteExpenseNames,
  getExpenseName
}) => {
  const allExpenseName = useSelector(
    (state) => state.expense_name.expense_names
  );
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const fileName = "Name Expenses"; // here enter filename for your excel file
  const result = allExpenseName.map((expense) => ({
    Name: expense.name
  }));

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await getExpenseNames();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getExpenseNames]);

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

  const handleClick = async (record) => {
    await getExpenseName(record.id);
    navigate(`/admin/edit-expense-names/${record.id}`);
  };

  const handleDelete = async (record) => {
    await deleteExpenseNames(record.id);
  };

  const columns = [
    {
      title: "ကုန်ကျစရိတ်အမည်",
      dataIndex: "name"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          {user?.position !== "owner" && (
            <Button type="primary" onClick={() => handleClick(record)}>
              <EditOutlined />
            </Button>
          )}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
<<<<<<< HEAD
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Title level={3}>ကုန်ကျစရိတ်အမည်စာရင်း</Title>
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
                  onClick={() => navigate("/admin/create-expense-names")}
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
            dataSource={expenseNames.expense_names}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
=======
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Title level={3}>ကုန်ကျစရိတ်အမည်စာရင်း</Title>
          </Col>
          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-expense-names")}
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Col>
          <Col span={4}>
          <ExportToExcel apiData={result} fileName={fileName} />
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={expenseNames.expense_names}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  );
};

const mapStateToProps = (store) => ({
  expenseNames: store.expense_name
});

export default connect(mapStateToProps, {
  getExpenseNames,
  deleteExpenseNames,
  getExpenseName
})(ShowExpenseNames);
