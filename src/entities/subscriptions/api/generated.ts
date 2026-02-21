import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    deactivateSubscription: build.mutation<
      DeactivateSubscriptionApiResponse,
      DeactivateSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/subscriptions/${queryArg}/deactivate`,
        method: "PUT",
      }),
    }),
    grantSubscription: build.mutation<
      GrantSubscriptionApiResponse,
      GrantSubscriptionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/subscriptions/grant`,
        method: "POST",
        body: queryArg,
      }),
    }),
    getAllSubscriptions: build.query<
      GetAllSubscriptionsApiResponse,
      GetAllSubscriptionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/subscriptions`,
        params: {
          pageable: queryArg,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as subscriptionsApi };
export type DeactivateSubscriptionApiResponse = unknown;
export type DeactivateSubscriptionApiArg = number;
export type GrantSubscriptionApiResponse = /** status 200 OK */ Subscription;
export type GrantSubscriptionApiArg = GrantSubscriptionRequest;
export type GetAllSubscriptionsApiResponse =
  /** status 200 OK */ PageSubscription;
export type GetAllSubscriptionsApiArg = Pageable;
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
export type Admin = {
  id?: number;
  email?: string;
  passwordHash?: string;
  name?: string;
  role?: "ADMIN";
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
};
export type Subscription = {
  id?: number;
  user?: User;
  planType?: "THREE_DAYS" | "ONE_WEEK" | "ONE_MONTH" | "THREE_MONTHS";
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  paymentId?: string;
  grantedByAdmin?: Admin;
  createdAt?: string;
};
export type GrantSubscriptionRequest = {
  telegramId?: number;
  username?: string;
  planType?: "THREE_DAYS" | "ONE_WEEK" | "ONE_MONTH" | "THREE_MONTHS";
  reason?: string;
};
export type SortObject = {
  unsorted?: boolean;
  sorted?: boolean;
  empty?: boolean;
};
export type PageableObject = {
  pageNumber?: number;
  paged?: boolean;
  pageSize?: number;
  offset?: number;
  sort?: SortObject;
  unpaged?: boolean;
};
export type PageSubscription = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  content?: Subscription[];
  number?: number;
  sort?: SortObject;
  empty?: boolean;
};
export type Pageable = {
  page?: number;
  size?: number;
  sort?: string[];
};
