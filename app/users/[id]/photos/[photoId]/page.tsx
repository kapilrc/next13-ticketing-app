import React from 'react';

interface Props {
  params: { id: number; photoId: number };
}

const Page = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      Page {id} photoid {photoId}
    </div>
  );
};

export default Page;
