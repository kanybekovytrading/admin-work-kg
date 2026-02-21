import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.mutation<GetAllUsersApiResponse, GetAllUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/users/search`,
        method: "POST",
        body: queryArg,
      }),
    }),
    toggleBanUser: build.mutation<
      ToggleBanUserApiResponse,
      ToggleBanUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/users/${queryArg}/ban`,
        method: "PATCH",
      }),
    }),
    getUserProfile1: build.query<
      GetUserProfile1ApiResponse,
      GetUserProfile1ApiArg
    >({
      query: (queryArg) => ({ url: `/api/admin/users/${queryArg}/profile` }),
    }),
    getUserActivity: build.query<
      GetUserActivityApiResponse,
      GetUserActivityApiArg
    >({
      query: (queryArg) => ({ url: `/api/admin/users/${queryArg}/activity` }),
    }),
    getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
      query: (queryArg) => ({ url: `/api/admin/users/${queryArg}` }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/users/${queryArg}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as usersApi };
export type GetAllUsersApiResponse = /** status 200 OK */ PageUser;
export type GetAllUsersApiArg = PageRequestDto;
export type ToggleBanUserApiResponse = unknown;
export type ToggleBanUserApiArg = number;
export type GetUserProfile1ApiResponse = /** status 200 OK */ UserProfileDto;
export type GetUserProfile1ApiArg = number;
export type GetUserActivityApiResponse = /** status 200 OK */ SubscriptionDto;
export type GetUserActivityApiArg = number;
export type GetUserByIdApiResponse = /** status 200 OK */ User;
export type GetUserByIdApiArg = number;
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = number;
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
export type PageUser = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  content?: User[];
  number?: number;
  sort?: SortObject;
  empty?: boolean;
};
export type PageRequestDto = {
  page?: number;
  size?: number;
  sort?: string[];
};
export type UserProfileDto = {
  id?: number;
  telegramId?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  category?: string;
  subcategory?: string;
  role?: string;
  registrationDate?: string;
};
export type SubscriptionDto = {
  status?: string;
  subscriptionHistory?: string;
  subscriptionDate?: string;
  totalMessages?: number;
};
