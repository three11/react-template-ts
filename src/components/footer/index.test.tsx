import * as React from 'react';
import { shallow } from 'enzyme';

import { Footer } from '@components';

jest.mock('react-inlinesvg');

describe('Footer component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Footer />);

		expect(tree).toMatchSnapshot();
	});
});
