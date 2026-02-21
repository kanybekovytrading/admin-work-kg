import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVacancyById: build.query<
      GetVacancyByIdApiResponse,
      GetVacancyByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/admin/vacancies/${queryArg}` }),
    }),
    updateVacancy1: build.mutation<
      UpdateVacancy1ApiResponse,
      UpdateVacancy1ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/vacancies/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateVacancyRequest,
      }),
    }),
    deleteVacancy: build.mutation<
      DeleteVacancyApiResponse,
      DeleteVacancyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/vacancies/${queryArg}`,
        method: "DELETE",
      }),
    }),
    getAllVacancies: build.query<
      GetAllVacanciesApiResponse,
      GetAllVacanciesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/vacancies`,
        params: {
          pageable: queryArg,
        },
      }),
    }),
    createVacancy1: build.mutation<
      CreateVacancy1ApiResponse,
      CreateVacancy1ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/vacancies`,
        method: "POST",
        body: queryArg.createVacancyAdminRequest,
        params: {
          adminUserId: queryArg.adminUserId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as legalApi };
export type GetVacancyByIdApiResponse = /** status 200 OK */ VacancyResponse;
export type GetVacancyByIdApiArg = number;
export type UpdateVacancy1ApiResponse = /** status 200 OK */ VacancyResponse;
export type UpdateVacancy1ApiArg = {
  id: number;
  updateVacancyRequest: UpdateVacancyRequest;
};
export type DeleteVacancyApiResponse = unknown;
export type DeleteVacancyApiArg = number;
export type GetAllVacanciesApiResponse =
  /** status 200 OK */ PageVacancyResponse;
export type GetAllVacanciesApiArg = Pageable;
export type CreateVacancy1ApiResponse = /** status 200 OK */ VacancyResponse;
export type CreateVacancy1ApiArg = {
  adminUserId: number;
  createVacancyAdminRequest: CreateVacancyAdminRequest;
};
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
export type City = {
  id?: number;
  nameRu?: string;
  nameEn?: string;
  isActive?: boolean;
  createdAt?: string;
};
export type Category = {
  id?: number;
  nameRu?: string;
  nameKy?: string;
  nameEn?: string;
  isActive?: boolean;
  createdAt?: string;
};
export type Subcategory = {
  id?: number;
  category?: Category;
  nameRu?: string;
  nameKy?: string;
  nameEn?: string;
  isActive?: boolean;
  createdAt?: string;
};
export type Resume = {
  id?: number;
  name?: string;
  age?: number;
  gender?: "MALE" | "FEMALE";
  city?: City;
  category?: Category;
  subcategory?: Subcategory;
  experience?: number;
  profilePhotoUrl?: string;
  description?: string;
  isActive?: boolean;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
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
export type VacancyResponse = {
  id?: number;
  vacancy?: Vacancy;
  resume?: Resume;
  applicant?: User;
  message?: string;
  status?: "PENDING" | "VIEWED" | "ACCEPTED" | "REJECTED";
  createdAt?: string;
  viewedAt?: string;
};
export type UpdateVacancyRequest = {
  title?: string;
  description?: string;
  salary?: string;
  companyName?: string;
  phone?: string;
  isActive?: boolean;
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
export type PageVacancyResponse = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  content?: VacancyResponse[];
  number?: number;
  sort?: SortObject;
  empty?: boolean;
};
export type Pageable = {
  page?: number;
  size?: number;
  sort?: string[];
};
export type CreateVacancyAdminRequest = {
  title?: string;
  description?: string;
  salary?: string;
  companyName?: string;
  phone?: string;
  cityId?: number;
  categoryId?: number;
  subcategoryId?: number;
};
