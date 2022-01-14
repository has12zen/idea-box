import React, { useState } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import {
	FormControl,
	FormLabel,
	ButtonGroup,
	Button,
	useDisclosure,
	Input,
	Textarea,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

interface EditComponentProps {
	onEditText: (text: string) => void;
	onEditBucket: (bucket: string) => void;
	onEditNote: (note: any) => void;
	note:string;
	bucket:string;
}

const Edit: React.FC<EditComponentProps> = (props) => {
	const [note, setNote] = useState(props.note);
	const [bucket, setBucket] = useState(props.bucket);
	const firstFieldRef = React.useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				size="lg"
				colorScheme="red.500"
				variant="ghost"
				onClick={onOpen}
				style={{ padding: '2px' }}
			>
				<RiEditBoxLine />
			</Button>
			<Modal
				isCentered
				onClose={onClose}
				isOpen={isOpen}
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Highlight</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Bucket</FormLabel>
							<Input
								id="bucket"
								placeholder="Bucket"
								value={bucket}
								onChange={(event) => setBucket(event.currentTarget.value.trim())}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Note</FormLabel>
							<Textarea
								id="note"
								value={note}
								placeholder="Note"
								onChange={(event) => setNote(event.currentTarget.value.trim())}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup d="flex" justifyContent="flex-end">
							<Button mr={3} variant="outline" onClick={onClose}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									// console.log(note,bucket,'note,bucket');
									if(note!==''&&bucket!==''){
										props.onEditNote({text:note,bucket:bucket});
									}
									else if (note != '') {
										props.onEditText(note);
									}
									else if (bucket != '') {
										props.onEditBucket(bucket);
									}
									onClose();
								}}
								colorScheme="teal"
							>
								Save
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Edit;
