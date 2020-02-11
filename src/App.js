import React, {Component} from 'react';
// import Contacts from './components/contacts';

// server api for all data http://46.101.211.139:3000/

class App extends Component {
    render() {
        return (
            <h1>Hello</h1>
        )
    }

    state = {
        contacts: []
    };

    componentDidMount() {
        console.log('MOUNT')
        fetch('http://46.101.211.139:3000/', {
            headers: {
                "Content-Type": "text/plain"
            },
        })
            .then(res => {
                console.log('DATA: ', res.json());
                res.json()
            })
            .then((data) => {
                this.setState({ contacts: data })
            })
            .catch(console.log)
    }
}

export default App;