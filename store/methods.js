export function getByCategory (list, category) {
  if (!category) return list

  return list.filter(item => item.categories.includes(category))
}
