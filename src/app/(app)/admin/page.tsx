  "use client"
  import React from "react";
  import { Layout, Menu, Card, Row, Col } from "antd";
  import {
    DashboardOutlined,
    VideoCameraOutlined,
    UserOutlined,
    DollarOutlined,
    SettingOutlined,
    FileAddFilled
  } from "@ant-design/icons";
  import "antd/dist/reset.css";
  import {useRouter} from "next/navigation"
  import axios from "axios";
  const { Header, Sider, Content } = Layout;

  const AdminDashboard = () => {
      //getUsercount
      const [userCount,setuserCount] = React.useState<number>(0)
      const [movieCount,setmovieCount] = React.useState<number>(0)
      const [bookingCount,setbookingCount] = React.useState<number>(0)
      const [Revenue,setRevenue] = React.useState<number>(0)
      React.useEffect(()=>{
          const get_user_count = async()=>{
              try {
                  const response = await axios.get('/api/admin/count-admin-items')
                  if(response.status===200){
                      setuserCount(response.data.userCount)
                      setmovieCount(response.data.moviesCount)
                      setbookingCount(response.data.bookingsCount)
                      setRevenue(response.data.revenue[0].revenue)
                  }
              } catch (error) {
                  if(axios.isAxiosError(error)){
                      console.log(error.response?.data.error.message);
                  }
              }
          }
          get_user_count()
      },[])
      

      const router=useRouter()
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className="logo" style={{ color: "white", textAlign: "center", padding: "10px" }}>
            🎬 FilmFusion Admin
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>Movies</Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>Users</Menu.Item>
            <Menu.Item key="4"  onClick={()=>router.push('/admin/allbookings')} icon={<DollarOutlined /> }>Bookings</Menu.Item>
            <Menu.Item key="5" icon={<SettingOutlined />}>Settings</Menu.Item>
            <Menu.Item key="6" onClick={()=>router.push('/addmovie')} icon={<FileAddFilled/>}>AddMovie</Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Header style={{ background: "#fff", padding: 10, textAlign: "center" }}>
            <h2>Admin Dashboard</h2>
          </Header>
          <Content style={{ margin: "20px" }}>
            <Row gutter={16}>
              <Col span={6}>
                <Card title="Total Movies 🎬" >{movieCount}</Card>
              </Col>
              <Col span={6}>
                <Card title="Active Users 👥" >{userCount}</Card>
              </Col>
              <Col span={6}>
                <Card title="Total Bookings 🎟️" >{bookingCount}</Card>
              </Col>
              <Col span={6}>
                <Card title="Revenue 💰" >INR {Revenue}</Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  };

  export default AdminDashboard;
