import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 0;
  state = {
    information: [],
    keyword:''
  }

  handleChange = (e) => {
    this.setState({
      keyword:e.target.value
    })
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: ++this.id, ...data })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information : information.filter(
        info => info.id !== id
      )
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information : information.map(
        info => id === info.id
          ? {...info, ...data}
          : info
      )
    })
  }

  render() {
    const filteredList = this.state.information.filter(
      info => info.name.indexOf(this.state.keyword) !== -1
    );

    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <input
          placeholder="이름을 검색하세요."
          onChange={this.handleChange}
          value={this.state.keyword}
        />
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;