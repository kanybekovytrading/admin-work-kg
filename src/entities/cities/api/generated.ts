import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCityById: build.query<GetCityByIdApiResponse, GetCityByIdApiArg>({
      query: (queryArg) => ({ url: `/api/admin/cities/${queryArg}` }),
    }),
    updateCity: build.mutation<UpdateCityApiResponse, UpdateCityApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/cities/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createCityRequest,
      }),
    }),
    deleteCity: build.mutation<DeleteCityApiResponse, DeleteCityApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/cities/${queryArg}`,
        method: "DELETE",
      }),
    }),
    getAllCities: build.query<GetAllCitiesApiResponse, GetAllCitiesApiArg>({
      query: () => ({ url: `/api/admin/cities` }),
    }),
    createCity: build.mutation<CreateCityApiResponse, CreateCityApiArg>({
      query: (queryArg) => ({
        url: `/api/admin/cities`,
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as citiesApi };
export type GetCityByIdApiResponse = /** status 200 OK */ City;
export type GetCityByIdApiArg = number;
export type UpdateCityApiResponse = /** status 200 OK */ City;
export type UpdateCityApiArg = {
  id: number;
  createCityRequest: CreateCityRequest;
};
export type DeleteCityApiResponse = unknown;
export type DeleteCityApiArg = number;
export type GetAllCitiesApiResponse = /** status 200 OK */ City[];
export type GetAllCitiesApiArg = void;
export type CreateCityApiResponse = /** status 200 OK */ City;
export type CreateCityApiArg = CreateCityRequest;
export type City = {
  id?: number;
  nameRu?: string;
  nameEn?: string;
  isActive?: boolean;
  createdAt?: string;
};
export type CreateCityRequest = {
  nameRu?: string;
  nameEn?: string;
  isActive?: boolean;
};
