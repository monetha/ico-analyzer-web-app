export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

const wrapDisplayName = (wrapperComponentName, Component) =>
  `${wrapperComponentName}(${getDisplayName(Component)})`;

export default wrapDisplayName;
