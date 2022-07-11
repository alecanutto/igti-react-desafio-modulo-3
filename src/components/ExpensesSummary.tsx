import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import { formatDecimal } from '../helpers/functions';
import { IExpenseCategory } from '../app/interfaces';

export const ExpensesSummary = React.memo(function (props: {
  expensesCategory: IExpenseCategory[];
}) {
  const { expensesCategory } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Expenses by category">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>

            <TableCell align="right">Amount (R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesCategory.map(row => (
            <TableRow key={row.category}>
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">
                {formatDecimal(row.expenseTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
