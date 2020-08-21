import * as React from 'react';
import { shallow } from 'enzyme';

import { Button } from '.';

describe('Button component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Button />);

		expect(tree).toMatchSnapshot();
	});
});
