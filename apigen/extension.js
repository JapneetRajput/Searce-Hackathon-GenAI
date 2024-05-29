const vscode = require("vscode");
const fs = require("fs");

function activate(context) {
  console.log('Congratulations, your extension "apigen" is now active!');

  let disposable = vscode.commands.registerCommand(
    "apigen.writeToFile",
    function () {
      // Prompt user for input
      vscode.window
        .showInputBox({ prompt: "Enter text to write to file:" })
        .then((text) => {
          if (text) {
            // Prompt user for file path
            vscode.window
              .showInputBox({ prompt: "Enter file path to write:" })
              .then((filePath) => {
                if (filePath) {
                  // Write text to file
                  fs.writeFile(filePath, text, (err) => {
                    if (err) {
                      vscode.window.showErrorMessage(
                        `Error writing to file: ${err.message}`
                      );
                    } else {
                      vscode.window.showInformationMessage(
                        "Text written to file successfully."
                      );
                    }
                  });
                }
              });
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
