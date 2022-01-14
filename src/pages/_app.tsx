// import 'public/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';

function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<IconContext.Provider
				value={{
					style: {
						verticalAlign: 'middle',
						alignItems: 'center',
						justifyContent: 'space-between',
					},
				}}
			>
				<Component {...pageProps} />
			</IconContext.Provider>
		</ChakraProvider>
	);
}

export default App;
