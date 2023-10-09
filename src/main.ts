import { Editor, MarkdownView, Plugin, TFile } from "obsidian";
import { getDataFromTextSync, writeFile } from "./utils/obsidian";
import { extractImagesFromPattern } from "./extractImagesFromPattern";
import { getNewTextFromResults } from "./getNewTextFromResults";

export default class ImageCaptionPlugin extends Plugin {
	private previousSaveCommand: (() => void) | undefined;

	runFileSync(file: TFile, editor: Editor) {
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

	registerEventsAndSaveCallback() {
		const saveCommandDefinition =
			this.app.commands.commands["editor:save-file"]!;
		this.previousSaveCommand = saveCommandDefinition.callback;

		if (typeof this.previousSaveCommand === "function") {
			saveCommandDefinition.callback = () => {
				// get the editor and file
				const editor =
					this.app.workspace.getActiveViewOfType(
						MarkdownView
					)?.editor;
				const file = this.app.workspace.getActiveFile();
				if (!editor || !file) return;
				const data = getDataFromTextSync(editor.getValue());
				// if (isFileIgnored(this.settings, file, data)) return;

				// this cannot be awaited because it will cause the editor to delay saving
				this.runFileSync(file, editor);

				// run the previous save command
				if (this.previousSaveCommand) this.previousSaveCommand();

				// defines the vim command for saving a file and lets the linter run on save for it
				// accounts for https://github.com/platers/obsidian-linter/issues/19
				const that = this;
				window.CodeMirrorAdapter.commands.save = () => {
					that.app.commands.executeCommandById("editor:save-file");
				};
			};
		}
	}
	unregisterEventsAndSaveCallback() {
		const saveCommandDefinition =
			this.app.commands.commands["editor:save-file"]!;
		saveCommandDefinition.callback = this.previousSaveCommand;
	}
	async onload() {
		this.registerEventsAndSaveCallback();
	}

	onunload() {
		this.unregisterEventsAndSaveCallback();
	}
}
