/* eslint-disable react/display-name */
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { boxesIntersect, useSelectionContainer } from 'react-drag-to-select';
import _NoteValue from 'src/utils/_NoteValue';
import Note from './Note';
import Edit from 'src/components/editNotev2';

interface StandardProps {
	notes: _NoteValue[];
	onDelete: (id: string) => void;
	onUpdateNote: (id: string, data: any) => void;
	assignNotesToBucket: (selectIndexs: number[], bucket: string) => void;
}

const StandardView: React.FC<StandardProps> = (props) => {
	const [selectionBox, setSelectionBox] = useState();
	const [selectedIndexes, setSelectedIndexes] = useState<any[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [_bucket, setBucket] = useState('');
	const [tisOpen, setTisOpen] = useState(false);
	const [_note, setNote] = useState({
		text: '',
		bucket: '',
		id: '',
	});
	const notes = props.notes;

	const handleSelectionChange = useCallback((box) => {
		setSelectionBox(box);
		const indexesToSelect: any[] = [];
		const elementsContainer = document.getElementsByClassName(
			'react-draggable-note'
		);
		if (elementsContainer) {
			Array.from(elementsContainer).forEach((item, index) => {
				const { left, top, width, height } = item.getBoundingClientRect();
				if (boxesIntersect(box, { left, top, width, height })) {
					indexesToSelect.push(index);
				}
			});
		}
		setSelectedIndexes(indexesToSelect);
	}, []);

	function onPostionChange(id: string, x: number, y: number) {
		props.onUpdateNote(id, { x, y });
	}

	function onScaleChange(id: string, width: string, height: string) {
		props.onUpdateNote(id, { width, height });
	}

	const editNoteModal = (id: string) => {
		let currNote = notes.find((note) => note.key === id);
		if (currNote != undefined) {
			setNote({
				text: currNote.text,
				bucket: currNote.bucket ? currNote.bucket : '',
				id: currNote.key,
			});
		}
		setTisOpen(true);
	};

	const loopNotes = () => {
		return notes.map((note: _NoteValue, index) => {
			if (note.key)
				return (
					<Note
						key={note.key}
						note={note}
						onDelete={props.onDelete}
						onPositionChange={onPostionChange}
						onScaleChange={onScaleChange}
						onUpdateNote={props.onUpdateNote}
						classname={selectedIndexes.includes(index) ? 'selected' : ''}
						triggerEdit={editNoteModal}
					/>
				);
		});
	};
	const closeModal = () => {
		setSelectedIndexes([]);
		onClose();
	};
	const { DragSelection } = useSelectionContainer({
		onSelectionChange: handleSelectionChange,
		isEnabled: !isOpen && !tisOpen,
		selectionProps: {
			style: {
				border: '2px dashed purple',
				borderRadius: 4,
				backgroundColor: 'brown',
				opacity: 0.4,
				marginTop: 90,
			},
		},
		onSelectionEnd: () => {
			// console.log('selection end', selectedIndexes);
			if (selectedIndexes.length > 0) {
				onOpen();
			}
		},
	});
	// console.log(props, 'selprops');
	return (
		<div className="container" style={{ padding: '50px' }}>
			<DragSelection />
			<div
				id="elements-container"
				style={{
					display: 'grid',
					gridTemplateColumns: '100px 100px 100px 100px',
					gap: '20px 20px',
				}}
				className="elements-container"
			>
				{loopNotes()}
			</div>
			<Edit
				title="Assign bucket to selection"
				editIsOpen={isOpen}
				editOnSubmit={() => {
					props.assignNotesToBucket(selectedIndexes, _bucket.trim());
					closeModal();
				}}
				editOnClose={closeModal}
				editOnOpen={onOpen}
			>
				<FormControl>
					<FormLabel>Bucket</FormLabel>
					<Input
						id="bucket"
						placeholder="Bucket"
						value={_bucket}
						onChange={(event) => setBucket(event.currentTarget.value)}
					/>
				</FormControl>
			</Edit>
			<Edit
				title="Edit note"
				editIsOpen={tisOpen}
				editOnSubmit={() => {
					props.onUpdateNote(_note.id, {
						text: _note.text,
						bucket: _note.bucket,
					});
					setTisOpen(false);
				}}
				editOnClose={() => {
					setTisOpen(false);
				}}
				editOnOpen={() => {}}
			>
				<FormControl>
					<FormLabel>Bucket</FormLabel>
					<Input id="bucket" placeholder="Bucket" value={_note?.bucket} onChange={(event)=>{
						setNote({
							..._note,
							bucket: event.currentTarget.value,
						});
					}} />
				</FormControl>
				<FormControl>
					<FormLabel>Note</FormLabel>
					<Textarea id="note" value={_note?.text} placeholder="Note" onChange={(event)=>{
						setNote({
							..._note,
							text: event.currentTarget.value,
						});
					}} />
				</FormControl>
			</Edit>
		</div>
	);
};

export default StandardView;
