import * as React from 'react';
import { shallow } from 'enzyme';

import { Login } from '.';

jest.mock('react-inlinesvg');
jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useSelector: jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

describe('Login component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Login />);

		expect(tree).toMatchSnapshot();
	});
});
