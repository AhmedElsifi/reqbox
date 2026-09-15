import chalk from "chalk";
import boxen from "boxen";

export function showWelcome() {
  const logo = `                                    
                  ▄▄                
                  ██                
████▄ ▄█▀█▄ ▄████ ████▄ ▄███▄ ██ ██ 
██ ▀▀ ██▄█▀ ██ ██ ██ ██ ██ ██  ███  
██    ▀█▄▄▄ ▀████ ████▀ ▀███▀ ██ ██ 
               ██                   
               ▀▀                   `;
  const content = [
    chalk.bold.cyan(logo),
    chalk.gray("Interactive HTTP Client"),
    "",
    chalk.dim("Make HTTP requests directly from your terminal."),
  ].join("\n");

  console.log(
    boxen(content, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
      textAlignment: "center",
    }),
  );
}
