export interface IResults {
  info: IInfo
  results: IEpisode[]
}

export interface IInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface IEpisode {
  id: number
  name: number
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: Date
}
