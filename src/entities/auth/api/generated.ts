import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    refreshToken: build.mutation<RefreshTokenApiResponse, RefreshTokenApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/auth/refresh`,
        method: "POST",
        body: queryArg,
      }),
    }),
    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/api/admin/auth/logout`, method: "POST" }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/auth/login`,
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type RefreshTokenApiResponse = /** status 200 OK */ LoginResponse;
export type RefreshTokenApiArg = RefreshTokenRequest;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
export type LoginApiResponse = /** status 200 OK */ LoginResponse;
export type LoginApiArg = LoginRequest;
export type LoginResponse = {
  token?: string;
  refreshToken?: string;
  adminId?: number;
  email?: string;
  name?: string;
  role?: "ADMIN";
};
export type RefreshTokenRequest = {
  refreshToken?: string;
};
export type LoginRequest = {
  email?: string;
  password?: string;
};
