import * as React from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '@components/Button';
import { RootStore } from '@src/store';
import { CounterState } from './reducer';
import { increment, decrement } from './actions';
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
			<Button onClick={() => dispatch(decrement())}>-</Button>

			<Button onClick={() => dispatch({ type: DECREMENT_ASYNC })}>Async -</Button>

			<small>{counter.count}</small>

			<Button onClick={() => dispatch({ type: INCREMENT_ASYNC })}>Async +</Button>

			<Button onClick={() => dispatch(increment())}>+</Button>
		</div>

		<img src={ReduxSagaLogo as any} alt="Redux Saga Logo" style={{ display: 'block', margin: 'auto' }} />
	</React.Fragment>
);

export default connect(
	(
		store: RootStore
	): {
		readonly counter: CounterState;
	} => ({
		counter: store.counter
	})
)(Home);
