import { DELIMITER } from './constants';
import { convertParam } from './convert-param';

export type MixedTypeModuleType = {
  convertParam: typeof convertParam;
  DELIMITER: typeof DELIMITER;
}
