import { IEpisode } from '../interfaces/IEpisode'

export const getEpisodes = async (
  _characters: string[],
  fn: (items: IEpisode[]) => void,
  onCatch: (e: any) => void,
) => {
  await Promise.all(_characters)
    .then((values) => {
      const _char = values.map(async (x) => {
        const response = await fetch(x)
        const json = (await response.json()) as IEpisode
        return json
      })
      return Promise.all(_char)
    })
    .then((resArray) => {
      fn(resArray)
    })
    .catch((e: any) => {
      onCatch(e)
    })
}
