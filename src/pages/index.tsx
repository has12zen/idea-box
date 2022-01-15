import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useLocalStorage } from 'src/utils/useLocalStorage';
import _NoteValue, { defaultNote, colours } from 'src/utils/_NoteValue';
import { Flex, Box, Heading, Spacer, Button, Tooltip } from '@chakra-ui/react';
import _BucketValue, { defaultBucket } from 'src/utils/_BucketValue';
import { v4 } from 'uuid';
import { FaRegStickyNote } from 'react-icons/fa';
import { BsColumnsGap } from 'react-icons/bs';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import StandardView from 'src/components/StandardView';
import BucketView from 'src/components/bucketView';
import Navigation from 'src/components/Navigation';

const Home: NextPage = () => {
	const [_notes, setNotes] = useLocalStorage('notes', []);
	const [_buckets, setBuckets] = useLocalStorage('buckets', []);
	const [view, setView] = useState('standard');
	const [_pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
	const [_mode, setMode] = useState('light');
	function toggleMode() {
		setMode((mode) => (mode === 'light' ? 'dark' : 'light'));
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
	function assignBuckets(selectedIndexes: number[], bucket: string) {
		const newList = _notes.map((note: _NoteValue, index: number) => {
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

	function onDelete(id: string) {
		const newList = _notes.filter((item: _NoteValue) => item.key !== id);
		setNotes(newList);
	}

	function onDeleteBucket(id: string) {
		const newList = _buckets.filter((item: _BucketValue) => item.key !== id);
		setBuckets(newList);
	}

	const onScroll = (e: any) => {
		const delta = e.deltaY * -0.001;
		const newScale = _pos.scale + delta;
		if (newScale < 0.1) return;
		if (newScale > 8) return;
		const ratio = 1 - newScale / _pos.scale;
		setPos({
			scale: newScale,
			x: _pos.x + (e.clientX - _pos.x) * ratio,
			y: _pos.y + (e.clientY - _pos.y) * ratio,
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
					<Navigation />
					<Spacer />
					<Box p="2">
						<Heading as="h1" size="lg" alignContent="center" ml="5">
							Idea Box
						</Heading>
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
						<Tooltip label="toggle view" aria-label="toggle view">
							<Button onClick={toggleView}>
								<BsColumnsGap />
							</Button>
						</Tooltip>
					</Box>
				</Flex>
				<Flex>
					<div
						className="react-transform-wrapper"
						onWheelCapture={onScroll}
						style={{ width: '100%', height: '85vh' }}
					>
						{view == 'standard' ? (
							<StandardView
								notes={_notes}
								onDelete={onDelete}
								onUpdateNote={onNoteUpdate}
								assignNotesToBucket={assignBuckets}
								Position={_pos}
							/>
						) : (
							<BucketView
								notes={_notes}
								onUpdateNote={onNoteUpdate}
								Position={_pos}
							/>
						)}
					</div>
				</Flex>
			</main>
			<footer>
				<Flex p="6">
					<Spacer />
					<Box>
						<Tooltip label="Zoom reset" aria-label="Zoom reset">
							<Button
								onClick={() => {
									setPos({ x: 0, y: 0, scale: 1 });
								}}
							>
								<MdOutlineZoomOutMap />
							</Button>
						</Tooltip>
					</Box>
				</Flex>
			</footer>
		</div>
	);
};

export default Home;
