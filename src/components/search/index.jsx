import React, { useEffect, useState } from 'react';
import { BsColumnsGap, BsPerson, BsPuzzle, BsXDiamond } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routes from '../../routes';
import '../../styles/pages/search.css';
import Spinner from '../spinner';
import * as helpers from './search.helpers';
import ResultList from './searchResultList';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const [currentActive, setCurrentActive] = useState(helpers.FILTER_SEARCH.ALL);

  useEffect(() => {
    const term = searchParams.get('s');
    helpers.search(term).then(res => {
      setResults(res);
    });
    setIsLoading(false);
  }, [searchParams]);

  return (
    <div className='search'>
      <div className='search__container'>
        <div className='search__header'>
          <h2 className='search__title'>
            Search results for "{searchParams.get('s')}"
          </h2>
        </div>

        <div className='search__body'>
          <div className='search__sidebar'>
            <div
              className={`search__sidebar-item ${
                currentActive === helpers.FILTER_SEARCH.ALL &&
                'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive(helpers.FILTER_SEARCH.ALL)}
            >
              <BsXDiamond className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>All</span>
              <span className='search__sidebar-item-count'>
                {helpers.countResultType(results, helpers.FILTER_SEARCH.ALL)}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === helpers.FILTER_SEARCH.USER &&
                'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive(helpers.FILTER_SEARCH.USER)}
            >
              <BsPerson className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Users</span>
              <span className='search__sidebar-item-count'>
                {helpers.countResultType(results, helpers.FILTER_SEARCH.USER)}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === helpers.FILTER_SEARCH.WORKSPACE &&
                'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive(helpers.FILTER_SEARCH.WORKSPACE)}
            >
              <BsColumnsGap className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Workspaces</span>
              <span className='search__sidebar-item-count'>
                {helpers.countResultType(results, helpers.FILTER_SEARCH.WORKSPACE)}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === helpers.FILTER_SEARCH.TASK &&
                'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive(helpers.FILTER_SEARCH.TASK)}
            >
              <BsPuzzle className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Tasks</span>
              <span className='search__sidebar-item-count'>
                {helpers.countResultType(results, helpers.FILTER_SEARCH.TASK)}
              </span>
            </div>
          </div>

          <div className='search__content'>
            <div className='search__content-header'>
              <select className='search__content-sort' disabled={true}>
                <option value='most-relevant'>Most relevant</option>
              </select>
            </div>

            {isLoading ? (
              <Spinner
                style={{
                  width: '50px',
                  height: '50px',
                }}
              />
            ) : (
              <React.Fragment>
                {results && (
                  <ResultList results={results} type={currentActive} />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
