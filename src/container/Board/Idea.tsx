import { IconButton, Snackbar, TextField } from '@mui/material'
import React, { Component } from 'react'
import * as ideaService from './idea.service'
import { IdeaType } from '../../providers/DataProvider'
import DeleteIcon from '@mui/icons-material/Delete'
import './idea.css'

interface IdeaProps extends IdeaType {
  textRef: any
  ideaIndex: number
  onDelete: (i: number) => void
}

export default class Idea extends Component<IdeaProps> {
  state: any = {
    title: null,
    body: null,
    openSnack: false
  }
  componentDidMount() {
    this.setState({
      title: this.props.title,
      body: this.props.body
    })
  }
  render() {
    const textRef = this.props.textRef(this);
    const updateIdea = (idea: IdeaType) => {
      ideaService.update(idea)
      this.setState({
        openSnack: true
      })
    }
    const onTitleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      this.setState({
        title: event.target.value
      })
      updateIdea({
        title: event.target.value,
        body: this.state.body,
        id: this.props.id,
        created_date: this.props.created_date
      })
    }
    const onBodyBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      this.setState({
        body: event.target.value
      })
      updateIdea({
        title: this.state.title,
        body: event.target.value,
        id: this.props.id,
        created_date: this.props.created_date
      })
    }
    const onDeleteHandler = () => {
      ideaService.deleteOne(this.props.id)
      this.props.onDelete(this.props.ideaIndex)
    }
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ title: event.target.value })
    }
    const onBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ body: event.target.value })
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        openSnack: false
      });
    }

    return (
      <>
        <div className='idea'>
          <span className='idea-id'>{this.props.id}</span>
          <TextField
            className='idea-input'
            onBlur={onTitleBlur}
            onChange={onTitleChange}
            size='small'
            value={this.state.title}
            variant="outlined"
            inputRef={(ref) => textRef.current = ref} />
          <TextField
            className='idea-input'
            multiline
            rows={2}
            size='small'
            onBlur={onBodyBlur}
            onChange={onBodyChange}
            value={this.state.body}
          />
          <span className='idea-date'>{this.props.created_date}</span>
          <IconButton className='idea-delete' onClick={onDeleteHandler} aria-label="delete" size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Idea updated sucessfully"
        />
      </>
    )
  }
}
