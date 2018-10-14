import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'


const status = {
    'watched': 'Assistido',
    'watching': 'Assitindo',
    'toWatch': 'Assistir'
}

class NewSeries extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          redirect: false,
          genres: [],
          isLoading: false
        }

        this.saveSeries = this.saveSeries.bind(this)
      }
    
    componentDidMount() {
        //setInterval(() => this.setState({count: this.state.count+1 }), 1000)
        this.setState({ isLoading: true })
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }
    
    renderGenerLink(genre) {
        return (
            <span>&nbsp;<a href=''>{genre}</a>&nbsp;</span>
        )
    }

    saveSeries() {
        
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        
        api.saveSeries(newSeries)
            .then((res) => {
                console.log(res)
                this.setState({
                    redirect: `/series/${this.refs.genre.value}`
                })
            })
    }

    render() {
        return (        
            <section className="intro-section">
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />

                }
                <div className="container">
                    <h1>Nova série</h1>
                    <form>
                        Nome: <input type="text" ref='name' className="form-control" /><br />
                        Status:
                        <select ref='status'>
                            {
                                Object
                                    .keys(status)
                                    .map(key => <option key={key} value={key}>{status[key]}</option>)
                            }
                        </select><br />
                        Gênero:
                        <select ref='genre'>
                            {
                                this.state.genres
                                    .map(key => <option key={key} value={key}>{key}</option>)
                            }
                        </select><br />
                        Comentários: <textarea ref='comments' className="form-control"></textarea><br />

                        <button type="button" onClick={this.saveSeries}>Salvar</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default NewSeries