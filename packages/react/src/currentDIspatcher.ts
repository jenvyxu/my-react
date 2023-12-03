import { Action } from 'shared/ReactTypes';

export interface Dispatcher {
	useState: <T>(initialState: (() => T) | T) => [T, Dispatch<T>];
}

export type Dispatch<State> = (action: Action<State>) => void;

// 内部数据共享层
const currentDispatcher: {
	current: Dispatcher | null;
} = { current: null };

export const resolveDispatcher = (): Dispatcher => {
	const dispatcher = currentDispatcher.current;

	if (dispatcher === null) {
		throw new Error('hook 只能再函数组件中执行');
	}

	return dispatcher;
};

export default currentDispatcher;
