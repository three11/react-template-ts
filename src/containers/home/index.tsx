import * as React from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '@components/button';
import { RootStore } from '@src/store';
import { increment, decrement } from './actions';
import { CounterState, CounterAction } from './reducer';
import { INCREMENT_ASYNC, DECREMENT_ASYNC } from './constants';

import './index.scss';

import * as ReduxSagaLogo from '@assets/redux-saga.png';

interface Counter {
	count: number;
}

interface Props {
	readonly counter: Counter;
	readonly dispatch: Dispatch;
}

export const Home = ({ counter, dispatch }: Props): React.ReactElement<any> => (
	<React.Fragment>
		<SVG src="assets/react.svg" className="c-svg-icon" />

		<div className="o-wrapper">
			<Button onClick={(): CounterAction => dispatch(decrement())}>-</Button>

			<Button onClick={(): CounterAction => dispatch({ type: DECREMENT_ASYNC })}>Async -</Button>

			<small>{counter.count}</small>

			<Button onClick={(): CounterAction => dispatch({ type: INCREMENT_ASYNC })}>Async +</Button>

			<Button onClick={(): CounterAction => dispatch(increment())}>+</Button>
		</div>

		<img src={ReduxSagaLogo as any} alt="Redux Saga Logo" style={{ display: 'block', margin: 'auto' }} />
	</React.Fragment>
);

export default connect((store: RootStore): {
	readonly counter: CounterState;
} => ({
	counter: store.counter
}))(Home);
