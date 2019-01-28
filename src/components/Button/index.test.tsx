// eslint-disable-next-line no-unused-vars
import React from 'react';
import renderer from 'react-test-renderer';

import Button from '.';

describe('Button component', () => {
	it('should render successfully', () => {
		const tree = renderer.create(<Button />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
