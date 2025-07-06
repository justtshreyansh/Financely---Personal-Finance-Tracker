import React, { cloneElement, useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpense from "../Modal/AddExpense";
import AddIncome from "../Modal/AddIncome";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
 
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
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    // setTransaction([...TransactionResult,newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false)
    addTransaction(newTransaction);
    // calculateBalance();
  };

  // const calculateBalance =()=>{
  //   let incomeTotal = 0;
  //   let expenseTotal = 0;
  //   transactions.forEach((transaction)=>{
  //     if(transaction.type==='income'){
  //       incomeTotal+=transaction.amount;
  //     }
  //     else{
  //       expenseTotal+=transaction.amount;
  //     }
  //   });
  //   setIncome(incomeTotal);
  //   setExpense(expenseTotal);
  //   setCurrentBalance(incomeTotal-expenseTotal);
  // };
  useEffect(()=>{
    // calculateBalance();
    fetchTransactions();
   
  },[user]);

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);
      if (!many) {
        toast.success("Transaction Added");
      }
    } catch (e) {
      console.error("error adding document", e);
      if (!many) {
        toast.error("Couldn't add transactions");
      }
    }
  }
  async function fetchTransactions() {
    console.log(user);
    setLoading(true);
    
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapShot = await getDocs(q);
      let transactionsArray = [];
      querySnapShot.forEach((doc) => {
        transactionsArray.push(doc.data());
         console.log(transactionsArray);
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched");
    }
   
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <Header />
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
