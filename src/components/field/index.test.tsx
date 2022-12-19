import * as React from 'react';
import { render } from '@testing-library/react';

import { Field } from '.';

test('Field component should render successfully', () => {
	const { asFragment } = render(
		<Field
			register={(): jest.Mock => jest.fn()}
			type="email"
			name="email"
			label="Email Address"
			error={{}}
			placeholder="someone@example.com"
		/>
	);

	expect(asFragment()).toMatchSnapshot();
});
