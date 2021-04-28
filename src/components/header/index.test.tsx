import * as React from 'react';
import { shallow } from 'enzyme';

import { Header } from '.';

jest.mock('react-redux', () => ({
	connect: (): jest.Mock => jest.fn(),
	useDispatch: (): jest.Mock => jest.fn()
}));

jest.mock('@utilities/hooks', () => ({
	useAppSelector: jest.fn()
}));

describe('Header component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Header />);

		expect(tree).toMatchSnapshot();
	});
});
