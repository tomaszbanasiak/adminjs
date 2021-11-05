import { BasePropertyJSON } from './../../frontend/interfaces/property-json/property-json.interface';

import { DELIMITER } from './constants';

const convertParam = (parentValue: { [key: string]: any }, subProperty: BasePropertyJSON) => {
  console.log('subProperty', subProperty);
  const path = subProperty.propertyPath.split(DELIMITER).slice(-1)[0];
  const { type = 'string', isRequired = false } = subProperty;

  let value = parentValue[path];
  console.log('parent value', parentValue);
  console.log('sub value', value);
  console.log('sub property path', path);

  if (type === 'number') value = Number(value);
  else if (type === 'boolean') value = Boolean(value);
  else if (type === 'datetime') value = new Date(value);
  else if (type === 'mixed') {
    const nestedSubProperties = subProperty.subProperties;

    for (const nestedSubProperty of nestedSubProperties) {
      if (subProperty.isArray) {
        value = [...value].map((element) => convertParam(element, nestedSubProperty));
      } else {
        value = convertParam(value, nestedSubProperty);
      }
    }
  }

  return {
    ...parentValue,
    [path]: value,
  };
}

export { convertParam };
