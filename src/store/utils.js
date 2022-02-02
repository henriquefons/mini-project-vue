export const getEventIndexById = (state, eventId) => (
    state.eventsList.findIndex(event => event.id.toString() === eventId.toString())
)

export const calculateAround = (actualValue, totalValues) => {
  const limitRow = 5;
  const links = [];
  const start = Math.floor(actualValue / limitRow) * limitRow;
  const end = Math.min(start + limitRow, totalValues);
  for (let i = start; i < end; i++) {
    links.push(i + 1);
  }
  return links;
}