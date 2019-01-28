import React from 'react';
import renderer from 'react-test-renderer';

import { HomePage } from '.';

describe('HomePage component', () => {
	it('should render successfully', () => {
		const tree = renderer.create(<HomePage counter={{ count: 0 }} dispatch={jest.fn()} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
