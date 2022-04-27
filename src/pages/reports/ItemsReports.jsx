import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
<<<<<<< HEAD
  Select,
  message,
  Spin
=======
  Select
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
} from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
<<<<<<< HEAD
import { getBestItem, getItems } from "../../store/actions";
import Text from "antd/lib/typography/Text";
import { successDeleteMessage } from "../../util/messages";

=======
import { getBestItem } from "../../store/actions";
import Text from "antd/lib/typography/Text";
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

const { Title } = Typography;
const { Option } = Select;

const ItemsReports = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state) => state.item.items);
<<<<<<< HEAD
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  // const itemss = useSelector((state) => state.item);
  // console.log(itemss)
  const itemsUnique = [];
  items.forEach((i) => itemsUnique.push(i?.item?.name));
  let unique = [...new Set(itemsUnique)];
  
  const start_date = new URLSearchParams(window.location.search).get(
    "start_date"
  );
  const end_date = new URLSearchParams(window.location.search).get("end_date");

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


=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestItem(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestItem, location]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);
  const onChange = (value) => {
    if (value === undefined) {
<<<<<<< HEAD
      setshowBuyMerchant(items);
    } else {
      const filterBuyMerchant = items.filter((mer) => mer.item.name === value);
      setshowBuyMerchant(filterBuyMerchant);
    }
  };
=======
      setshowBuyMerchant([]);
    } else {
      const filterBuyMerchant = items.filter((mer) => mer.id === value);
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

  let columns = [];
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

  let columns = [];
  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.id
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "invoice.created_at",
        render: (_, record) =>
          getReadableDateDisplay(record.invoice?.created_at)
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.item?.name
      },

      {
        title: "အရေအတွက်",
<<<<<<< HEAD
        dataIndex: "quantity",
        sorter: {
          compare: (a, b) => a.quantity - b.quantity,
          multiple: 1
        }
=======
        dataIndex: "quantity"
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.price * record.quantity
<<<<<<< HEAD
        // sorter: {
        //   compare: (a, b) => a.record?.price - b.record?.quantity,
        //   multiple: 1
        // }
=======
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      }
    ];
  } else {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.item_id
<<<<<<< HEAD
=======
        // render: (_, record) => console.log(record)
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.item?.name
      },

      {
        title: "အရေအတွက်",
<<<<<<< HEAD
        dataIndex: "total_qty",
        sorter: {
          compare: (a, b) => a.total_qty - b.total_qty
          // multiple: 1
        }
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "total_subtotal",
        sorter: {
          compare: (a, b) => a.total_subtotal - b.total_subtotal,
          multiple: 1
        }
=======
        dataIndex: "total_qty"
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "total_subtotal"
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
        // render: (_, record) => record?.stock?.item?.sale_price*record?.total_qty,
      }
    ];
  }

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={13}>
            <Title level={3}>ပစ္စည်းအရောင်း မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={5}>
            <p
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "var(--white-color)"
              }}
            >
              Start Date= {start_date}
            </p>
          </Col>
          <Col span={5}>
            <p
              style={{
                backgroundColor: "var(--primary-color)",
                padding: "10px",
                color: "var(--white-color)"
              }}
            >
              End Date= {end_date}
            </p>
          </Col>
        </Row>
        <Space direction="vertical" size={12}></Space>

        <Row>
          <Col span={6}>
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
          </Col>
          <Col span={12}>
            <Space
              direction="horizontal"
              style={{
                width: "100%",
                marginBottom: "10px"
              }}
              size="large"
            >
              <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
<<<<<<< HEAD
                {unique.map((item) => (
                  <Option key={Math.random() * 100} value={item}>
                    {item}
=======
                {items.map((item) => (
                  <Option key={item.key} value={item.id}>
                    {item.item.name}
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>

          <Col span={4}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
              onClick={() => (window.location = "/admin/item-report?best=true")}
            >
              အရောင်းရဆုံပစ္စည်းများ
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={showBuyMerchant != null ? showBuyMerchant : items}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  item: store.item
});

export default connect(mapStateToProps, { getItems })(ItemsReports);
