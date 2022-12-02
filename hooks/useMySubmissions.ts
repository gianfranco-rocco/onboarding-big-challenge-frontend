import { api } from '@api'
import { IPaginationLinks, IPaginationMeta } from '@components/ui/tables'
import { ISubmission } from '@interfaces'

interface Response {
    data: ISubmission[];
    links: IPaginationLinks;
    meta: IPaginationMeta;
}

export const useMySubmissions = async (page: number): Promise<Response> => {
  const { data } = await api.get(`/my-submissions?page=${page}`)

  return data
}
