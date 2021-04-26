import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';
const googleTranslateUrl =
	'https://translation.googleapis.com/language/translate/v2';

const Convert = ({ language, text }) => {
	const [translated, setTranslated] = useState('');
	const [debouncedText, setDebouncedText] = useState(text);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedText(text);
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [text]);

	useEffect(() => {
		const doTranslation = async () => {
			const { data } = await axios.post(
				googleTranslateUrl,
				{},
				{
					params: {
						q: debouncedText,
						target: language.value,
						key: apiKey,
					},
				},
			);
			setTranslated(data.data.translations[0].translatedText);
		};

		doTranslation();
	}, [language, debouncedText]);

	return <div className="ui header">{translated}</div>;
};

export default Convert;
