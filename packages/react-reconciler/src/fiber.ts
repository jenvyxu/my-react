import { Key, Props, ReactElementType, Ref } from 'shared/ReactTypes';
import {
	Fragment,
	FunctionComponent,
	HostComponent,
	WorkTag
} from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { Lane, Lanes, NoLane, NoLanes } from './fiberLanes';

export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	memoizedState: any;
	// 双缓存
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;

	updateQueue: unknown;
	delections: FiberNode[] | null;

	constructor(tag: WorkTag, props: Props, key: Key) {
		this.tag = tag;
		this.key = key || null;
		this.stateNode = null;
		this.type = null;
		// 树状结构
		// 指向父fiberNode
		this.return = null;
		this.sibling = null;
		this.child = null;
		// 同级节点的index
		this.index = 0;

		this.ref = null;

		this.pendingProps = props;
		this.memoizedProps = null;
		this.memoizedState = null;
		this.updateQueue = null;

		this.alternate = null;
		// 副作用 更新删除节点
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.delections = null;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	pendingLanes: Lanes;
	finishedLane: Lane;

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
		this.pendingLanes = NoLanes;
		this.finishedLane = NoLane;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
) => {
	let wip = current.alternate;
	const { type, updateQueue, child, memoizedProps, memoizedState } = current;
	if (wip === null) {
		// mount
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
		wip.subtreeFlags = NoFlags;
		wip.delections = null;
	}
	wip.type = type;
	wip.updateQueue = updateQueue;
	wip.child = child;
	wip.memoizedProps = memoizedProps;
	wip.memoizedState = memoizedState;

	return wip;
};

export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fiberTag: WorkTag = FunctionComponent;

	if (typeof type === 'string') {
		// <div/> -> type: 'div'
		fiberTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', element);
	}

	const fiber = new FiberNode(fiberTag, props, key);
	fiber.type = type;
	return fiber;
}

export function createFiberFromFragment(elements: any[], key: Key) {
	return new FiberNode(Fragment, elements, key);
}
