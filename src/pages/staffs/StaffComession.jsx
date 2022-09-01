import React, { useEffect, useState } from 'react'
import {
  Typography,
  Space,
  Row,
  Col,
  Table,
  Select,
  Spin,
  message,
  InputNumber,
  Button,
} from 'antd'
import Layout from 'antd/lib/layout/layout'
import { call } from '../../services/api'
import { serverErrorMessage } from '../../util/messages'

const { Title, Text } = Typography
const { Option } = Select

const StaffComession = () => {
  const [allPaid, setAllPaid] = useState([])
  const [month, setMonth] = useState(null)
  const [year, setYear] = useState(null)

  const fetchData = async () => {
    try {
      const result = await call('get', 'all-paid')

      const transformResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
          total:
            Number(data.salary) +
            Number(data.daily_fee) +
            Number(data.commercial) -
            Number(data.fine),
        }
      })

      setAllPaid(transformResult)
    } catch (error) {
      message.error(serverErrorMessage)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFilter = async () => {
    if (month && year) {
      const result = await call('get', `all-paid?month=${month}&year=${year}`)

      const transformResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
          total:
            Number(data.salary) +
            Number(data.daily_fee) +
            Number(data.commercial) -
            Number(data.fine),
        }
      })

      setAllPaid(transformResult)
    } else {
      message.warning('လ ၊ ခုနှစ် ထည့်ပါ')
    }
  }

  const columns = [
    {
      title: 'အမည်',
      dataIndex: 'name',
    },
    {
      title: 'လခ',
      dataIndex: 'salary',
    },
    {
      title: 'ရက်မှန်ကြေး',
      dataIndex: 'daily_fee',
    },
    {
      title: 'ကော်မရှင်',
      dataIndex: 'commercial',
    },
    {
      title: 'ဒဏ်ကြေး',
      dataIndex: 'fine',
    },
    {
      title: 'စုစုပေါင်း',
      dataIndex: 'total',
    },
  ]

  const total =
    allPaid.length > 0
      ? allPaid.map((paid) => paid.total).reduce((a, b) => a + b)
      : 0

  return (
    <Spin spinning={false}>
      <Layout style={{ margin: '20px' }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={3}>၀န်ထမ်းလခနှင့်ကော်မရှင်စုစုပေါင်း</Title>
            </Col>
            <Col span={12}>
              <Text
                style={{
                  backgroundColor: 'var(--primary-color)',
                  padding: '10px',
                  color: 'var(--white-color)',
                }}
              >
                စုစုပေါင်း = {total}
              </Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select
                showSearch
                placeholder="ကျေးဇူးပြု၍ လရွေးပါ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: '10px' }}
                onChange={(value) => setMonth(value)}
              >
                <Option value="01">01</Option>
                <Option value="02">02</Option>
                <Option value="03">03</Option>
                <Option value="04">04</Option>
                <Option value="05">05</Option>
                <Option value="06">06</Option>
                <Option value="07">07</Option>
                <Option value="08">08</Option>
                <Option value="09">09</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Col>
            <Col span={8}>
              <InputNumber
                placeholder="ခုနှစ်ထည့်ပါ  ဥပမာ(2022)"
                style={{ borderRadius: '10px', width: '100%' }}
                size="large"
                onChange={(value) => setYear(value)}
              />
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  marginLeft: '60px',
                }}
                onClick={handleFilter}
              >
                စစ်မည်
              </Button>
            </Col>
            <Col span={4}>
              <Button
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--white-color)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  marginLeft: '60px',
                }}
                onClick={fetchData}
              >
                All
              </Button>
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={allPaid}
          />
        </Space>
      </Layout>
    </Spin>
  )
}

export default StaffComession

// import React, { useState, useEffect } from 'react'
// import {
//   Typography,
//   Space,
//   Row,
//   Col,
//   Table,
//   Select,
//   DatePicker,
//   Spin,
//   message,
// } from 'antd'
// import Layout from 'antd/lib/layout/layout'
// import queryString from 'query-string'
// import { getStaffReport, getDailyStaffs } from '../../store/actions'
// import { useLocation } from 'react-router-dom'
// import dayjs from 'dayjs'
// import { connect, useDispatch, useSelector } from 'react-redux'

