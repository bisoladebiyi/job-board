import React from 'react'
import ApplicantLayout from '../../../components/Layout/applicant'
import { ROUTES_APPLICANT } from '../../../utils/constants'

const ApplicantDashbaord = () => {
  return (
    <ApplicantLayout activePage={ROUTES_APPLICANT.JOBS}>
    <div>Dashboard</div>
  </ApplicantLayout>
  )
}

export default ApplicantDashbaord