import React, { Component } from 'react';

export default class DarkModeSwitch extends Component {
  state = { darkMode: this.props.theme === 'dark' };
  handleChange = (e) => {
    this.setState({ darkMode: e.target.checked });
    this.props.changeTheme();
  }
  render () {
    return (
      <div className='dark-mode-switch'>
        <input type='checkbox'
          name='dark-mode'
          id='dark-mode'
          checked={this.state.darkMode}
          onChange={this.handleChange}
        />
        <label htmlFor='dark-mode'></label>
        <div className='label-text'>Dark mode</div>
      </div>
    );
  };
}
