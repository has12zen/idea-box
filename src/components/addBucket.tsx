import React, { useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormControl,
	Input,
	FormLabel,
	Tooltip,
} from '@chakra-ui/react';
import {AiFillDelete} from 'react-icons/ai'

interface AddBucketProps {
	onAdd: (name: string) => void;
}

const AddNewBucket: React.FC<AddBucketProps> = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [bucket, setBucket] = useState('');
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	return (
		<>
			<Tooltip label="Add Bucket" aria-label="Add bucket">
				<Button onClick={onOpen}>
					<AiFillDelete />
				</Button>
			</Tooltip>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Bucket</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Bucket name</FormLabel>
							<Input
								placeholder="e.g. Bucket"
								maxLength={17}
								onChange={(event) => setBucket(event.currentTarget.value)}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3}
							onClick={() => {
                props.onAdd(bucket);
								onClose();
							}}
            >
							Save
						</Button>
						<Button
							onClick={() => {
								onClose();
							}}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default AddNewBucket;
