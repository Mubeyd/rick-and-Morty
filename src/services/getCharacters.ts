import { ICharacter } from '../interfaces/ICharacter'

export const getCharacters = async (
  _characters: string[],
  fn: (items: ICharacter[]) => void,
  onCatch: (e: any) => void,
) => {
  await Promise.all(_characters)
    .then((values) => {
      const _char = values.map(async (x) => {
        const response = await fetch(x)
        const json = (await response.json()) as ICharacter
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
