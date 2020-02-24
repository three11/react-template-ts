import * as React from 'react';
import * as Loadable from 'react-loadable';

export const Login: any = Loadable({
	loader: () => import('@containers/auth').then(({ Login }: any) => Login),
	loading: () => <div className="c-loader" />
});

export const Signup: any = Loadable({
	loader: () => import('@containers/auth').then(({ Signup }: any) => Signup),
	loading: () => <div className="c-loader" />
});

export const PasswordReset: any = Loadable({
	loader: () => import('@containers/auth').then(({ PasswordReset }: any) => PasswordReset),
	loading: () => <div className="c-loader" />
});

export const Home: any = Loadable({
	loader: () => import('@containers/home').then((comp: any) => comp),
	loading: () => <div className="c-loader" />
});

export const NotFound: any = Loadable({
	loader: () => import('@containers/not-found').then((comp: any) => comp),
	loading: () => <div className="c-loader" />
});
