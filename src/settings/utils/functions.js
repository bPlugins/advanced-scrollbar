import { produce } from "immer";
export function findItemByName(items, name) {
  for (const item of items) {
    if (item.name === name) {
      return item;
    }
    if (item.children) {
      const foundItem = findItemByName(item.children, name);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return null;
}

export const getParentObjectByValue = (items, name) => {
  const key = items.filter(item => item.children && item.children.find(child => child.name === name))
  return key[0]
}



export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, (draft) => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, (draft) => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(
      draft[currentProp],
      value,
      ...remainingProps
    );
  });
}


export const checkDependency = (dependency = [], allValues, fields) => {
  if (!dependency || !Array.isArray(dependency) || dependency.length !== 3) {
    return true; // No dependency or invalid format, show field
  }
  const [fieldName, operator, expectedValue] = dependency;
  // const actualValue = allValues[fieldName];
  const actualValue = allValues[fieldName] ?? fields.find(field => field.id === fieldName)?.default;
  // console.log({ actualValue, allValues, field: fields.find(field => field.id === fieldName)?.default });

  // console.log(fields.find(field => field.id === fieldName), fieldName);

  // console.log(actualValue);

  switch (operator) {
    case '==':
    case '===':
      return actualValue === expectedValue;
    case '!=':
    case '!==':
      return actualValue !== expectedValue;
    case '>':
      return Number(actualValue) > Number(expectedValue);
    case '<':
      return Number(actualValue) < Number(expectedValue);
    case '>=':
      return Number(actualValue) >= Number(expectedValue);
    case '<=':
      return Number(actualValue) <= Number(expectedValue);
    case 'in':
      return Array.isArray(expectedValue) && expectedValue.includes(actualValue);
    case 'not_in':
      return Array.isArray(expectedValue) && !expectedValue.includes(actualValue);
    default:
      return true;
  }
};


export function extractDefaultsNested(fields, parentId = null, result = {}) {
  for (const field of fields) {
    const { id, default: defVal } = field;
    const nestedKeys = ['fields', 'tabs'];
    const hasNested = nestedKeys.some(key => Array.isArray(field[key]));

    // If this field has a default and no children
    if (!hasNested && id !== undefined && (defVal !== undefined || defVal === false || defVal === 0)) {
      if (parentId) {
        if (!result[parentId]) result[parentId] = {};
        result[parentId][id] = defVal;
      } else {
        result[id] = defVal;
      }
    }

    // Handle nested children correctly (only if id exists)
    for (const key of nestedKeys) {
      if (Array.isArray(field[key])) {
        const containerId = id;
        const subResult = {};
        extractDefaultsNested(field[key], null, subResult);

        if (Object.keys(subResult).length) {
          if (containerId) {
            if (parentId) {
              if (!result[parentId]) result[parentId] = {};
              result[parentId][containerId] = subResult;
            } else {
              result[containerId] = subResult;
            }
          } else {
            // Fallback if no containerId — merge into result directly
            Object.assign(result, subResult);
          }
        }
      }
    }
  }

  return result;
}