import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Home } from '.';

jest.mock('react-inlinesvg');

describe('Home component', () => {
	it('should render successfully', () => {
		const tree = renderer.create(<Home counter={{ count: 0 }} dispatch={jest.fn()} />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
