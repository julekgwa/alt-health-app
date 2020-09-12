import React from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  Container
} from 'app/components/containers/container';

export function Info() {

  const { info, } = useParams();

  return (
    <Container>
      {info}
    </Container>
  );

}
