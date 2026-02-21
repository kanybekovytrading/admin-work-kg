import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateUserPoints: build.mutation<
      UpdateUserPointsApiResponse,
      UpdateUserPointsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/points/users/${queryArg.userId}`,
        method: "PUT",
        body: queryArg.updatePointsRequest,
      }),
    }),
    getAllUsersBalances: build.query<
      GetAllUsersBalancesApiResponse,
      GetAllUsersBalancesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/points/users`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getUserTransactions: build.query<
      GetUserTransactionsApiResponse,
      GetUserTransactionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/points/users/${queryArg}/transactions`,
      }),
    }),
    getPointsStats: build.query<
      GetPointsStatsApiResponse,
      GetPointsStatsApiArg
    >({
      query: () => ({ url: `/api/admin/points/stats` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as pointsApi };
export type UpdateUserPointsApiResponse = /** status 200 OK */ User;
export type UpdateUserPointsApiArg = {
  userId: number;
  updatePointsRequest: UpdatePointsRequest;
};
export type GetAllUsersBalancesApiResponse =
  /** status 200 OK */ UserBalanceDto[];
export type GetAllUsersBalancesApiArg = {
  page?: number;
  size?: number;
};
export type GetUserTransactionsApiResponse =
  /** status 200 OK */ PointsTransaction[];
export type GetUserTransactionsApiArg = number;
export type GetPointsStatsApiResponse =
  /** status 200 OK */ PointsStatsResponse;
export type GetPointsStatsApiArg = void;
export type User = {
  id?: number;
  telegramId?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  language?: "RU" | "KY" | "EN";
  balance?: number;
  referralCode?: string;
  isBanned?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type UpdatePointsRequest = {
  newBalance?: number;
  reason?: string;
};
export type UserBalanceDto = {
  userId?: number;
  telegramId?: number;
  balance?: number;
  earned?: number;
  spent?: number;
  createdAt?: string;
};
export type PointsTransaction = {
  id?: number;
  amount?: number;
  type?:
    | "REFERRAL"
    | "TASK"
    | "SEARCH_ACCESS"
    | "ADMIN_GRANT"
    | "REGISTRATION"
    | "SUBSCRIPTION"
    | "REFUND"
    | "WITHDRAWAL"
    | "BOOST";
  description?: string;
  relatedId?: number;
  createdAt?: string;
};
export type PointsStatsResponse = {
  totalInSystem?: number;
  totalEarned?: number;
  totalSpent?: number;
};
