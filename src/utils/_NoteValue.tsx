interface _NoteValue {
	key:string;
  text: string;
	x: number;
	y: number;
	width: string;
	height: string;
	color: string;
	creator?:string;
	bucket?:string;
	selected?:boolean;
}
export default _NoteValue;

const defaultNote:_NoteValue={
	key: '',
	text: 'Click on edit to add text',
	x: 20,
	y: 20,
	width: '320px',
	height: '200px',
	color: '#ff0',
	creator: '',
	bucket: ''
}

const colours = [
	'#ff0',
	'#FF69B4',
	'#EE82EE',
	'#F08080',
	'#00FF00',
	'#40E0D0'
]
export {defaultNote,colours}