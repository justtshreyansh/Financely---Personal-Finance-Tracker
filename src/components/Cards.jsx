import React from 'react'
import "./Card.css";
import {Row,Card} from "antd";
import Button from "./Button";
const Cards = ({showExpenseModal,showIncomeModal}) => {
  return (
    <div>
      <Row className="my-row">
        <Card title="Current Balance" className="my-card">
            <p className=''>₹0</p>
            <Button text="Reset Balance" blue={true}/>
        </Card>
        <Card title="Total Income" className="my-card">
            <p className=''>₹0</p>
            <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card title="Total Balance" className="my-card">
            <p className=''>₹0</p>
            <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  )
}

export default Cards
