import { toast } from 'react-toastify'
import { api } from '@api'
import { api as apiUtils, toast as toastUtils } from '@utils'

export const useDownloadPrescription = (submissionId: number) => {
  const toastId = toast.loading('Prescription download started, please wait...', {
    position: toastUtils.position
  })

  const toastOptions = toastUtils.updateConfig

  api.get(`/download/${submissionId}`)
    .then(res => {
      const binaryData = [res.data]

      // create file link in browser's memory
      const href = URL.createObjectURL(new Blob(binaryData, { type: 'application/plain' }))

      // create "a" HTML element with href to file & click
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', 'file.txt') // or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)

      toastOptions.type = 'success'
      toastOptions.render = 'Prescription downloaded successfully.'

      toast.update(toastId, toastOptions)
    })
    .catch(err => {
      toastOptions.type = 'error'
      toastOptions.render = apiUtils.getErrorMessage(err, 'Something went wrong while attempting to download the prescription.')

      toast.update(toastId, toastOptions)
    })
}
