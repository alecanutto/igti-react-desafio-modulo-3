import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { apiAuthLogin } from '../services/apiService';
import { IAlert, IUser, IValidationErrors } from '../app/interfaces';
import { Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.xpeducacao.com.br/"
        target="_blank"
      >
        Expenses v2.0 - React (XP Educação)
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  copyright: {
    marginTop: '64px',
  },
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<IValidationErrors>({});

  const inputEmail = useRef<HTMLInputElement | null>();
  const inputPassword = useRef<HTMLInputElement | null>();

  const [alert, setAlert] = useState<IAlert | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setError({});
  }, [email, password]);

  const handleClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ open: false });
  };

  function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    const user: IUser = {
      email,
      password,
    };

    apiAuthLogin(user)
      .then(() => navigate('/expenses/2021-06'))
      .catch(() => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'Incorrect email or password',
        });
      });
  }

  function validate(): boolean {
    const currentErrors: IValidationErrors = {};
    if (!email) {
      currentErrors['email'] = 'E-mail is required';
      inputEmail.current?.focus();
    }
    if (!password) {
      currentErrors['password'] = 'Password is required';
      inputPassword.current?.focus();
    }
    setError(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            inputRef={inputEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            error={!!error?.email}
            helperText={error?.email}
          />
          <TextField
            inputRef={inputPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
            error={!!error?.password}
            helperText={error?.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        open={alert?.open}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert?.severity}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
