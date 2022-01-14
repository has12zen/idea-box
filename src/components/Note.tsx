import React from 'react';
import { Box, Flex, Spacer, Tooltip, Button } from '@chakra-ui/react';
import { Rnd } from 'react-rnd';
import { RiDeleteBin2Line } from 'react-icons/ri';
import _NoteValue from 'src/utils/_NoteValue';
import Edit from './editNotev2';

interface NoteComponentProps {
	note: _NoteValue;
	onDelete: (id: string) => void;
	onPositionChange: (id: string, x: number, y: number) => void;
	onScaleChange: (id: string, width: string, height: string) => void;
	onEditText: (id: string, text: string) => void;
	onBucketChange: (id: string, bucket: string) => void;
	onUpdateNote: (id: string, props: any) => void;
}

const Note: React.FC<NoteComponentProps> = (props) => {
	const note = props.note;
	let colour = {
		background: note.color,
	};

	const editComponentSave = (text: string) => {
		props.onEditText(note.key, text);
	};
	const editComponentBucket = (bucket: string) => {
		props.onBucketChange(note.key, bucket);
	};
	const onNoteUpdate = (args: any) => {
		props.onUpdateNote(note.key, args);
	};
	let renderButton: any = '';
	if (note.bucket === undefined || note.bucket === '') {
		renderButton = <Spacer />;
	} else {
		renderButton = (
			<>
				<Spacer />
				<Button
					disabled
					size="lg"
					variant="solid"
					isTruncated={true}
					style={{ pointerEvents: 'none' }}
				>
					{note.bucket}
				</Button>
				<Spacer />
			</>
		);
	}
	function checkOverlapUpdate(w: string, x: string, y: string, id: string) {
		if (w === x && y != '' && w === '') {
			props.onUpdateNote(id, { bucket: y });
		}
	}
	function overlaps(id: string, bucket: string) {
		let draggables = document.getElementsByClassName('react-draggable-note');
		console.log(Array.from(draggables).length);
		let result = false;
		let draggablesLength = Array.from(draggables).length;
		for (let i = 0; i < draggablesLength; i++) {
			let item = draggables[i] as HTMLElement;
			let flag = false;
			for (let j = 0; j < draggablesLength; j++) {
				if (i !== j) {
					let oItem = draggables[j] as HTMLElement;
					const rect1 = item.getBoundingClientRect();
					const rect2 = oItem.getBoundingClientRect();
					const bucket1 = item.getAttribute('bucket');
					const bucket2 = oItem.getAttribute('bucket');
					const isInHoriztonalBounds =
						rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
					const isInVerticalBounds =
						rect1.y < rect2.y + rect2.height &&
						rect1.y + rect1.height > rect2.y;
					result = isInHoriztonalBounds && isInVerticalBounds;
					// setCollision(result);
					if (result) {
					// console.table({ bucket,bucket1,bucket2, result}) ;
						flag = true;
						checkOverlapUpdate(
							bucket,
							bucket1 ? bucket1 : '',
							bucket2 ? bucket2 : '',
							id
						);
						checkOverlapUpdate(
							bucket,
							bucket2 ? bucket2 : '',
							bucket1 ? bucket1 : '',
							id
						);
						break;
					}
				}
			}
			if (flag) break;
		}
		return false;
	}

	function checkCollision(e: any, d: any, id: string, bucket: string) {
		overlaps(id, bucket);
	}

	return (
		<>
			<Rnd
				default={{
					x: note.x,
					y: note.y,
					width: note.width,
					height: note.height,
				}}
				enable
				style={{ ...colour, padding: '10px', borderRadius: '5px' }}
				minHeight={200}
				minWidth={200}
				onDragStop={(e, d) => {
					props.onPositionChange(note.key, d.x, d.y);
					checkCollision(e, d, note.key, note.bucket ? note.bucket : '');
				}}
				onResizeStop={(e, direction, ref, delta, position) => {
					props.onScaleChange(note.key, ref.style.width, ref.style.height);
					checkCollision(
						e,
						direction,
						note.key,
						note.bucket ? note.bucket : ''
					);
				}}
				className="react-draggable-note"
				bucket={note.bucket?.trim()}
			>
				<Box overflow="hidden">
					<Flex p="1">
						<Edit
							onEditBucket={editComponentBucket}
							onEditText={editComponentSave}
							onEditNote={onNoteUpdate}
						/>
						{renderButton}
						<Tooltip label="Delete Note">
							<Button
								size="lg"
								colorScheme="red.500"
								variant="ghost"
								style={{ padding: '2px' }}
								onClick={() => {
									props.onDelete(note.key);
								}}
							>
								<RiDeleteBin2Line color="red" />
							</Button>
						</Tooltip>
					</Flex>
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
			</Rnd>
		</>
	);
};

export default  Note;
