import React, { FC } from 'react'

interface Props {
  user?: string;
  createdAt: string;
}

export const SubmissionSubtitle: FC<Props> = ({ user, createdAt }) => {
  return (
    <>
      {
        user &&
          <>
            <p>{user}</p>
            <p>&bull;</p>
          </>
      }
      <p>{createdAt}</p>
    </>
  )
}
