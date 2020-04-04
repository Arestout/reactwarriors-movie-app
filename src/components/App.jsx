import React from 'react';
import Header from './Header/Header';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';
import { API_URL, API_KEY_3, fetchApi } from '../api/api';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      filters: {
        sort_by: 'popularity.desc',
        year: 'default',
        with_genres: [],
      },
      page: 1,
      total_pages: null,
    };

    this.state = this.initialState;
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  onLogOut = () => {
    cookies.remove('session_id');
    this.setState({
      session_id: null,
      user: null,
    });
  };

  updateSessionID = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onChangeFilters = (event) => {
    const { name, value } = event.target;
    this.setState((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages,
    });
  };

  componentDidMount() {
    const session_id = cookies.get('session_id');
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        this.updateUser(user);
        this.updateSessionID(session_id);
      });
    }
  }

  resetFilters = () => {
    this.setState(this.initialState);
  };

  render() {
    const { filters, page, total_pages, user, session_id } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateUser: this.updateUser,
          updateSessionID: this.updateSessionID,
          onLogOut: this.onLogOut,
        }}
      >
        <>
          <Header user={user} />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <h3>Filters:</h3>
                    <Filters
                      filters={filters}
                      page={page}
                      total_pages={total_pages}
                      onChangeFilters={this.onChangeFilters}
                      onChangePagination={this.onChangePagination}
                      resetFilters={this.resetFilters}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  session_id={session_id}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}
