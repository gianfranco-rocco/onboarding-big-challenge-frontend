import { api } from '@api'
import { IPaginationLinks, IPaginationMeta } from '@components/ui/tables'
import { ISubmission } from '@interfaces'
import { SubmissionStatus } from '@types';

interface Response {
    data: ISubmission[];
    links: IPaginationLinks;
    meta: IPaginationMeta;
}

export const useMySubmissions = async (page: number, status?: SubmissionStatus): Promise<Response> => {
  const url = status 
  ? `/my-submissions/${status}?page=${page}`
  : `/my-submissions?page=${page}`

  const { data } = await api.get(url)

  return data
}
