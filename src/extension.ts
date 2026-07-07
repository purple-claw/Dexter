import { text } from 'stream/consumers';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let dpsable = vscode.commands.registerCommand('scoped-renamer.renameInScope', async () => {
		const edtr = vscode.window.activeTextEditor;
		if (!edtr){
			vscode.window.showErrorMessage('No Active text editor found!.')
			return;
		}
		const selection = edtr.selection;
		if (selection.isEmpty){
			vscode.window.showWarningMessage('Please select a scope (highlight some text) before running this command!.');
			return;
		}
		const scptxt = edtr.document.getText(selection);

		const oldNm = await vscode.window.showInputBox({ // Handling Current name
			prompt: 'Enter the Variable name ',
			placeHolder: 'var',
			validateInput: (text) => {
				return text.length === 0 ? 'Variable name cannot be Empty.' : null;
			}
		});

		if (!oldNm){
			// vscode.window.showInformationMessage('Rename cancelled.');
			return;
		}

		const nwNm = await vscode.window.showInputBox({ // Handle Updated name.
			prompt: 'Enter new name',
			placeHolder: 'Rename',
			validateInput: (text) => {
				return text.length === 0 ? 'Name Cannot be empty' : null;
			}
		});
		if (!nwNm){
			// vscode.window.showInformationMessage('Rename Cancelled.');
			return;
		};

		// Regex Logic Implementation
		const escRgx = (string: string) => {
			return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		};

		const rgx = new RegExp(`\\b${escRgx(oldNm)}\\b`, 'g');
		if (!rgx.test(scptxt)) {
			vscode.window.showWarningMessage(`"${oldNm}" was not found in the selected scope.`);
			return;
		}

		rgx.lastIndex = 0;
		const nwScpTxt = scptxt.replace(rgx, nwNm);

		const scs = await edtr.edit(edtBldr => {
			edtBldr.replace(selection, nwScpTxt);
		});

		if (scs){
			const stLn = selection.start.line + 1;
			const edLn = selection.end.line + 1;

			vscode.window.showInformationMessage(
				`Success! Scope: Lines ${stLn} to ${edLn}. New NameL "${nwNm}.`
			);
		} else {
			vscode.window.showErrorMessage('Failed to apply changes');
		}
	});
	context.subscriptions.push(dpsable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
