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
		const nwNm = await vscode.window.showInputBox({
			prompt: 'Enter new name',
			placeHolder: 'Rename',
			validateInput: (text) => {
				return text.length === 0 ? 'Name Cannot be empty' : null;
			}
		});
		if (!nwNm){
			vscode.window.showInformationMessage('Rename Cancelled.');
			return;
		};

		const stLn = selection.start.line + 1;
		const edLn = selection.end.line + 1;

		vscode.window.showInformationMessage(
			`Success! Scope: Lines ${stLn} to ${edLn}. New NameL "${nwNm}.`
		);
	});
	context.subscriptions.push(dpsable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
