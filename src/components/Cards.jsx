import React from 'react'
import "./Card.css";
import {Row,Card} from "antd";
import Button from "./Button";
const Cards = ({showExpenseModal,showIncomeModal,income,expense,totalBalance}) => {
  return (
    <div>
      <Row className="my-row">
        <Card title="Current Balance" className="my-card">
            <p className=''>₹{totalBalance}</p>
            <Button text="Reset Balance" blue={true}/>
        </Card>
        <Card title="Total Income" className="my-card">
            <p className=''>₹{income}</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card title="Total Expense" className="my-card">
            <p className=''>₹{expense}</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  )
}

export default Cards
