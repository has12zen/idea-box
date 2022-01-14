import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalStorage } from 'src/utils/useLocalStorage';
import _NoteValue, { defaultNote, colours } from 'src/utils/_NoteValue';
import { Flex, Box, Heading, Spacer, Button, Tooltip } from '@chakra-ui/react';
import _BucketValue, { defaultBucket } from 'src/utils/_BucketValue';
import { v4 } from 'uuid';
import { FaRegStickyNote } from 'react-icons/fa';
import { BsColumnsGap } from 'react-icons/bs';
import StandardView from 'src/components/StandardView';
import BucketView from 'src/components/bucketView';

const Home: NextPage = () => {
	const [_notes, setNotes] = useLocalStorage('notes', []);
	const [_buckets, setBuckets] = useLocalStorage('buckets', []);
	const [view, setView] = useState('standard');
	const [zoom, setZoom] = useState(100);
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
	function assignBuckets(selectedIndexes: number[], bucket: string) {
		const newList = _notes.map((note:_NoteValue, index:number) => {
			if (selectedIndexes.includes(index)) {
				return { ...note, bucket };
			}
			return note;
		});
		setNotes(newList);
	}

	function onNoteUpdate(id: string, props: any) {
		// console.log(props);
		const newList = _notes.map((note: _NoteValue) => {
			if (note.key === id) {
				return { ...note, ...props };
			}
			return note;
		});
		setNotes(newList);
	}
	function toggleView() {
		if (view === 'standard') {
			setView('bucket');
		} else setView('standard');
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

	function onDelete(id: string) {
		const newList = _notes.filter((item: _NoteValue) => item.key !== id);
		setNotes(newList);
	}
	function onDeleteBucket(id: string) {
		const newList = _buckets.filter((item: _BucketValue) => item.key !== id);
		setBuckets(newList);
	}

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
						<Tooltip label="Add highlight" aria-label="Add new highlight">
							<Button colorScheme="teal" onClick={handleAdd}>
								<FaRegStickyNote />
							</Button>
						</Tooltip>
					</Box>
					<Box>
						<Tooltip label="toggle view" aria-label="toggel view">
							<Button onClick={toggleView}>
								<BsColumnsGap />
							</Button>
						</Tooltip>
					</Box>
				</Flex>
				{view == 'standard' ? (
					<StandardView
						notes={_notes}
						onDelete={onDelete}
						onUpdateNote={onNoteUpdate}
						assignNotesToBucket={assignBuckets}
					/>
				) : (
					<BucketView notes={_notes} onUpdateNote={onNoteUpdate} />
				)}
			</main>
			<footer></footer>
		</div>
	);
};

export default Home;
