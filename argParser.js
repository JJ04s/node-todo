export default function argParser(command, args) {
  const parsedArgs = {};

  switch (command) {
    case "add":
      parsedArgs.content = args.join(" ");
      break;
    case "delete":
      parsedArgs.id = Number(args[0]);
      break;
    case "update":
      const [id, ...content] = args;
      parsedArgs.id = Number(id);
      parsedArgs.content = content.join(" ");
      break;
    case "done":
      parsedArgs.id = Number(args[0]);
      break;
    case "list":
      break;
  }

  return parsedArgs;
}
