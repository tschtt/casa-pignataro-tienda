import useRequest from "./useRequest.js";

export default function useResource(route) {
  const { get } = useRequest()  

  return {
    findMany: (query) => {
      return get(route, { query })
    },
    findOne: (id) => {
      return get(`${route}/${id}`)
    },
  }
}