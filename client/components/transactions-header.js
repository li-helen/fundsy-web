import React from 'react'
import {Button} from 'react-toolbox/lib/button'

const TransactionsHeader = () => {
    return (
        <div>
            <h2>Expenses</h2>
            <Button label="Edit categories"/>
            <Button label="Add an expense" />
        </div>
    )
}

export default TransactionsHeader

