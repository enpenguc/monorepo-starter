// import { isNumber } from 'utils';
import { isNumber } from '@monorepo-starter/utils';
// import { isNumber } from '../../utils';

console.log(typeof isNumber);

export const checkIsValid = (): boolean => {
  const data = '12313';
  return isNumber(data);
};
