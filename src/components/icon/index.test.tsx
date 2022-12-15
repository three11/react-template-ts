import * as React from 'react';
import { render } from '@testing-library/react';

import { Icon } from '.';

test('Icon component should render successfully', () => {
	const { asFragment } = render(<Icon src="@assets/logo.svg" />);

	expect(asFragment()).toMatchSnapshot();
});
