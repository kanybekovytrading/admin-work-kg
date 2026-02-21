import { workBaseApi as api } from "../../../shared/api/workBaseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    answerFeedback: build.mutation<
      AnswerFeedbackApiResponse,
      AnswerFeedbackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/feedback/${queryArg.id}/answer`,
        method: "POST",
        body: queryArg.answerFeedbackRequest,
      }),
    }),
    getAllFeedback: build.query<
      GetAllFeedbackApiResponse,
      GetAllFeedbackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/admin/feedback`,
        params: {
          pageable: queryArg,
        },
      }),
    }),
    getFeedbackById: build.query<
      GetFeedbackByIdApiResponse,
      GetFeedbackByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/admin/feedback/${queryArg}` }),
    }),
    getPendingFeedback: build.query<
      GetPendingFeedbackApiResponse,
      GetPendingFeedbackApiArg
    >({
      query: () => ({ url: `/api/admin/feedback/pending` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as feedbackApi };
export type AnswerFeedbackApiResponse = /** status 200 OK */ Feedback;
export type AnswerFeedbackApiArg = {
  id: number;
  answerFeedbackRequest: AnswerFeedbackRequest;
};
export type GetAllFeedbackApiResponse = /** status 200 OK */ PageFeedback;
export type GetAllFeedbackApiArg = Pageable;
export type GetFeedbackByIdApiResponse = /** status 200 OK */ Feedback;
export type GetFeedbackByIdApiArg = number;
export type GetPendingFeedbackApiResponse = /** status 200 OK */ Feedback[];
export type GetPendingFeedbackApiArg = void;
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
export type Feedback = {
  id?: number;
  message?: string;
  status?: "PENDING" | "ANSWERED";
  adminResponse?: string;
  answeredBy?: Admin;
  createdAt?: string;
  answeredAt?: string;
};
export type AnswerFeedbackRequest = {
  response?: string;
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
export type PageFeedback = {
  totalPages?: number;
  totalElements?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  size?: number;
  content?: Feedback[];
  number?: number;
  sort?: SortObject;
  empty?: boolean;
};
export type Pageable = {
  page?: number;
  size?: number;
  sort?: string[];
};
