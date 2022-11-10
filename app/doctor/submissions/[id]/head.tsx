'use client'

import React, { FC } from 'react'

interface Props {
  params: { id: string };
}

const Head: FC<Props> = ({ params }) => {
  const { id } = params

  const title = `Submission #${id} | Big Challenge`;

  return (
    <>
      <title>{title}</title>
    </>
  )
}

export default Head