import React, { useEffect } from "react";
import { Form, Input, Typography, Space, Button } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { editExpenseNames } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const { Title } = Typography;

const EditExpenseNames = ({editExpenseNames}) => {
  const { id } = useParams();
  const expenseNames = useSelector((state) => state.expense_name.expense_names);
  const currentexpenseName = expenseNames.find((expenseName) => expenseName.id === parseInt(id));
    // console.log(currentexpenseName)
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log(values);
    await editExpenseNames(id, values)
    form.resetFields();
    navigate("/admin/show-expense-names");
  };


  useEffect(() => {
    if (currentexpenseName) {
      form.setFieldsValue({ name: currentexpenseName.name });
    }
  }, [currentexpenseName]);

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ကုန်ကျစရိတ်အမည် သွင်းခြင်း စာမျက်နှာ
        </Title>
        <Form
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="name"
            label="ကုန်ကျစရိတ်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကုန်ကျစရိတ်အမည်ထည့်ပါ",
              },
            ]}
          >
            <Input
              placeholder="ကုန်ကျစရိတ်အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "10px",
              }}
              size="large"
              htmlType="submit"
            >
              <SaveOutlined />
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Layout>
  );
};

export default connect(null, { editExpenseNames })(EditExpenseNames);
