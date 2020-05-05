import * as React from 'react';
import * as Loadable from 'react-loadable';

interface ESModule {
	readonly default: (...args: any[]) => any;
}

export const render = (module: ESModule): any => module.default;
export const loading = (): any => <div className="c-loader" />;

export const Login: any = Loadable({
	// prettier-ignore
	loader: () => import('@containers/auth/login' /* webpackChunkName: 'login' */).then(render),
	loading
});

export const Signup: any = Loadable({
	// prettier-ignore
	loader: () => import('@containers/auth/signup' /* webpackChunkName: 'signup' */).then(render),
	loading
});

export const PasswordReset: any = Loadable({
	// prettier-ignore
	loader: () => import('@containers/auth/password-reset' /* webpackChunkName: 'password-reset' */).then(render),
	loading
});

export const Home: any = Loadable({
	// prettier-ignore
	loader: () => import('@containers/home' /* webpackChunkName: 'home' */).then(render),
	loading
});

export const NotFound: any = Loadable({
	// prettier-ignore
	loader: () => import('@containers/not-found' /* webpackChunkName: 'not-found' */).then(render),
	loading
});
