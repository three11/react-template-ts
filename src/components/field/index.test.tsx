import * as React from 'react';
import { shallow } from 'enzyme';

import { Field } from '@components';

jest.mock('react-inlinesvg');

describe('Field component', () => {
	it('should render successfully', () => {
		const tree = shallow(
			<Field
				register={(): jest.Mock => jest.fn()}
				type="email"
				name="email"
				label="Email Address"
				error={{}}
				placeholder="someone@example.com"
			/>
		);

		expect(tree).toMatchSnapshot();
	});
});
