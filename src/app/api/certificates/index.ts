import type {
    Certificate,
    CertificateVerification,
    GenerateCertificateDto,
} from '../../../types/certificate';
import { apiSlice } from '../apiEntry';
import type { ApiResponse } from '../auth';

// Re-export types for convenience
export type {
    Certificate,
    CertificateVerification,
    GenerateCertificateDto
};

// --- API Slice Injection ---

export const certificatesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Generate certificate for completed course
    generateCertificate: builder.mutation<
      ApiResponse<Certificate>,
      string
    >({
      query: (courseId) => ({
        url: `/certificates/courses/${courseId}/generate`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Certificates', id: 'LIST' }],
    }),

    // Get certificate details
    getCertificate: builder.query<ApiResponse<Certificate>, string>({
      query: (certificateId) => `/certificates/${certificateId}`,
      providesTags: (_result, _error, id) => [{ type: 'Certificates', id }],
    }),

    // Verify certificate authenticity
    verifyCertificate: builder.query<ApiResponse<CertificateVerification>, string>({
      query: (verificationCode) => `/certificates/verify/${verificationCode}`,
    }),

    // Get all certificates for current user
    getMyCertificates: builder.query<ApiResponse<Certificate[]>, void>({
      query: () => '/certificates/my-certificates',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Certificates' as const, id })),
              { type: 'Certificates', id: 'LIST' },
            ]
          : [{ type: 'Certificates', id: 'LIST' }],
    }),
  }),
});

export const {
  useGenerateCertificateMutation,
  useGetCertificateQuery,
  useVerifyCertificateQuery,
  useGetMyCertificatesQuery,
} = certificatesApi;
