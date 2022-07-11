import { Box, Container, Tab, Tabs } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import useExpenses from '../app/hooks';
import { IUser } from '../app/interfaces';
import { formatCurrency } from '../helpers/functions';
import { apiAuthLogout, apiGetUser } from '../services/apiService';
import { authContext } from '../auth/authContext';

import { Header } from '../components/Header';
import { ExpensesSummary } from '../components/ExpensesSummary';
import { ExpensesTable } from '../components/ExpensesTable';
import { ExpenseSelect } from '../components/ExpenseSelect';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      paddingTop: '3rem',
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
    },
    filter: {
      flex: 1,
    },
    loading: {
      width: '100wv',
      height: '100hv',
    },
  })
);

export default function ExpensesPage() {
  const classes = useStyles();

  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  const { yearMonth } = useParams<{ yearMonth: string }>();

  useEffect(() => {
    async function auth() {
      await apiGetUser().then(setUser);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    auth();
  }, []);

  const { expenses, totalExpenses, totalByCategory } = useExpenses(yearMonth);

  const navigate = useNavigate();

  const onChangeYearMonth = useMemo(() => {
    return (newYearMonth: string) => navigate(`/expenses/${newYearMonth}`);
  }, [navigate]);

  function onSignOut() {
    apiAuthLogout();
    setUser(null);
    navigate('/auth/login');
  }

  if (loading) {
    return (
      <Box className={classes.root}>
        <div className={classes.loading}>
          <Loading />
        </div>
      </Box>
    );
  }

  return (
    <authContext.Provider value={{ user, onSignOut }}>
      <Container>
        <Header title="Expenses v2.0 - React" />
        <Box className={classes.root}>
          <Box className={classes.filter}>
            <ExpenseSelect yearMonth={yearMonth} onChange={onChangeYearMonth} />
          </Box>
          <Box>
            Total Expenses: <strong>{formatCurrency(totalExpenses)}</strong>
          </Box>
        </Box>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered
          value={tab}
          onChange={(_evt, newTab) => setTab(newTab)}
        >
          <Tab label="Summary" />
          <Tab label="Details" />
        </Tabs>
        <Box className={classes.table}>
          {tab === 0 && <ExpensesSummary expensesCategory={totalByCategory} />}
          {tab === 1 && <ExpensesTable expenses={expenses} />}
        </Box>
        <Footer />
      </Container>
    </authContext.Provider>
  );
}
