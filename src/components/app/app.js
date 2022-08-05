import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props){
        super(props);

        this.state ={
            data : [
                {name: 'Ivan C.', salary: 800, increase: true, rise: false, id: 1},
                {name: 'Sergey Ch.', salary: 3000, increase: false, rise: true, id: 2},
                {name: 'Anton V.', salary: 5000, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;

    }

    deleteItem =(id)=> {
        this.setState(({data})=> {
           return {
                data: data.filter(item=> item.id !== id)
           } 
        })
    }

    addItem =(name, salary)=> {
        if(!name || !salary) {
            return;
        }
        let newItem = {
            name, 
            salary, 
            increase: false,
            rise: false, 
            id: this.maxId++
        }

        this.setState(({data})=> {
            const newData = [...data, newItem];
            return {
                data: newData
            }
        })
    }

    onToggleIncrease =(id)=> {
        this.setState(({data})=> {
            const index = data.findIndex(elem => elem.id === id);

            const old= data[index];
            const newItem = {...old, increase: !old.increase};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];

            return {
                data: newArr
            }
        })
    }

    onToggleRise =(id)=> {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default: 
            return items;

        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }


    render() {
        const{data, term, filter} = this.state;
        const amountOfEmployees = this.state.data.length;
        const amountToRise = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo 
                    amountOfEmployees = {amountOfEmployees}
                    amountToRise={amountToRise}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data = {visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease ={this.onToggleIncrease}
                    onToggleRise ={this.onToggleRise}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    
}

export default App;