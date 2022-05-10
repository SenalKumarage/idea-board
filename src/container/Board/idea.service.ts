import { v4 as uuidv4 } from 'uuid'
import * as storageService from '../../common/util/localstorage'
import { IdeaType } from '../../providers/DataProvider'

const getAll = (): IdeaType[] => {
  return storageService.getIdeas()
}

const create = (): IdeaType => {
  const idea = {
    id: uuidv4(),
    created_date: new Date().toDateString(),
  }

  const ideas = [...getAll(), idea]
  storageService.setIdeas(ideas)

  return idea
}

const update = (newIdea: IdeaType): IdeaType => {
  const ideas = getAll()
  ideas.forEach((idea, i) => {
    if (idea.id === newIdea.id) {
      ideas[i] = newIdea
    }
  })
  storageService.setIdeas(ideas)

  return newIdea
}

const deleteOne = (id: string): void => {
  const ideas = getAll()
  const newIdeas = ideas.filter((idea) => idea.id !== id)
  storageService.setIdeas(newIdeas)
}

export {
  create,
  getAll,
  update,
  deleteOne,
}
