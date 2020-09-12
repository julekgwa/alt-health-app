import React from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  Container
} from 'app/components/containers/container';

export function Report() {

  const { report, } = useParams();

  return (
    <Container>
      {report}
    </Container>
  );

}
