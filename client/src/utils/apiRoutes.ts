export const EMPLOYER_API_ROUTES = {
    LOGIN: '/api/auth/login?type=employer',
    LOGOUT: '/api/auth/logout?type=employer',
    SIGNUP: '/api/auth/signup?type=employer',
    ACTIVE_JOBS: '/api/employer/jobs/active',
    ARCHIVED_JOBS: '/api/employer/jobs/archived',
    JOBS: '/api/employer/jobs',
    APPLICATIONS: '/api/employer/applications'
}

export const APPLICANT_API_ROUTES = {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SIGNUP: '/api/auth/signup',
    UPLOAD_RESUME: '/api/applicant/upload-resume',
    GET_RESUME: '/api/applicant/get-resume',
    APPLY: '/api/applicant/jobs/apply',
    SAVE_JOB: '/api/applicant/jobs/save',
    GET_APPLIED: '/api/applicant/jobs/applied',
    GET_SAVED: '/api/applicant/jobs/saved',
    GET_JOBS: '/api/jobs'
}