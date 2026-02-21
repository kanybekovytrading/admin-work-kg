import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllResumes: build.query<GetAllResumesApiResponse, GetAllResumesApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/resumes`,
        params: {
          pageable: queryArg,
        },
      }),
    }),
    getResumeById1: build.query<
      GetResumeById1ApiResponse,
      GetResumeById1ApiArg
    >({
      query: (queryArg) => ({ url: `/api/admin/resumes/${queryArg}` }),
    }),
    deleteResume: build.mutation<DeleteResumeApiResponse, DeleteResumeApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/resumes/${queryArg}`,
        method: "DELETE",
      }),
    }),
    countActiveResumes: build.query<
      CountActiveResumesApiResponse,
      CountActiveResumesApiArg
    >({
      query: () => ({ url: `/api/admin/resumes/stats/active-count` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as dashboardApi };
export type GetAllResumesApiResponse = /** status 200 OK */ PageResumeResponse;
export type GetAllResumesApiArg = Pageable;
export type GetResumeById1ApiResponse = /** status 200 OK */ ResumeResponse;
export type GetResumeById1ApiArg = number;
export type DeleteResumeApiResponse = unknown;
export type DeleteResumeApiArg = number;
export type CountActiveResumesApiResponse = /** status 200 OK */ number;
export type CountActiveResumesApiArg = void;
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
export type MediaResponse = {
  id?: number;
  mediaType?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  displayOrder?: number;
  uploadedAt?: string;
};
export type ResumeResponse = {
  id?: number;
  name?: string;
  age?: number;
  gender?: "MALE" | "FEMALE";
  cityName?: string;
  categoryName?: string;
  subcategoryName?: string;
  experience?: number;
  description?: string;
  telegramUsername?: string;
  isActive?: boolean;
  createdAt?: string;
  phone?: string;
  media?: MediaResponse[];
  cityId?: number;
  sphereId?: number;
  categoryId?: number;
  subcategoryId?: number;
  profilePhoto?: string;
  free?: boolean;
  boosted?: boolean;
};
export type PageResumeResponse = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  content?: ResumeResponse[];
  number?: number;
  sort?: SortObject;
  empty?: boolean;
};
export type Pageable = {
  page?: number;
  size?: number;
  sort?: string[];
};
