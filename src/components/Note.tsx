import React from 'react';
import { Box, Flex, Spacer, Tooltip, Button } from '@chakra-ui/react';
import { Rnd } from 'react-rnd';
import { RiDeleteBin2Line } from 'react-icons/ri';
import _NoteValue from 'src/utils/_NoteValue';
import Edit from './editNotev2';
import {overlaps} from 'src/utils/overlap'

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

	function checkCollision(e: any, d: any, id: string, bucket: string) {
		overlaps(id, bucket,props,1);
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
				data-draggable={true}
			>
				<Box overflow="hidden">
					<Flex p="1">
						<Edit
							onEditBucket={editComponentBucket}
							onEditText={editComponentSave}
							onEditNote={onNoteUpdate}
							note={note.text}
							bucket={note.bucket?note.bucket:''.trim()}
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
