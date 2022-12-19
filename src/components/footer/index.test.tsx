import * as React from 'react';
import { render } from '@testing-library/react';

import { Footer } from '.';

test('Footer component should render successfully', () => {
	const { asFragment } = render(<Footer />);

	expect(asFragment()).toMatchSnapshot();
});
