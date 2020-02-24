import * as React from 'react';
import { shallow } from 'enzyme';

import { NotFound } from '.';

describe('NotFound component', () => {
	it('should render successfully', () => {
		const tree = shallow(<NotFound />);

		expect(tree).toMatchSnapshot();
	});
});
