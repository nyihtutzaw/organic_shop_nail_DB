import React, { useState, useEffect, useRef } from "react";

// ant design styles
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Table,
  Image,
  Divider
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { call } from "../../services/api";
import { getDate } from "../../uitls/convertToDate";
import organic from "./images/organic.jpg";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Title } = Typography;


const PrintSale = () => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState();
  const param = useParams();
  const user = useSelector((state) => state.auth.user);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await call("get", `invoices/${param.id}`);

      if (response.status === "success") {
        const data = response.data;
        setSale(data);

        const transformSales = [];

        data.items.forEach((item) => {
          transformSales.push({
            key: transformSales.length + 1,
            id: transformSales.length + 1,
            code: item.stock.item.code,
            name: item.stock.item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal
          });
        });

        data.services.forEach((service) => {
          transformSales.push({
            key: transformSales.length + 1,
            id: transformSales.length + 1,
            code: service.service.code,
            name: service.service.category,
            price: service.price,
            quantity: service.quantity,
            subtotal: service.subtotal
          });
        });

        setSales(transformSales);
        // console.log(transformSales);
      }
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [param]);

  const columns = [
    {
      title: "စဥ်",
      dataIndex: "id"
    },
    {
      title: "ကုတ်နံပါတ်",
      dataIndex: "code"
    },
    {
      title: "ပစ္စည်း/ဝန်ဆောင်မှုအမည်",
      dataIndex: "name"
    },
    {
      title: "ဈေးနှုန်း",
      dataIndex: "price",
      align: "right"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
      align: "right"
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "subtotal",
      align: "right"
    }
  ];

  if (!sale) {
    return (
      <Layout>
        <Header style={{ backgroundColor: "var(--primary-color)" }}>
          <Title
            style={{
              color: "var(--white-color)",
              textAlign: "center",
              marginTop: "13px"
            }}
            level={3}
          >
            Loading
          </Title>
        </Header>
      </Layout>
    );
  }

  const discountAmount = sale.total * (sale.discount / 100);

  const handleDashboard = () => {
    navigate("/admin/sale");
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--primary-color)" }}>
        <Title
          style={{
            color: "var(--white-color)",
            textAlign: "center",
            marginTop: "13px"
          }}
          level={3}
        >
          အရောင်း‌ဘောင်ချာ print ထုတ်ခြင်း
        </Title>
      </Header>
      <Row>
        <Col span={10}></Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handlePrint}
          >
            <PrinterOutlined />
            Print
          </Button>
        </Col>
        <Col span={2}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handleDashboard}
          >
            Go To Sale
          </Button>
        </Col>
        <Col span={10}></Col>
      </Row>
      <div style={{ margin: "30px 0px" }} ref={componentRef}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}></Col>
          <Col
            className="gutter-row"
            span={12}
            style={{ textAlign: "center", marginBottom: "0px" }}
          >
            <Image
              preview={false}
              width={68}
              src={organic}
              style={{ borderRadius: "100px" }}
            />

            <Title level={2} style={{ fontSize: "16px" }}>
              Organic Nail Shop
            </Title>
          </Col>
          <Col className="gutter-row" span={6}></Col>
        </Row>

        <Row>
          <Col span={1}></Col>
          <Col span={10}>
            <Row>
              <Col span={8}>
                <Title style={{ fontSize: "11.5px" }} level={5}>
                  Mandalay:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Organic Nail Shop
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဆိုင်ခွဲ(၁):
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {/* အမှတ်(၁၈၂)၂၉လမ်း၊၇၉x၈၀ကြား */}
                  အမှတ်(၁၂၈)၂၉လမ်း၊၇၉×၈၀ကြား
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဖုန်းနံပါတ်:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  09-793990086, 02-4066055
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဆိုင်ခွဲ(၂):
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Block6,Unit15၊၇၃လမ်း၊သဇင်လမ်းနှင့်ငုရွှေဝါလမ်းကြား။မင်္ဂလာမန္တလေး
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဖုန်းနံပါတ်:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  09-790888550
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Yangon:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Organic Nail Shop
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဆိုင်ခွဲ(၁):
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  အမှတ်(၃၇)၊ရှင်စောပုဘုရားလမ်း၊စမ်းချောင်းမြို့နယ်။
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဖုန်းနံပါတ်:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  01-539551,09-762408875
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဆိုင်ခွဲ(၂):
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  B1(56/57)၊တော်၀င်စင်တာ၊ပြည်လမ်း၊ဒဂုံမြို့နယ်။
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  ဖုန်းနံပါတ်:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={15}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  01-8600111 (Ext:1156), 09-262437532, 09-400600366
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Divider
              style={{
                height: "2px",
                color: "gray",
                borderWidth: "0",
                backgroundColor: "gray",
                marginBottom: "3px",
                marginTop: "2px"
              }}
            />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={10}></Col>
          <Col span={4}>
            <Title
              level={2}
              style={{
                marginBottom: "5px",
                marginTop: "1px",
                textAlign: "center",
                fontSize: "20px"
              }}
            >
              Invoice{" "}
            </Title>
          </Col>
          <Col span={10}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={10}>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Customer Phone:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.customer_phone_no}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Customer Name:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.customer_name}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Payment Method:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.payment_method}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Date:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {getDate(sale.created_at)}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Voucher Code:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.voucher_code}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Shop Name:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={11}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {user?.shop?.name}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={sales}
          // pagination={{ position: ["none", "none"] }}
          pagination={{ defaultPageSize: 20, position: ["none", "none"] }}
          style={{ margin: "10px 20px" }}
          size="small"
        />
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              စုစုပေါင်း
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.total}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              လျော့ဈေး
            </Title>
          </Col>
          <Col span={2} style={{ textAlign: "left" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.discount}%
            </Title>
          </Col>

          <Col span={4} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {discountAmount}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးချေရမည့်စုစုပေါင်း
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.final_total}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးငွေ
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.paid}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးရန်ကျန်ငွေ
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.credit}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </Layout>
  );
};

export default PrintSale;
