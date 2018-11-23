import React from 'react'

export default class TextInput extends React.Component {
  state = {
    histories: []
  }

  handlePost = (text, isYou) => {
    this.setState(prevState => {
      const { histories } = prevState

      const newHistories = histories.concat({
        text,
        isYou
      })

      return {
        histories: newHistories
      }
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.histories.map((history, index) => (
            <li key={index}>
              <p>{history.isYou ? 'あなた' : 'だれか'}</p>
              <p>{history.text}</p>
            </li>
          ))}
        </ul>
        <Hoge onPost={this.handlePost} />
      </div>
    )
  }
}

class Hoge extends React.Component {
  state = {
    input: '',
    busy: false
  }

  handleChangeText = e => {
    this.setState({ input: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { input, busy } = this.state
    if (busy || input.trim() === '') {
      return
    }

    this.setState({ busy: true }, () => {
      this.props.onPost(input, true)

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      const body = JSON.stringify({
        text: input
      })
      fetch('/post', { method: 'POST', headers, body })
        .then(res => res.json())
        .then(res => {
          this.setState({ input: res.yourReply, busy: false })
          this.props.onPost(res.reply, false)
        })
    })
  }

  render() {
    const { input, busy } = this.state
    return (
      <form onSubmit={this.handleSubmit} style={busy ? { opacity: 0.5 } : {}}>
        <input type='text' value={input} onChange={this.handleChangeText} />
        <input type='submit' value='送信' disabled={busy} />
      </form>
    )
  }
}