// const { Title, Text } = Typography
// const { Option } = Select

// const StaffComession = ({ getDailyStaffs }) => {
//   const [filterStaffs, setFilterStaffs] = useState([])
//   const { RangePicker } = DatePicker
//   const dispatch = useDispatch()
//   const location = useLocation()
//   const staffs = useSelector((state) => state.staff.staffs)
//   const dailyStaffsFree = useSelector((state) => state.daily.dailys)
//   // const dailyStaffsFrees = useSelector((state) => state);
//   // console.log(dailyStaffsFrees)
//   const status = useSelector((state) => state.status)

//   const start_date = new URLSearchParams(window.location.search).get(
//     'start_date',
//   )
//   const end_date = new URLSearchParams(window.location.search).get('end_date')

//   useEffect(() => {
//     const fetchData = () => {
//       dispatch(getStaffReport(queryString.parse(location.search)))
//     }
//     fetchData()
//     return () => {
//       fetchData()
//     }
//   }, [getStaffReport, location])

//   useEffect(() => {
//     setFilterStaffs(staffs)
//     const fetchData = async () => {
//       await getDailyStaffs()
//     }
//     fetchData()
//     return () => {
//       fetchData()
//     }
//   }, [staffs, getDailyStaffs])

//   let columns

//   if (!queryString.parse(location.search).best) {
//     columns = [
//       {
//         title: 'အမည်',
//         dataIndex: 'name',
//       },
//       {
//         title: 'လခ',
//         dataIndex: 'salary',
//       },
//       {
//         title: 'ရက်မှန်ကြေး',
//         dataIndex: 'fee',
//         render: (_, record) => {
//           const result = record?.daily_fees?.map((f) => parseInt(f.amount))
//           const final = result?.reduce((a, b) => a + b, 0)
//           return final
//         },
//       },
//       {
//         title: 'ကော်မရှင်',
//         dataIndex: '',
//         render: (_, record) => {
//           return record?.services?.length > 0
//             ? record.services
//                 .map((service) => service.service.commercial)
//                 .reduce((a, b) => Number(a) + Number(b))
//             : 0
//         },
//       },
//       {
//         title: 'စုစုပေါင်း',
//         dataIndex: '',
//         render: (_, record) => {
//           const commercial =
//             record?.services?.length > 0
//               ? record.services
//                   .map((service) => service.service.commercial)
//                   .reduce((a, b) => Number(a) + Number(b))
//               : 0
//           let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id)
//           return (
//             Number(commercial) +
//             Number(record.salary) +
//             (result?.amount ? Number(result?.amount) : 0)
//           )
//         },
//       },
//     ]
//   } else {
//     columns = [
//       {
//         title: 'အမည်',
//         dataIndex: 'name',
//       },
//       {
//         title: 'လခ',
//         dataIndex: 'salary',
//       },
//       {
//         title: 'ရက်မှန်ကြေး',
//         dataIndex: 'fee',
//         render: (_, record) => {
//           // console.log("dd",record)
//           let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id)
//           // console.log("aa",result.amount)
//           return result?.amount
//         },
//       },
//       {
//         title: 'ကော်မရှင်',
//         dataIndex: '',
//         render: (_, record) => {
//           return record?.services?.length > 0
//             ? record.services
//                 .map((service) => service.service.commercial)
//                 .reduce((a, b) => Number(a) + Number(b))
//             : 0
//         },
//       },
//       {
//         title: 'စုစုပေါင်း',
//         dataIndex: '',
//         render: (_, record) => {
//           const commercial =
//             record?.services?.length > 0
//               ? record.services
//                   .map((service) => service.service.commercial)
//                   .reduce((a, b) => Number(a) + Number(b))
//               : 0
//           let result = dailyStaffsFree.find((d) => d?.staff?.id === record?.id)
//           return (
//             Number(commercial) +
//             Number(record.salary) +
//             (result?.amount ? Number(result?.amount) : 0)
//           )
//         },
//       },
//     ]
//   }

