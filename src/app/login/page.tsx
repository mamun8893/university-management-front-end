"use client";

import { Button, Col, Row } from "antd";
import loginImg from "../../assets/images/login.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [userLogin, { data: loginData, isLoading, isSuccess }] =
    useUserLoginMutation();

  console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    userLogin({ ...data });
  };

  useEffect(() => {
    if (isSuccess && loginData) {
      storeUserInfo({ accessToken: loginData?.data?.accessToken });
      router.push("/profile");
    }
  }, [isSuccess, loginData]);
  return (
    <Row justify="center">
      <Col lg={10}>
        <Row style={{ minHeight: "100vh" }} align="middle" justify="center">
          <Col lg={14}>
            <Image src={loginImg} width={400} alt="login" />
          </Col>
          <Col lg={10}>
            <h1 style={{ marginBottom: "15px" }}>First Login your account</h1>
            <Form submitHandler={onSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <FormInput name="id" type="text" size="large" label="User Id" />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                />
              </div>
              <div>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LoginPage;
