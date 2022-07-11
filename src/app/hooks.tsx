import { useEffect, useMemo, useState } from 'react';
import { apiGetExpense } from '../services/apiService';
import { IExpense, IExpenseCategory } from './interfaces';

export default function useExpenses(yearMonth: string) {
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    apiGetExpense(yearMonth).then(setExpenses);
  }, [yearMonth]);

  return useMemo(() => {
    return {
      expenses,
      totalExpenses: totalExpenses(expenses),
      totalByCategory: totalCategory(expenses),
    };
  }, [expenses]);
}

function totalExpenses(expenses: IExpense[]) {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

function totalCategory(expenses: IExpense[]): IExpenseCategory[] {
  const result: IExpenseCategory[] = [];
  for (const expense of expenses) {
    const ce = result.find(({ category }) => category === expense.category);
    if (ce) {
      ce.expenseTotal += expense.amount;
    } else {
      result.push({
        category: expense.category,
        expenseTotal: expense.amount,
      });
    }
  }
  return result.sort((v1, v2) => v2.expenseTotal - v1.expenseTotal);
}
