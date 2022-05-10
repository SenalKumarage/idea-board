import { IconButton } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { FC, useEffect, useRef, useState } from 'react'
import { IdeaType, useAppContext } from '../../providers/DataProvider';
import Idea from './Idea';
import * as ideaService from './idea.service';

const useStyles = makeStyles(() =>
  createStyles({
    ideaContainer: {
      display: 'flex',
      height: '100%',
      width: '100%',
      flexWrap: 'wrap'
    },
    addBtn: {
      position: 'absolute',
      bottom: '20px',
      right: '20px'
    }
  })
)

const Board: FC = () => {
  const classes = useStyles()
  const { ideas } = useAppContext()
  const [ideaNodes, setIdeaNodes] = useState<any>(ideas)
  const ideasRef = useRef<any>([])
  const [newIdeaIndex, setNewIdeaIndex] = useState<any>(null)
  const deleteHandler = (index: number) => {
    setIdeaNodes(ideaNodes.filter((_: any, i: number) => i !== index)
    )
  }
  useEffect(() => {
    setIdeaNodes(ideas)
  }, [ideas])
  useEffect(() => {
    if (newIdeaIndex !== null) {
      ideasRef.current[newIdeaIndex]?.current.focus();
      setNewIdeaIndex(null)
    }
  }, [newIdeaIndex])
  const handleAddIdea = () => {
    const idea = ideaService.create()
    setIdeaNodes([...ideaNodes, idea])
    setNewIdeaIndex(ideaNodes.length)
  }

  return (
    <div className={classes.ideaContainer}>
      {
        ideaNodes.map((idea: IdeaType, i: number) =>
          <Idea
            key={`idea-${i}`}
            textRef={(elem: any) => (ideasRef.current[i] = elem)}
            ideaIndex={i}
            onDelete={deleteHandler}
            {...idea} />)
      }
      <div className={classes.addBtn}>
        <IconButton onClick={handleAddIdea} aria-label="add" size="large">
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  )
}

export default Board
