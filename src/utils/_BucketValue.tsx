interface _BucketValue {
	key:string;
  title: string;
	x: number;
	y: number;
	width?: string;
	height?: string;
	creator?:string;
	children:string[];
}
export default _BucketValue;

const defaultBucket:_BucketValue={
	key: '',
	title: 'Add title',
	x: 5,
	y: 5,
	creator: '',
	children: [],
}

export {defaultBucket}