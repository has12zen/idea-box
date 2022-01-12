import React from 'react';
import { Box, Flex, Spacer, Tooltip, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Rnd } from 'react-rnd';
import _NoteValue from 'src/utils/_NoteValue';
import Edit from './editNote';

interface NoteComponentProps {
	note: _NoteValue;
	onDelete: (id: string) => void;
	onPositionChange: (id: string, x: number, y: number) => void;
	onScaleChange: (id: string, width: string, height: string) => void;
	onEditText: (id: string, text: string) => void;
}

const Note: React.FC<NoteComponentProps> = (props) => {
	const note = props.note;
	let colour = {
		background: note.color,
	};
	const editComponentSave = (text: string) => {
		props.onEditText(note.key, text);
	};
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
				style={{ ...colour, padding: '10px' }}
				minHeight={200}
				minWidth={200}
				onDragStop={(e, d) => {
					props.onPositionChange(note.key, d.x, d.y);
				}}
				onResizeStop={(e, direction, ref, delta, position) => {
					props.onScaleChange(note.key, ref.style.width, ref.style.height);
				}}
			>
				<Box overflow="hidden">
					<Flex p="1">
						<Edit onEditText={editComponentSave} />
						<Spacer />
						<Tooltip label="Delete note" color='red'>
							<IconButton
								aria-label="Edit note"
								variant="unstyled"
								color='red.600'
								onClick={() => {
									props.onDelete(note.key);
								}}
								icon={<DeleteIcon />}
							/>
						</Tooltip>
					</Flex>
					<Box p="3">
						<Box mt="1" fontWeight="semibold" as="h4" style={{whiteSpace:'pre-line'}}>
							{note.text}
						</Box>
					</Box>
				</Box>
			</Rnd>
		</>
	);
};

export default Note;
