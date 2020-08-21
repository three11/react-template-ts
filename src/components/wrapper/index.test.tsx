import * as React from 'react';
import { shallow } from 'enzyme';

import { Wrapper } from '.';

describe('Wrapper component', () => {
	it('should render successfully', () => {
		const tree = shallow(<Wrapper>Test content</Wrapper>);

		expect(tree).toMatchSnapshot();
	});
});
