import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import { IExpense } from '../app/interfaces';
import { formatDecimal } from '../helpers/functions';

export const ExpensesTable = React.memo(function (props: {
  expenses: IExpense[];
}) {
  const { expenses } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Expenses">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Day</TableCell>
            <TableCell align="right">Amount (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.day}</TableCell>
              <TableCell align="right">{formatDecimal(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
