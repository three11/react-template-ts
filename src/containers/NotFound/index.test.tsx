import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from '.';

describe('NotFound component', () => {
	it('should render successfully', () => {
		const tree = renderer.create(<NotFound />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
