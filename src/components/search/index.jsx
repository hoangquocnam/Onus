import React, { useEffect, useState } from 'react';
import { BsColumnsGap, BsPerson, BsPuzzle, BsXDiamond } from 'react-icons/bs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routes from '../../routes';
import '../../styles/pages/search.css';
import Spinner from '../spinner';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const [currentActive, setCurrentActive] = useState('all');

  useEffect(() => {
    const term = searchParams.get('s');

    if (!term) {
      navigate(routes.home.path);
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        setTimeout(() => {
          setResults([
            {
              type: 'user',
              data: {
                id: '1',
                fullname: 'Lê Duy Tâm',
                avatarUrl: 'https://api.minimalavatars.com/avatar/random/png',
                email: 'ldtam@demo.com',
              },
            },
            {
              type: 'task',
              data: {
                id: '1',
                title: 'Task 1',
                description: 'Task 1 description',
                workspaceId: '1',
              },
            },
            {
              type: 'workspace',
              data: {
                id: '1',
                title: 'Workspace 1',
                description: 'Workspace 1 description',
              },
            },
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {}
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function countResultType(results, type) {
    if (!results) {
      return 0;
    }

    if (type === 'all') {
      return results.length;
    }

    return results.filter(result => result.type === type).length;
  }

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
                currentActive === 'all' && 'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive('all')}
            >
              <BsXDiamond className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>All</span>
              <span className='search__sidebar-item-count'>
                {countResultType(results, 'all')}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === 'user' && 'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive('user')}
            >
              <BsPerson className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Users</span>
              <span className='search__sidebar-item-count'>
                {countResultType(results, 'user')}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === 'workspace' && 'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive('workspace')}
            >
              <BsColumnsGap className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Workspaces</span>
              <span className='search__sidebar-item-count'>
                {countResultType(results, 'workspace')}
              </span>
            </div>

            <div
              className={`search__sidebar-item ${
                currentActive === 'task' && 'search__sidebar-item--active'
              }`}
              onClick={() => setCurrentActive('task')}
            >
              <BsPuzzle className='search__sidebar-item-icon' />
              <span className='search__sidebar-item-text'>Tasks</span>
              <span className='search__sidebar-item-count'>
                {countResultType(results, 'task')}
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
              <ResultList
                results={
                  currentActive === 'all'
                    ? results
                    : results.filter(result => result.type === currentActive)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultList({ results }) {
  return (
    <div className='search__results'>
      {results?.map((result, index) => (
        <React.Fragment key={index}>
          <ResultItem result={result} />

          {index !== results.length - 1 && (
            <div className='search__result-item-separator' />
          )}
        </React.Fragment>
      ))}

      {results?.length === 0 && (
        <p className='search__result-empty'>No results found</p>
      )}
    </div>
  );
}

function ResultItem({ result }) {
  switch (result.type) {
    case 'user':
      return <UserResultItem result={result} />;

    case 'task':
      return <TaskResultItem result={result} />;

    case 'workspace':
      return <WorkspaceResultItem result={result} />;

    default:
      return null;
  }
}

function UserResultItem({ result }) {
  const { id, fullname, avatarUrl, email } = result.data;
  const navigate = useNavigate();

  function navigateToUser() {
    navigate(`${routes.account.path}/${id}/profile`);
  }

  return (
    <div className='search__result-item' onClick={navigateToUser}>
      <img src={avatarUrl} alt='avatar' className='search__result-item-image' />

      <div className='search__result-item-info'>
        <p className='search__result-item-info-primary'>{fullname}</p>
        <p className='search__result-item-info-secondary'>{email}</p>
      </div>

      <div>
        <span className='search__result-item-type'>User</span>
      </div>
    </div>
  );
}

function TaskResultItem({ result }) {
  const { id, title, description, workspaceId } = result.data;
  const navigate = useNavigate();

  function navigateToTask() {
    navigate(`${routes.workspaces.path}/${workspaceId}?taskId=${id}`);
  }

  return (
    <div className='search__result-item' onClick={navigateToTask}>
      <div className='search__result-item-info'>
        <p className='search__result-item-info-primary'>{title}</p>
        <p className='search__result-item-info-secondary'>{description}</p>
      </div>

      <div>
        <span className='search__result-item-type'>Task</span>
      </div>
    </div>
  );
}

function WorkspaceResultItem({ result }) {
  const { id, title, description } = result.data;
  const navigate = useNavigate();

  function navigateToWorkspace() {
    navigate(`${routes.workspaces.path}/${id}`);
  }

  return (
    <div className='search__result-item' onClick={navigateToWorkspace}>
      <div className='search__result-item-info'>
        <p className='search__result-item-info-primary'>{title}</p>
        <p className='search__result-item-info-secondary'>{description}</p>
      </div>

      <div>
        <span className='search__result-item-type'>Workspace</span>
      </div>
    </div>
  );
}
