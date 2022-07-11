import React, { useRef, useState } from 'react';
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
import { Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { IAlert, IUser, IValidationErrors } from '../app/interfaces';
import { apiSaveUser } from '../services/apiService';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  copyright: {
    marginTop: '64px',
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<IValidationErrors>({});

  const inputName = useRef<HTMLInputElement | null>();
  const inputEmail = useRef<HTMLInputElement | null>();
  const inputPassword = useRef<HTMLInputElement | null>();

  const [alert, setAlert] = useState<IAlert | null>(null);

  const navigate = useNavigate();

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
      name,
      email,
      password,
    };
    apiSaveUser(user)
      .then(() => navigate('/auth/login'))
      .catch(() => {
        setAlert({
          open: true,
          severity: 'error',
          message: 'User already exists',
        });
      });
  }

  function validate(): boolean {
    const currentErrors: IValidationErrors = {};
    if (!name) {
      currentErrors['name'] = 'Name is required';
      inputName.current?.focus();
    }
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={inputName}
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={evt => {
                  setName(evt.target.value);
                  setError({});
                }}
                error={!!error?.name}
                helperText={error?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={evt => {
                  setEmail(evt.target.value);
                  setError({});
                }}
                error={!!error?.email}
                helperText={error?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={evt => {
                  setPassword(evt.target.value);
                  setError({});
                }}
                error={!!error?.password}
                helperText={error?.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="./login" variant="body2">
                Already have an account? Sign in
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
