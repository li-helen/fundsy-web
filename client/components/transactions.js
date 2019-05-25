import React from 'react'

import { connect } from 'react-redux';

// class Transactions extends React.Component {
//     render() {
//         return (
//                 <div>
//                 <Table celled>
//                     <Table.Header>
//                         <Table.Row>
//                             <Table.HeaderCell>Date</Table.HeaderCell>
//                             <Table.HeaderCell>Account</Table.HeaderCell>
//                             <Table.HeaderCell>Description</Table.HeaderCell>
//                             <Table.HeaderCell>Amount</Table.HeaderCell>
//                             <Table.HeaderCell>Category</Table.HeaderCell>
//                         </Table.Row>
//                     </Table.Header>
        
//                     <Table.Body>
//                         {
//                             this.props.transactions.map(transaction => {
//                               return <Table.Row key={transaction.id}>
//                                         <Table.Cell>
//                                             {transaction.date}
//                                         </Table.Cell>
//                                         <Table.Cell>
//                                             {transaction.account}
//                                         </Table.Cell>
//                                         <Table.Cell>
//                                             {transaction.description}
//                                         </Table.Cell>
//                                         <Table.Cell>
//                                             {transaction.amount}
//                                         </Table.Cell>
//                                         <Table.Cell>
//                                             {transaction.category}
//                                         </Table.Cell>
//                                     </Table.Row>
//                             })
//                         }
//                     </Table.Body>
//                 </Table>
//                 </div>
//         )
//     }
// }

// const mapState = state => {
//     return {
//         transactions: state.transactions
//     }
// }

// export default connect(mapState)(Transactions)

