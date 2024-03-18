import { SendCommand } from '../../../errors';
import { commandCast } from '../api/command';

async function sendCommandCast(id) {
  try {
    let command = { command: 'cast', value: true };
    await commandCast(command, id);
  } catch (e) {
    throw new SendCommand(e.name);
  }
}

export default sendCommandCast;
