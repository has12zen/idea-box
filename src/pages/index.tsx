import type { NextPage } from 'next';
import Head from 'next/head';
// import styles from 'public/styles/Home.module.css'
import Note from 'src/components/Note';
import { useLocalStorage } from 'src/utils/useLocalStorage';
import _NoteValue, { defaultNote, colours } from 'src/utils/_NoteValue';
import { Flex, Box, Heading, Spacer, Button, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddNewBucket from 'src/components/addBucket';
import Buckets from 'src/components/Buckets';
import _BucketValue,{defaultBucket} from 'src/utils/_BucketValue';
import { v4 } from 'uuid';

const Home: NextPage = () => {
	const [_notes, setNotes] = useLocalStorage('notes', []);
	const [_buckets, setBuckets] = useLocalStorage('buckets', []);
	function handleBucketAdd(name:string) {
		const newList = _buckets.concat({
			...defaultBucket,
			key: v4(),
			title:name,
		});
		setBuckets(newList);
	}

	//notes functions
	function handleAdd() {
		const randomColour = colours[Math.floor(Math.random() * colours.length)];
		const newList = _notes.concat({
			...defaultNote,
			key: v4(),
			color: randomColour,
		});
		setNotes(newList);
	}

	function onNoteUpdate(id: string, props: any) {
		const newList = _notes.map((note: _NoteValue) => {
			if (note.key === id) {
				return { ...note, ...props };
			}
			return note;
		});
		setNotes(newList);
	}

	function onBucketUpdate(id: string, props: any) {
		const newList = _buckets.map((note: _BucketValue) => {
			if (note.key === id) {
				return { ...note, ...props };
			}
			return note;
		});
		setBuckets(newList);
	}


	function onPostionChange(id: string, x: number, y: number) {
		onNoteUpdate(id, { x, y });
	}

	function onScaleChange(id: string, width: string, height: string) {
		onNoteUpdate(id, { width, height });
	}

	function onEditText(id: string, text: string) {
		onNoteUpdate(id, { text });
	}

	function onDelete(id: string) {
		const newList = _notes.filter((item: _NoteValue) => item.key !== id);
		setNotes(newList);
	}
	function onDeleteBucket(id: string) {
		const newList = _buckets.filter((item: _BucketValue) => item.key !== id);
		setBuckets(newList);
	}

	const loopNotes = () => {
		return _notes.map((note: _NoteValue) => {
			if (note.key)
				return (
					<Note
						key={note.key}
						note={note}
						onDelete={onDelete}
						onPositionChange={onPostionChange}
						onScaleChange={onScaleChange}
						onEditText={onEditText}
					/>
				);
		});
	};
	return (
		<div>
			<Head>
				<title>Idea Box</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Flex p="6">
					<Box p="2">
						<Heading size="md">Idea Box</Heading>
					</Box>
					<Spacer />
					<Box>
						<Tooltip label="Add highlight" aria-label='Add new highlight'>
							<Button colorScheme="teal" onClick={handleAdd}>
								<AddIcon />
							</Button>
						</Tooltip>
					</Box>
				<AddNewBucket onAdd={(bucketname)=>handleBucketAdd(bucketname)}/>
				</Flex>
				<Buckets DeleteBucket={onDeleteBucket} buckets={_buckets} UpdateBucket={onBucketUpdate}/>
				{loopNotes()}
			</main>

			<footer></footer>
		</div>
	);
};

export default Home;