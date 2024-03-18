import { SendCommand } from '../../../errors';
import { commandTemperature1 } from '../api/command';

async function sendCommandTemperature(id, desiredTemperature) {
  try {
    let commandTemperature = { command: 'temp', value: desiredTemperature };
    await commandTemperature1(commandTemperature, id);
  } catch (e) {
    throw new SendCommand(e.name);
  }
}

export default sendCommandTemperature;
