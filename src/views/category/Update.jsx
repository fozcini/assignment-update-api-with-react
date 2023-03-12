import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Update() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/categories/" + id)
      .then((res) => {
        console.log('asdas')
        form.setFieldsValue({
          name: res.data.name,
          description: res.data.description,
        });
      });
  }, []);

  const updateCategory = () => {
    axios
      .put("https://northwind.vercel.app/api/categories/" + id, {name: form.getFieldValue('name'), description: form.getFieldValue('description')})
      .then((res) => {
        navigate("/categories");
      });
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={updateCategory}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Update;
