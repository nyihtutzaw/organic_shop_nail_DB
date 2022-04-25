import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
  Select
} from "antd";
import Layout from "antd/lib/layout/layout";
import queryString from "query-string";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getBestItem, getItems } from "../../store/actions";
import Text from "antd/lib/typography/Text";

const { Title } = Typography;
const { Option } = Select;

const ItemsReports = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const location = useLocation();
  const items = useSelector((state) => state.item.items);
  const itemsUnique = [];
  items.forEach((i) => itemsUnique.push(i?.item?.name));
  let unique = [...new Set(itemsUnique)];
  const start_date = new URLSearchParams(window.location.search).get(
    "start_date"
  );
  const end_date = new URLSearchParams(window.location.search).get("end_date");


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
      setshowBuyMerchant(items);
    } else {
      const filterBuyMerchant = items.filter((mer) => mer.item.name === value);
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

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
        dataIndex: "quantity",
        sorter: {
          compare: (a, b) => a.quantity - b.quantity,
          multiple: 1
        }
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.price * record.quantity
        // sorter: {
        //   compare: (a, b) => a.record?.price - b.record?.quantity,
        //   multiple: 1
        // }
      }
    ];
  } else {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.item_id
      },
      {
        title: "ပစ္စည်းအမည်",
        dataIndex: "invoice.stock",
        render: (_, record) => record.item?.name
      },

      {
        title: "အရေအတွက်",
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
        // render: (_, record) => record?.stock?.item?.sale_price*record?.total_qty,
      }
    ];
  }

  return (
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
                {unique.map((item) => (
                  <Option key={Math.random() * 100} value={item}>
                    {item}
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
  );
};

const mapStateToProps = (store) => ({
  item: store.item
});

export default connect(mapStateToProps, { getItems })(ItemsReports);
