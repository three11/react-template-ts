import * as React from 'react';
import { render } from '@testing-library/react';

import { Page } from '.';

test('Page component should render successfully', () => {
	const { asFragment } = render(<Page />);

	expect(asFragment()).toMatchSnapshot();
});
