import * as React from 'react';
import { shallow } from 'enzyme';

import { Icon } from '.';

describe('Icon component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Icon src="@assets/logo.svg" />);

		expect(tree).toMatchSnapshot();
	});
});
