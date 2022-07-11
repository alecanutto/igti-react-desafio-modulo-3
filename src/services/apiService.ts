import { IExpense, IUser } from '../app/interfaces';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://igti-react-backend-m3-acanuto.glitch.me';

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}

export async function apiGetAllExpenses(): Promise<IExpense[]> {
  const resp = await fetch(`${BASE_URL}/expenses`, {
    credentials: 'include',
  });
  return handleResponse(resp);
}

export async function apiGetExpense(yearMonth: string): Promise<IExpense[]> {
  const resp = await fetch(
    `${BASE_URL}/expenses?yearMonth=${yearMonth}&_sort=day`,
    {
      credentials: 'include',
    }
  );
  return handleResponse(resp);
}

export async function apiGetUser(): Promise<IUser> {
  const resp = await fetch(`${BASE_URL}/auth/user`, {
    credentials: 'include',
  });
  return handleResponse(resp);
}

export async function apiSaveUser(user: IUser): Promise<IUser> {
  const resp = await fetch(`${BASE_URL}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return handleResponse(resp);
}

export async function apiAuthLogin(user: IUser): Promise<IUser> {
  const resp = await fetch(`${BASE_URL}/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return handleResponse(resp);
}

export async function apiAuthLogout(): Promise<void> {
  const resp = await fetch(`${BASE_URL}/auth/logout`, {
    credentials: 'include',
  });
  return handleResponse(resp);
}
