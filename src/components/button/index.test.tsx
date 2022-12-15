import * as React from 'react';
import { render } from '@testing-library/react';

import { Button } from '.';

test('should render successfully', () => {
	const { asFragment } = render(<Button />);

	expect(asFragment()).toMatchSnapshot();
	expect(true).toBeTruthy();
});
