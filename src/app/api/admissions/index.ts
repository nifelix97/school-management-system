import { apiSlice } from "../apiEntry";

export interface AdmissionApplication {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  nationalId: string;
  
  // Guardian
  guardianFullName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail?: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;

  // Location
  address: string;
  city: string;
  stateProvince: string;
  country: string;

  // Academic
  firstChoiceProgram: string;
  secondChoiceProgram?: string;
  thirdChoiceProgram?: string;
  previousEducation: string;
  previousSchoolInstitution: string;
  graduationYear: string;
  gpaGradeAverage?: string;
  testScores?: string;
  
  // Preferences
  needOnCampusHousing: string;
  preferredStartSemester: string;
  studyMode: string;
  
  // Additional
  languagesSpoken?: string;
  disabilitiesOrSpecialNeeds?: string;
  extracurricularActivities?: string;
  workExperience?: string;
  interestedInScholarships: string;
  needFinancialAid: string;
  preferredPaymentPlan?: string;

  // Payment
  paymentAmount: number;
  paymentPhoneNumber: string;

  // Files (handled via FormData)
  personalStatement?: File;
  photoIdPassport?: File;
  birthCertificate?: File;
  recommendationLetter?: File;
  highSchoolTranscript?: File;
  universityTranscript?: File;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface AdmissionResponse {
  registrationNumber: string;
  applicationId: string;
  transactionId: string;
}

export interface PaymentStatus {
  status: string;
  amount: number;
  ref: string;
  kind: string;
  phoneNumber: string;
}

export interface ApplicationStatus {
  status: string;
  firstName: string;
  lastName: string;
  firstChoiceProgram: string;
  registrationNumber: string;
  applicationId: string;
}

export const admissionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Submit Application (Multipary/FormData)
    submitApplication: builder.mutation<ApiResponse<AdmissionResponse>, FormData>({
      query: (body) => ({
        url: "/admissions/submit",
        method: "POST",
        body,
      }),
    }),

    // Check Payment Status (Registrar only)
    checkPaymentStatus: builder.query<ApiResponse<PaymentStatus>, string>({
      query: (ref) => `/admissions/payment/${ref}`,
    }),

    // Get Application Status
    getApplicationStatus: builder.query<ApiResponse<ApplicationStatus>, string>({
      query: (applicationId) => `/admissions/status/${applicationId}`,
    }),

    // Get All Applications (Registrar only)
    getAllApplications: builder.query<ApiResponse<any[]>, void>({
      query: () => "/admissions/all",
    }),

    // Get Pending Applications (Registrar only)
    getPendingApplications: builder.query<ApiResponse<any[]>, void>({
      query: () => "/admissions/pending",
    }),

    // Update Application Status (Registrar only)
    updateApplicationStatus: builder.mutation<ApiResponse<null>, { id: string; status: "approved" | "rejected" }>({
      query: ({ id, status }) => ({
        url: `/admissions/status/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useSubmitApplicationMutation,
  useCheckPaymentStatusQuery,
  useGetApplicationStatusQuery,
  useGetAllApplicationsQuery,
  useGetPendingApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = admissionsApi;
