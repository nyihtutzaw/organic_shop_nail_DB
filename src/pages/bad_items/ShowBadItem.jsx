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
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getBadItems, deleteBadItems, getBadItem } from "../../store/actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { successDeleteMessage } from "../../util/messages";

const { Title } = Typography;

const ShowBadItem = ({ getBadItems, deleteBadItems, getBadItem }) => {
  const badItems = useSelector((state) => state.bad_item.bad_items);
  // console.log(badItems)
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
      await getBadItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  const navigate = useNavigate();

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: "Delete Your Data",
  //     description: "Your data have been deleted.",
  //     duration: 3
  //   });
  // };

  const handleDelete = async (record) => {
    await deleteBadItems(record.id);
    // openNotificationWithIcon("error");
  };

  const handleClick = async (record) => {
    await getBadItem(record.id);
    navigate(`/admin/edit-bad-item/${record.id}`);
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name",
      render: (_, record) => record.stock?.item?.name
    },
    {
      title: "	ပစ္စည်းကုတ်",
      dataIndex: "item_code",
      render: (_, record) => record.stock?.item?.code
    },
    {
      title: "	အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "ရောင်းပြီးသားပစ္စည်းလဲခြင်း",
      dataIndex: "is_sale",
      render:(_,record) => {
        return record?.is_sale == 0 ? "ရောင်းပြီးသားလဲခြင်း"  : "မရောင်းပြီးသားလဲခြင်း"
      }
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
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={20}>
              <Title level={3}>ချို့ယွင်းချက်ရှိပစ္စည်:များစာရင်း</Title>
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
                  onClick={() => navigate("/admin/create-bad-item")}
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
            dataSource={badItems}
            pagination={{ defaultPageSize: 10 }}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

export default connect(null, { getBadItems, deleteBadItems, getBadItem })(
  ShowBadItem
);
