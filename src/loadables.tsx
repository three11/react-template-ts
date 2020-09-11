import * as React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

const fallback = <div className="c-loader" />;

// prettier-ignore
export const Login: LoadableComponent<any> = loadable(() => import('@containers/auth/login'), { fallback });

// prettier-ignore
export const Signup: LoadableComponent<any> = loadable(() => import('@containers/auth/signup'), { fallback });

// prettier-ignore
export const PasswordReset: LoadableComponent<any> = loadable(() => import('@containers/auth/password-reset'), { fallback });

// prettier-ignore
export const Home: LoadableComponent<any> = loadable(() => import('@containers/home'), { fallback });

// prettier-ignore
export const NotFound: LoadableComponent<any> = loadable(() => import('@containers/not-found'), { fallback });
