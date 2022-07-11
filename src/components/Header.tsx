import React, { useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Icon, Menu, MenuItem } from '@material-ui/core';

import { authContext } from '../auth/authContext';

interface IHeader {
  title: string;
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  userMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid rgb(224, 224, 224)',
    '& > *': {
      marginBottom: '5px',
    },
  },
}));

export const Header = React.memo(function (props: IHeader) {
  const classes = useStyles();

  const { title } = props;

  const { user, onSignOut } = useContext(authContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    onSignOut();
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="User"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box className={classes.userMenu}>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
            <div>{user?.name}</div>
            <small>{user?.email}</small>
          </Box>
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      ></Toolbar>
    </React.Fragment>
  );
});
