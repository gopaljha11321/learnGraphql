import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Tooltip, Form, Button } from "antd";
import { useQuery } from "@apollo/client";
import { GetAllQuotes } from "./queries/queries.jsx";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    // fetch("http://localhost:3001", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query: `query getUserById($userby:ID!) {
    //       user(id: $userby) {
    //         firstName
    //         lastName
    //         quotes {
    //           name
    //         }
    //       }
    //     }`,
    //     variables: {
    //       userby: "1",
    //     },
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    //apolloClient store the data in cache so less network call
  }, []);
  const { loading, error, data, refetch } = useQuery(GetAllQuotes, {
    variables: {
      user,
    },
  });
  console.log(user);
  const onFinish = () => {
    refetch();
    if (error) {
      window.alert(error.message);
    }
    if (data) {
      console.log(data);
      window.alert(`Welcome ${data.validate.firstName}`);
    }
  };
  return (
    <div
      className="App"
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input.Password
            placeholder="input password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
