import * as React from 'react';
import * as Loadable from 'react-loadable';

export const LoadableHomeComponent: any = Loadable({
	loader: () => import('@containers/Home').then((comp: any) => comp),
	loading: () => <div className="c-loader" />
});

export const LoadableNotFoundComponent: any = Loadable({
	loader: () => import('@containers/NotFound').then((comp: any) => comp),
	loading: () => <div className="c-loader" />
});
