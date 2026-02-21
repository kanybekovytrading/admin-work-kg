import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDashboardStats: build.query<
      GetDashboardStatsApiResponse,
      GetDashboardStatsApiArg
    >({
      query: () => ({ url: `/api/admin/dashboard/stats` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as dashboardApi };
export type GetDashboardStatsApiResponse =
  /** status 200 OK */ DashboardResponse;
export type GetDashboardStatsApiArg = void;
export type Vacancy = {
  id?: number;
  title?: string;
  description?: string;
  salary?: string;
  companyName?: string;
  phone?: string;
  isActive?: boolean;
  minAge?: number;
  maxAge?: number;
  preferredGender?: "MALE" | "FEMALE" | "ANY";
  address?: string;
  schedule?: string;
  experienceInYear?: number;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
};
export type DashboardResponse = {
  totalUsers?: number;
  newUsersToday?: number;
  totalResumes?: number;
  activeResumes?: number;
  totalVacancies?: number;
  activeVacancies?: number;
  activeSubscriptions?: number;
  totalPointsInSystem?: number;
  pendingFeedback?: number;
  pendingWithdrawals?: number;
  recentVacancies?: Vacancy[];
};
