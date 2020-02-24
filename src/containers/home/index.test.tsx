import * as React from 'react';
import { shallow } from 'enzyme';

import { Home } from '.';

jest.mock('react-inlinesvg');

describe('Home component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Home />);

		expect(tree).toMatchSnapshot();
	});
});
