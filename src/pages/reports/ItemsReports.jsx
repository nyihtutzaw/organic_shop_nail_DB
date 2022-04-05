import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, DatePicker } from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getBestItem } from "../../store/actions";

const { Title } = Typography;

const ItemsReports = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state) => state.item.items);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestItem(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestItem, location, items]);

  let columns = [];
  
  if (!queryString.parse(location.search).best) {
    columns=[
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_,record) => (record.id)
        // render: (_,record) => (console.log(record.id))
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "invoice.created_at",
        render: (_, record) => getReadableDateDisplay(record.invoice?.created_at),
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.stock?.item?.name,
      },
  
      {
        title: "အရေအတွက်",
        dataIndex: "quantity",
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.price * record.quantity,
      },
    ];
  }
  else {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_,record) => (record.id)
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.stock?.item?.name,
      },

      {
        title: "အရေအတွက်",
        dataIndex: "total_qty",
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.stock.item.sale_price*record.total_qty,
      },
    ];
  }
  
  

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ပစ္စည်းအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={3}></Col>
        </Row>

        <Space direction="vertical" size={12}>
          <RangePicker
            onChange={(val) => {
              //alert(dayjs(val[0]).format("YYYY-MM-DD"))
              if (queryString.parse(location.search).best) {
                window.location = `/admin/item-report?best=true&start_date=${dayjs(
                  val[0]
                ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                  "YYYY-MM-DD"
                )}`;
              } else {
                window.location = `/admin/item-report?start_date=${dayjs(
                  val[0]
                ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                  "YYYY-MM-DD"
                )}`;
              }
            }}
          />
        </Space>

        <Row>
          <Col span={5}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              block
            >
              Sort by ( ပစ္စည်းအမည် )
            </Button>
          </Col>
          <Col span={14}></Col>
          <Col span={5}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              block
              onClick={() =>
                (window.location = "/admin/item-report?best=true")
              }
            >
              အရောင်းရဆုံပစ္စည်းများ
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={items}
        />
      </Space>
    </Layout>
  );
};

export default ItemsReports;
