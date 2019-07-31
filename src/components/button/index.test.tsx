import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Button from '.';

describe('Button component', () => {
	it('should render successfully', () => {
		const tree = renderer.create(<Button />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
