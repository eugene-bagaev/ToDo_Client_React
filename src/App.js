import React, {Component} from 'react';
import ToDoApp from './components/ToDoApp';


class App extends Component {
    render() {
        return (
            <ToDoApp />
        )
    }

    state = {
        notes: [],
        wps: [],
        users: []
    };

    componentDidMount() {
        fetch('http://46.101.211.139:3000/', {
            headers: {
                "Content-Type": "text/plain"
            },
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    notes: data.notes,
                    wps: data.wps,
                    users: data.users
                });
            })
            .catch(console.log)
    }
}

export default App;