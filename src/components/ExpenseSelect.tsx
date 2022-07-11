import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface IExpenseSelectProps {
  yearMonth: string;
  onChange: (yearMonth: string) => void;
}

export const ExpenseSelect = React.memo(function (props: IExpenseSelectProps) {
  const classes = useStyles();

  const { yearMonth, onChange } = props;
  const [year, month] = yearMonth.split('-');

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="label-input-year">
          Year
        </InputLabel>
        <Select
          labelId="label-input-year"
          id="label-input-select-year"
          value={year}
          onChange={evt => onChange(`${evt.target.value}-${month}`)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="label-input-month">
          Month
        </InputLabel>
        <Select
          labelId="label-input-month"
          id="label-input-select-month"
          value={month}
          onChange={evt => onChange(`${year}-${evt.target.value}`)}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="01">Janeiro</MenuItem>
          <MenuItem value="02">Fevereiro</MenuItem>
          <MenuItem value="03">Março</MenuItem>
          <MenuItem value="04">Abril</MenuItem>
          <MenuItem value="05">Maio</MenuItem>
          <MenuItem value="06">Junho</MenuItem>
          <MenuItem value="07">Julho</MenuItem>
          <MenuItem value="08">Agosto</MenuItem>
          <MenuItem value="09">Setembro</MenuItem>
          <MenuItem value="10">Outubro</MenuItem>
          <MenuItem value="11">Novembro</MenuItem>
          <MenuItem value="12">Dezembro</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});
