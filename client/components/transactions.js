// import React from 'react'
// import {Table, TableHead, TableRow, TableCell} from 'react-toolbox/lib/table';
import { connect } from 'react-redux';

// //for most up-to-date docs on tables:
// //https://github.com/react-toolbox/react-toolbox/tree/dev/components/table#data-table

// class Transactions extends React.Component {
//     render() {
//         return (
//             <Table>
//                 {/* <TableHead>THIS IS THE TABLE HEAD</TableHead> */}
//                 <TableRow>
//                     <TableCell>{data[0].Date}</TableCell>
//                     <TableCell>{data[0].Account}</TableCell>
//                     <TableCell>{data[0].Description}</TableCell>
//                     <TableCell>{data[0].Amount}</TableCell>
//                     <TableCell>{data[0].Category}</TableCell>
//                 </TableRow>
//             </Table>
//                 // <div>
//                 // <Table celled>
//                 //     <Table.Header>
//                 //         <Table.Row>
//                 //             <Table.HeaderCell>Date</Table.HeaderCell>
//                 //             <Table.HeaderCell>Account</Table.HeaderCell>
//                 //             <Table.HeaderCell>Description</Table.HeaderCell>
//                 //             <Table.HeaderCell>Amount</Table.HeaderCell>
//                 //             <Table.HeaderCell>Category</Table.HeaderCell>
//                 //         </Table.Row>
//                 //     </Table.Header>
        
//                 //     <Table.Body>
//                 //         {
//                 //             this.props.transactions.map(transaction => {
//                 //               return <Table.Row key={transaction.id}>
//                 //                         <Table.Cell>
//                 //                             {transaction.date}
//                 //                         </Table.Cell>
//                 //                         <Table.Cell>
//                 //                             {transaction.account}
//                 //                         </Table.Cell>
//                 //                         <Table.Cell>
//                 //                             {transaction.description}
//                 //                         </Table.Cell>
//                 //                         <Table.Cell>
//                 //                             {transaction.amount}
//                 //                         </Table.Cell>
//                 //                         <Table.Cell>
//                 //                             {transaction.category}
//                 //                         </Table.Cell>
//                 //                     </Table.Row>
//                 //             })
//                 //         }
//                 //     </Table.Body>
//                 // </Table>
//                 // </div>
//         )
//     }
// }




import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
// import Tooltip from '../../components/tooltip';

// const data = [
//   {name: 'Cupcake', calories: 305, fat: 3.7, sodium: 413, calcium: '3%', iron: '8%'},
//   {name: 'Donut', calories: 452, fat: 25.0, sodium: 326, calcium: '2%', iron: '22%'},
//   {name: 'Eclair', calories: 262, fat: 16.0, sodium: 337, calcium: '6%', iron: '7%'},
//   {name: 'Frozen yogurt', calories: 159, fat: 6.0, sodium: 87, calcium: '14%', iron: '1%'},
//   {name: 'Gingerbread', calories: 356, fat: 16.0, sodium: 327, calcium: '7%', iron: '16%'},
//   {name: 'Ice cream sandwich', calories: 237, fat: 9.0, sodium: 129, calcium: '8%', iron: '1%'},
//   {name: 'Jelly bean', calories: 375, fat: 0.0, sodium: 50, calcium: '0%', iron: '0%'},
//   {name: 'KitKat', calories: 518, fat: 26.0, sodium: 54, calcium: '12%', iron: '6%'}
// ];

// const TooltipCell = Tooltip(TableCell);

// const sortByCaloriesAsc = (a, b) => {
//   if (a.calories < b.calories) return -1;
//   if (a.calories > b.calories) return 1;
//   return 0;
// };

// const sortByCaloriesDesc = (a, b) => {
//   if (a.calories > b.calories) return -1;
//   if (a.calories < b.calories) return 1;
//   return 0;
// };

class Transactions extends Component {

  render () {
    // const { sorted } = this.state;
    // const sortedData = this.getSortedData();
    return (
      <Table multiSelectable style={{ marginTop: 10 }}>
       {/* table headers */}
        <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
        </TableRow>

        {this.props.transactions.map(transaction => {
            return <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.category}</TableCell>
            </TableRow>
        })}


      </Table>
    );
  }
}


const mapState = state => {
    return {
        transactions: state.transactions
    }
}

export default connect(mapState)(Transactions)

