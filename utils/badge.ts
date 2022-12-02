import { BadgeType } from "@components/ui/badges"
import { SubmissionStatus } from "@types"

export const typeBasedOnStatus = (status: SubmissionStatus): BadgeType => {
  switch(status) {
    case 'pending':
      return 'primary'
    case 'in_progress':
      return 'success'
    case 'done':
    default:
      return 'normal'
  }
}