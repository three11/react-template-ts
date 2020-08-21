import * as React from 'react';
import { shallow } from 'enzyme';

import { Home } from '.';

describe('Home component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Home />);

		expect(tree).toMatchSnapshot();
	});
});
