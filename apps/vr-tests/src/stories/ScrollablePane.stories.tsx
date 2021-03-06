/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { ScrollablePane, StickyPositionType, Sticky } from 'office-ui-fabric-react';
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';

const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4'];

const contentAreas: JSX.Element[] = [];
for (let i = 0; i < 5; i++) {
  contentAreas.push(createContentArea(i));
}

function createContentArea(index: number) {
  const color = colors[index];

  return (
    <div
      key={index}
      style={{
        backgroundColor: color
      }}
    >
      <Sticky stickyPosition={StickyPositionType.Both}>
        <div
          className="sticky"
          style={{
            padding: '5px 20px 5px 10px',
            fontSize: '13px',
            borderTop: '1px solid #000',
            borderBottom: '1px solid #000',
            color: '#201f1e'
          }}>Sticky Component #{index + 1}</div>
      </Sticky>
      <div className="textContent">{lorem(200)}</div>
    </div>
  );
}

storiesOf('ScrollablePane', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .executeScript('document.getElementsByClassName(\'ms-ScrollablePane--contentContainer\')[0].scrollTop = 9999')
        .snapshot('scrolled', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Default ScrollablePane Example', () => (
    <div
      style={{
        height: '600px',
        position: 'relative',
        maxHeight: 'inherit',
        width: '400px'
      }}
    >
      <ScrollablePane className="scrollablePaneDefaultExample"
        style={{ maxWidth: '400px', border: '1px solid #edebe9' }}>
        {contentAreas.map(ele => {
          return ele;
        })}
      </ScrollablePane>
    </div>
  ));
