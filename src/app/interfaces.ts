import { Color } from '@material-ui/lab';

export interface IExpense {
  id: number;
  description: string;
  category: string;
  amount: number;
  yearMonth: string;
  day: string;
}

export interface IUser {
  email: string;
  name?: string;
  password?: string;
}

export interface IValidationErrors {
  [field: string]: string;
}

export interface IAlert {
  open?: boolean;
  severity?: Color;
  message?: string;
}

export interface IExpenseCategory {
  category: string;
  expenseTotal: number;
}
