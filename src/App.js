import { state, useState } from 'react';
import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.components';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      monstersearch: '',
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      this.setState(() => {
          return { monsters: users };
        });
    });
  }

  onSearchChange = (event) => {
      const monstersearch = event.target.value.toLocaleLowerCase();
      this.setState (() => {
        return { monstersearch };
      });
    };

  render(){
    const { monstersearch, monsters } = this.state;
    const { onSearchChange } = this;

    let filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(monstersearch);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className='main-search'
          onChangeHandler={onSearchChange}
          placeholder='search monsters' 
        />
        <CardList monsters = {filteredMonsters}/>
      </div>
    );    
  }

}

// BELOW: FUNCTIONAL IMPLEMENTATION

// const App = () => {
//   console.log('render');
//   const [searchField, setSearchField] = useState(''); // [value, setValue]
//   console.log(searchField);

//   const onSearchChange = (event) => {
//     const searchFieldString = event.target.value.toLocaleLowerCase();
//     setSearchField(searchFieldString);
//   }
//   return (
//     <div className="App">
//       <h1 className="app-title">Monsters Rolodex</h1>

//       <SearchBox
//         className='main-search'
//         onChangeHandler={onSearchChange}
//         placeholder='search monsters' 
//       />

//       {/* <CardList monsters = {filteredMonsters}/> */}
//     </div>
//   )
// }


export default App;
