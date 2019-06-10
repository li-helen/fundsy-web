import React from 'react'
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import { connect } from 'react-redux';
import {Transactions} from '../../components'

class UncategorizedTransactions extends React.Component {
    render() {
        return (
            <div>
                <h3>Categorize your expenses</h3>
                {/* <Table style={{ marginTop: 10 }} selectable={false}>
                    <TableHead>
                        <TableCell>Date</TableCell>
                        <TableCell>Account</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Category</TableCell>
                    </TableHead>
                </Table> */}
               
                <Transactions transactions={this.props.uncategorizedTransactions}/>

            </div>
        )
    }
}

const mapState = state => {
    return {
        userId: state.user.id,
        uncategorizedTransactions: state.transactions.uncategorized
    }
}

export default connect(mapState)(UncategorizedTransactions)