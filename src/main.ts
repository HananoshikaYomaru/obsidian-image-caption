import { Editor, MarkdownView, Plugin, TFile } from "obsidian";
import {
	getDataFromTextSync,
	isMarkdownFile,
	writeFile,
} from "./utils/obsidian";
import { extractImagesFromPattern } from "./extractImagesFromPattern";
import { getNewTextFromResults } from "./getNewTextFromResults";

export default class ImageCaptionPlugin extends Plugin {
	runFileSync(checking: boolean, editor: Editor, ctx: MarkdownView) {
		if (!ctx.file) return;
		if (checking) {
			return isMarkdownFile(ctx.file);
		}
		const data = getDataFromTextSync(editor.getValue());
		// recognise the patterns

		const images = extractImagesFromPattern(data.text);

		// if no sections, we can return early
		if (images.length === 0) return;

		const newText = getNewTextFromResults(data, images);

		// if new text, write File
		if (newText !== data.text) {
			writeFile(editor, data.text, newText);
		}
	}

	async onload() {
		this.addCommand({
			id: "run-file",
			name: "Generate image captions for current file",
			editorCheckCallback: this.runFileSync.bind(this),
		});
	}
}
