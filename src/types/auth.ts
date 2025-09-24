// types/auth.ts
export type LoginResponse = {
  accessToken?: string; // short-lived access token
  // any other fields your API returns on login (e.g. user info)
  message?: string;
  user?: {
    id: string;
    email: string;
    role?: string;
    // ...
  };
};

export type RefreshResponse = {
  accessToken?: string;
};
