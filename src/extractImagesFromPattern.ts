const imageRegex = /(?:%%\s*caption\s*!\[.*?\]\(.*?\)\s*%%)/g;
const figureRegex = /\s*<figure>[\s\S]*?<\/figure>/g;

export type Image = {
	alt: string;
	src: string;
	caption: string;
	fullText: string;
	id: number;
};

export function extractImagesFromPattern(text: string) {
	const images: Image[] = [];
	const imagesSummary: {
		[imageTag: string]: number;
	} = {};
	const allImages = Array.from(text.matchAll(new RegExp(imageRegex)));
	// for each image, get the alt and src
	for (const imageMatch of allImages) {
		const imageText = imageMatch[0].replace(/%%/g, "").trim();
		// the text in [] is the alt, the text in () is the src
		const alt = imageText.match(/\[(.*?)\]/)?.[1] ?? "";
		const src = imageText.match(/\((.*?)\)/)?.[1] ?? "";

		// check if the next line of the image regex is a figure
		const lastIndex = (imageMatch.index ?? 0) + imageMatch[0].length;
		const id = (imagesSummary[imageText] =
			(imagesSummary[imageText] ?? 0) + 1);
		const figurePattern = new RegExp(figureRegex);
		figurePattern.lastIndex = lastIndex;
		const figureMatch = figurePattern.exec(text);

		const hasFigure =
			figureMatch !== null && figureMatch.index === lastIndex;

		const figure = hasFigure ? figureMatch![0] : "";

		images.push({
			alt,
			src,
			caption: alt.split("|")[0] ?? "",
			fullText: imageMatch[0] + figure,
			id,
		});
	}

	return images;
}
