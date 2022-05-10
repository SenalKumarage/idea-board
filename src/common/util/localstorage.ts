import { IdeaType } from '../../providers/DataProvider';

const IDEAS_KEY = 'IDEAS'

export const getIdeas = (): IdeaType[] => {
  const ideas = localStorage.getItem(IDEAS_KEY) || '[]'
  return JSON.parse(ideas)
}

export const setIdeas = (ideas: IdeaType[]): void => {
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas))
}
