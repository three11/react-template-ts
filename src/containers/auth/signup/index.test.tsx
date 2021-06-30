import * as React from 'react';
import { shallow } from 'enzyme';

import { Signup } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities/hooks', () => ({
	useAppSelector: jest.fn()
}));

describe('Signup component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Signup />);

		expect(tree).toMatchSnapshot();
	});
});
