export const limitPagination = (page, totalPage) => {
  const limit = 4;
  const start = (page - limit) > 1 ? page - limit : 1
  const end = (page+limit) < totalPage ? page + limit : totalPage
  const pageNumber = []
  for (let i = start; i <= end; i++) {
    pageNumber.push(i)
  }
  return pageNumber;
}
