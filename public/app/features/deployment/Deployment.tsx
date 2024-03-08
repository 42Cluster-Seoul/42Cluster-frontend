import React from 'react';

import { PageLayoutType } from '@grafana/data';

import { Page } from '../../core/components/Page/Page';

const Deployment = () => {
  return (
    <Page navId="home" layout={PageLayoutType.Canvas} pageNav={{ text: 'Page not found' }}>
      <div>this is deployment page</div>
    </Page>
  );
};

export default Deployment;
