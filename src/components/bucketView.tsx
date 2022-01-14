import {
	Box,
	Flex,
	Spacer,
	Heading,
	Tooltip,
	IconButton,
	Stack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import _NoteVAlue from 'src/utils/_NoteValue';
import Draggable from 'react-draggable';
import { overlaps } from 'src/utils/overlap';
interface BucketViewProps {
	notes: _NoteVAlue[];
	onUpdateNote: (id: string, props: any) => void;
}
interface RenderBucket {
	title: string;
	x: number;
	y: number;
	width: string;
	color: string;
	height: string;
	children: _NoteVAlue[];
}
const defaultBucket: RenderBucket = {
	title: '',
	x: 0,
	y: 0,
	color: '#fff',
	width: '320px',
	height: '240px',
	children: [],
};

const BucetView: React.FC<BucketViewProps> = (props) => {
	const notes = props.notes;
	let bucketslist = [''];
	const [_buck, setBuck] = useState('');
	notes.map((note) => {
		if (note.bucket !== undefined) {
			if (!bucketslist.includes(note.bucket.trim())) {
				bucketslist.push(note.bucket.trim());
			}
		}
	});
	const dragnote = (id: string, bucket: string) => {
		overlaps(id, bucket, props,2);
		setBuck(bucket);
	};
	const childrenLoop = (bucket: string) => {
		const keylist: string[] = [];
		return notes.map((note) => {
			let colour = {
				background: note.color,
			};
			if (keylist.includes(note.key)||note.bucket!==bucket) {
				return;
			}
			keylist.push(note.key);
			return (
				<Draggable
					key={note.key}
					onStop={(e, data) => {
						dragnote(note.key, note.bucket ? note.bucket : '');
					}}
				>
					<Box
						style={{
							...colour,
							padding: '10px',
							borderRadius: '5px',
							zIndex: 100,
							minWidth: '230px',
							maxWidth: '600px',
							minHeight: '100px',
							maxHeight: '400px',
						}}
						overflow="hidden"
						bucket={note.bucket}
						className="react-draggable-note"
						buck={_buck}
					>
						<Flex p="1"></Flex>
						<Box p="3">
							<Box
								mt="1"
								fontWeight="semibold"
								as="h4"
								style={{ whiteSpace: 'pre-line' }}
							>
								{note.text}
							</Box>
						</Box>
					</Box>
				</Draggable>
			);
		});
	};

	const bucketLoop = () => {
		return bucketslist.map((bucket: string, i) => {
			return (
				<>
					<Box backgroundColor={bucket===''?'#fff':'#808080'} className="bucket-bucketView" marginLeft={15} style={{padding:'10px',borderRadius:'15px',height:'fit-content', maxWidth:'500px'}}>
						<Flex p="1">
							<Spacer />
							{bucket !== '' ? (
								<Heading fontSize={'2xl'} fontFamily={'body'} overflow='hidden'>
									{bucket}
								</Heading>
							) : (
								<></>
							)}
							<Spacer />
						</Flex>
						<Box p="3">
							<Stack spacing="10px">{childrenLoop(bucket)}</Stack>
						</Box>
					</Box>
				</>
			);
		});
	};

	return <Flex>{bucketLoop()}</Flex>;
};

export default BucetView;
