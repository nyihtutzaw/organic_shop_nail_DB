import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Space, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { connect } from "react-redux";
import { authUser } from "../store/actions";
const { Title } = Typography;

const Login = ({ auth, authUser }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await authUser("io-login", values);
    if (auth.isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }}>Organic Nail Shop</Title>

        <Form onFinish={onFinish} form={form} className="login-form">
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please insert your phone!"
              }
            ]}
          >
            <Input
              name="phone"
              placeholder="Enter your phone!"
              size="large"
              style={{ borderRadius: "10px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Enter your password!"
              size="large"
              style={{ borderRadius: "10px" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
                width: "100%"
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};
const mapStateToProps = (store) => ({
  auth: store.auth
});
export default connect(mapStateToProps, { authUser })(Login);
