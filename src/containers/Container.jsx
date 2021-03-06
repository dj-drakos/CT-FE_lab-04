import React, { Component } from 'react';
import Controls from '../components/api-client/Controls';
import Display from '../components/api-client/Display';
import Header from '../components/Header';
import History from '../components/history/History';
import { callAPI } from '../services/apiService';
import styles from '../index.css';

export default class Container extends Component {
state = {
  loading: false,
  url: '',
  method: '',
  body: '',
  history: [],
  display: { 'Hello, Dave': 'You\'re looking well today.' }
}

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
}

handleSubmit = async (event) => {
  event.preventDefault();
  this.setState({ loading: true });

  const display = await callAPI(
    this.state.url, 
    this.state.method, 
    this.state.body
  );

  this.setState({ loading: false, display });

}

render() {
  const { loading, display } = this.state;
  return (
    <div className={styles.rooot}>
      <Header />
      <section className={styles.main}>
        <History />
        <div>
          <Controls onChange={this.handleChange} onSubmit={this.handleSubmit}/>
          { loading 
            ? <div className={styles.display}>Loading...</div>
            : <Display display={display}/> 
          }
        </div>
      </section>
    </div>
  );
}
}
