import { SendCommand } from '../../../errors';
import { commandCancel } from '../api/command';

async function sendCommandCancel(id) {
  try {
    let command = { command: 'stop', value: true };
    await commandCancel(command, id);
  } catch (e) {
    throw new SendCommand(e.name);
  }
}

export default sendCommandCancel;
