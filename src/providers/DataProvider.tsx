import React, { createContext, FC, useContext, useEffect, useState } from 'react'
import { getAll as loadIdeas } from '../container/Board/idea.service'

export interface IdeaType {
  id: string,
  title?: string,
  body?: string,
  created_date: string,
}

type DataProviderProps = {
  children: React.ReactNode
}

interface DataContextType {
  ideas: IdeaType[]
}

const DataContext = createContext<DataContextType | Record<string, any>>({})

const DataProvider: FC<DataProviderProps> = ({ children }: DataProviderProps) => {
  const [ideas, setIdeas] = useState<IdeaType[]>([])

  useEffect(() => {
    setIdeas(loadIdeas())
  }, [])

  return (
    <DataContext.Provider
      value={{
        ideas,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useAppContext = (): DataContextType | Record<string, any> => {
  return useContext<DataContextType | Record<string, any>>(DataContext);
}

export default DataProvider;