//   let total = 0
//   filterStaffs.forEach((filterStaff) => {
//     const commercial =
//       filterStaff?.services?.length > 0
//         ? filterStaff?.services
//             .map((service) => service?.service?.commercial)
//             .reduce((a, b) => Number(a) + Number(b))
//         : 0
//     let result = dailyStaffsFree.find((d) => d?.staff?.id === filterStaff?.id)

//     total +=
//       Number(commercial) +
//       Number(filterStaff.salary) +
//       (result?.amount ? Number(result?.amount) : 0)
//   })

//   const handleOnChange = (value) => {
//     if (value === undefined) {
//       setFilterStaffs(staffs)
//     } else {
//       setFilterStaffs(staffs.filter((staff) => staff.id === value))
//     }
//   }

//   return (
//     <Spin spinning={status.loading}>
//       <Layout style={{ margin: '20px' }}>
//         <Space direction="vertical" size="middle">
//           <Row gutter={[16, 16]}>
//             <Col span={10}>
//               <Title level={3}>၀န်ထမ်းလခနှင့်ကော်မရှင်စုစုပေါင်း</Title>
//             </Col>
//             <Col span={5}>
//               <p
//                 style={{
//                   backgroundColor: 'var(--primary-color)',
//                   padding: '10px',
//                   color: 'var(--white-color)',
//                 }}
//               >
//                 Start Date= {start_date}
//               </p>
//             </Col>

//             <Col span={5}>
//               <p
//                 style={{
//                   backgroundColor: 'var(--primary-color)',
//                   padding: '10px',
//                   color: 'var(--white-color)',
//                 }}
//               >
//                 End Date= {end_date}
//               </p>
//             </Col>
//             <Col span={3}>
//               {/* <Button
//               style={{
//                 backgroundColor: "var(--primary-color)",
//                 color: "var(--white-color)",
//                 borderRadius: "5px",
//               }}
//               size="middle"
//             >
//               <ExportOutlined />
//               Export
//             </Button> */}
//               {/* <ExportToExcel apiData={result} fileName={fileName} /> */}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={8}>
//               <Space direction="vertical" size={12}>
//                 <RangePicker
//                   onChange={(val) => {
//                     if (queryString.parse(location.search).best) {
//                       window.location = `/admin/show-staff-commession?best=true&start_date=${dayjs(
//                         val[0],
//                       ).format('YYYY-MM-DD')}&end_date=${dayjs(val[1]).format(
//                         'YYYY-MM-DD',
//                       )}`
//                     } else {
//                       window.location = `/admin/show-staff-commession?start_date=${dayjs(
//                         val[0],
//                       ).format('YYYY-MM-DD')}&end_date=${dayjs(val[1]).format(
//                         'YYYY-MM-DD',
//                       )}`
//                     }
//                   }}
//                 />
//               </Space>
//             </Col>
//             <Col span={8}>
//               <Select
//                 showSearch
//                 placeholder="ကျေးဇူးပြု၍ ဝန်ထမ်းအမည်ရွေးပါ"
//                 optionFilterProp="children"
//                 filterOption={(input, option) =>
//                   option.children.toLowerCase().indexOf(input.toLowerCase()) >=
//                   0
//                 }
//                 allowClear={true}
//                 onChange={(value) => handleOnChange(value)}
//                 size="large"
//                 style={{ borderRadius: '10px' }}
//               >
//                 {staffs.map((staff) => (
//                   <Option value={staff.id} key={staff.id}>
//                     {staff.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//             <Col span={8}>
//               <Text
//                 style={{
//                   backgroundColor: 'var(--primary-color)',
//                   padding: '10px',
//                   color: 'var(--white-color)',
//                 }}
//               >
//                 စုစုပေါင်း = {total}
//               </Text>
//             </Col>
//           </Row>
//           <Table
//             bordered
//             columns={columns}
//             pagination={{ defaultPageSize: 10 }}
//             dataSource={filterStaffs}
//           />
//         </Space>
//       </Layout>
//     </Spin>
//   )
// }

// export default connect(null, { getDailyStaffs })(StaffComession)
