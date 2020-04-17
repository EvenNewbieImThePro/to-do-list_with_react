import React, { Component } from 'react';
import './App.css';
import SwAlert from '../src/lib/swalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [], 
      text: '',
      selectedId: null, 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  
  render() {
    return (
      <div>
        <h3>TODO LIST</h3>
        <TodoList 
          items={this.state.items} 
          event={this.handleDelete}
          select={this.handleSelect}
        />
        <form onSubmit={this.handleSubmit}>
          
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="어떤 일을 해볼까요?"
          />
          <button>
            추가 #{this.state.items ? this.state.items.length + 1 : 0}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    var CreateTodo = () => {
      const newItem = {
        text: this.state.text,
        id: this.state.items.length,
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }

    e.preventDefault();
    if (this.state.text==='') {
      var popUpError = new SwAlert('이런!', '아무 일도 입력하지 않았어요', 'error', '확인', false)
      popUpError.Alert();
      return; 
    }
    
    if(!this.state.items.length) {
      CreateTodo();
      return;
    }
    else for(var i=0;i<this.state.items.length;i++) {
      if(this.state.text===this.state.items[i].text) {
        var popUpOverLap = new SwAlert('흠...', `'${this.state.text}'가 이미 있어요. 이 일을 한 번 더 하시겠어요?`, 'warning', '확인', true, '취소');
        popUpOverLap.Alert().then(result => {
          if(result.value) {
            CreateTodo();
          } else this.setState({ text: ''});
        });
        return;
      }
    }
    CreateTodo();
  }
  handleDelete(arg) {
    var deletePopUp = new SwAlert('잠깐', `정말 ${this.state.items[arg].text}을(를) 목록에서 지우시겠어요?`, 'warning', '확인', true, '취소')
    deletePopUp.Alert().then((result)=> {
      if(result) {
        var content = Array.from(this.state.items);
        for(var i=0; i<this.state.items.length;i++) {
          if(content[i].id===this.state.selectedId) {
          content.splice(i,1);
          this.setState({ items: content })
          break;
          }
        }
      }
    })
  }
  
  handleSelect(arg) {
    this.setState({
      selectedId: arg,
    })
  }
}

class TodoList extends Component {
  _showList() {
    const list = this.props.items.map((data, index) => {
      return(
        <li key={index} index={index}>{data.text} 
          <FontAwesomeIcon icon={faTrashAlt} onClick={()=>{
            console.log(index)
            this.props.event(index);
            this.props.select(index);
          }}/>
        </li>
      );
    });
    return list;
  }
  _showRecommend() {
    return(
      <div>
        아직 할 일이 없네요.<br/>
        추가를 누르면 여기에 할 일이 생겨요.
      </div>
    );
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.items.length!==0? 
            this._showList():this._showRecommend()
          }
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      <div className="App">
        <TodoApp></TodoApp>
      </div>
    );
  }
}
export default App;
