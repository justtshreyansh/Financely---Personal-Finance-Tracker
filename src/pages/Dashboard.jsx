import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpense from "../Modal/AddExpense";
import AddIncome from "../Modal/AddIncome";
const Dashboard = () => {
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (value,type)=>{
    console.log("on finish",value,type);
  }

  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish}/>
      <AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish}/>
    </div>
  );
};

export default Dashboard;
