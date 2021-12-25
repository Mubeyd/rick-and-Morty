export const getMoviesAsync = async ({
  _api,
  fn,
  loadingFn,
}: {
  _api: string
  fn: (json: any) => void
  loadingFn: () => void
}) => {
  try {
    const response = await fetch(_api)
    const json = await response.json()
    fn(json)
  } catch (error) {
    console.error(error)
  } finally {
    loadingFn()
  }
}
