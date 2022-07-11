import React from 'react';
import { IUser } from '../app/interfaces';

interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: 'Anônimo',
    email: '',
  },
  onSignOut: () => {},
});
