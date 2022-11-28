export default {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
    },
    doctor: {
        home: '/doctor/submissions',
        submission: '/doctor/submissions/:id',
        taskHistory: '/doctor/task-history',
    },
    patient: {
        home: '/patient/submissions',
        submission: '/patient/submissions/:id',
        createSubmission: '/patient/submissions/create',
        profile: '/patient/profile'
    }
}