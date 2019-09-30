import { kebabCase } from 'lodash';

export const getFontWeightClass = ( slug ) => {
  if ( ! slug ) {
		return undefined;
	}

  return `has-${ kebabCase( slug ) }-font-weight`;
};
