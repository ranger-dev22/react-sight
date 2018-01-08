//  Created by Grant Kang, William He, and David Sally on 9/10/17.
//  Copyright © 2017 React Sight. All rights reserved.

/* eslint-env jest */
import drawVBox from './breadcrumb';
import { mockBreadcrumbsDOM } from '../../test/fixtures';

describe('breadcrumb.js', () => {
  it('should draw a breadcrumb when valid data is passed', () => {
    document.body.innerHTML =
    '<div>' +
      '<h5>' +
        '<img src="./asset/floatinggif2.gif" id="logoHeader"> React Sight</h5>' +
      '<p>Hover over nodes to see State and Props</p>' +
      '<nav class="breadcrumb"></nav>' +
    '</div>';

    const expected =
      '<a class="breadcrumb-item" href="#">' +
        'Provider' +
      '</a>' +
      '<a class="breadcrumb-item" href="#">' +
        'BrowserRouter' +
      '</a>' +
      '<a class="breadcrumb-item" href="#">' +
        'Router' +
      '</a>' +
      '<a class="breadcrumb-item" href="#">' +
        'Component[2]' +
      '</a>';

    drawVBox(mockBreadcrumbsDOM.data[0]);
    const breadcrumb = document.querySelector('.breadcrumb').innerHTML;
    expect(breadcrumb).toEqual(expected);
  });

  it('getNodeNames() should abort if no data is passed', () => {
    document.body.innerHTML =
    '<div>' +
      '<h5>' +
        '<img src="./asset/floatinggif2.gif" id="logoHeader"> React Sight</h5>' +
      '<p>Hover over nodes to see State and Props</p>' +
      '<nav class="breadcrumb"></nav>' +
    '</div>';

    drawVBox();
    const breadcrumb = document.querySelector('.breadcrumb').innerHTML;
    expect(breadcrumb).toEqual('');
  });

  it('getNodeNames() should abort if data.name property is missing', () => {
    document.body.innerHTML =
    '<div>' +
      '<h5>' +
        '<img src="./asset/floatinggif2.gif" id="logoHeader"> React Sight</h5>' +
      '<p>Hover over nodes to see State and Props</p>' +
      '<nav class="breadcrumb"></nav>' +
    '</div>';

    const badData = {
      id: 4,
      isDOM: true,
      props: {},
      state: {},
      children: [],
    };

    drawVBox(badData);
    const breadcrumb = document.querySelector('.breadcrumb').innerHTML;
    expect(breadcrumb).toEqual('');
  });
});
