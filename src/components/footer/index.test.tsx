import * as React from 'react';
import { shallow } from 'enzyme';

import { Footer } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

describe('Footer component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Footer />);

		expect(tree).toMatchSnapshot();
	});
});
