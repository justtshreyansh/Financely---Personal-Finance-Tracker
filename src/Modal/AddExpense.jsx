import React from "react";
import {
  Card,
  Col,
  Row,
 
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import Button from "../components/Button";
const AddExpense = ({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
           handleExpenseCancel();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount!",
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
        style={{fontWeight:600}}
        label="Tag"
        name="tag"
        rules={[{required:true,message:"Please select a tag!"}]}
        >
            <Select className="select-input-2">
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="freelance">Freelance</Select.Option>
                <Select.Option value="investment">Investment</Select.Option>
            </Select>

        </Form.Item>
        <Form.Item>
            <Button onClick={() => form.submit()} blue={true} text="Add Expense" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
