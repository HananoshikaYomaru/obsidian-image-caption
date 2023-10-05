import { Data } from "./utils/obsidian";

import { Image } from "./extractImagesFromPattern";
import dedent from "ts-dedent";
import { replaceOccurance } from "./utils/strings";

export const getNewTextFromResults = (data: Data, images: Image[]) => {
	let newText = data.text;
	for (let i = 0; i < images.length; i++) {
		// for each images, replace its full text with new text
		const image = images[i]!;
		const newImageText = dedent`
        %% caption ![${image.alt}](${image.src}) %% 
        <figure>
            <img src="${image.src}" alt="${image.alt}" title="${image.caption}"/>
            <figcaption>${image.caption}</figcaption>
        </figure>
        `;
		newText = replaceOccurance(
			newText,
			image.fullText,
			newImageText,
			image.id
		);
	}
	return newText;
};
