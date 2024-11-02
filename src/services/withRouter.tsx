/** withRouter (HOC). Enhances a component by injecting `params` from `useParams` as a prop. */

import { ComponentType } from 'react';
import { useParams } from 'react-router-dom';

export function withRouter<T>(Component: ComponentType<T>) {
    return (props: Omit<T, 'params'>) => {
        const params = useParams();
        return <Component {...(props as T)} params={params} />;
    };
}