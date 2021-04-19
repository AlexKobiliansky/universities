export const wrapToMark = (entity, str) => {
  return entity.replace(
    new RegExp(str, 'gi'),
    match => `<mark>${match}</mark>`
  );
}