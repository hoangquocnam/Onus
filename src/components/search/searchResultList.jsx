import React from 'react';
import '../../styles/pages/search.css';
import routes from '../../routes';
import { useNavigate } from 'react-router-dom';
import isArray from 'lodash/isArray';
import { FILTER_SEARCH, countResultType } from './search.helpers';

export default function ResultList({ results, type }) {
  if (type === FILTER_SEARCH.USER) {
    return (
      <>
        {isArray(results.users) && results.users.length > 0 ? (
          results.users.map(result => (
            <UserResultItem key={result.id} result={result} />
          ))
        ) : (
          <NotFoundItem />
        )}
      </>
    );
  }

  if (type === FILTER_SEARCH.TASK) {
    return (
      <>
        {isArray(results.tasks) && results.tasks.length > 0 ? (
          results.tasks.map(result => (
            <TaskResultItem key={result.id} result={result} />
          ))
        ) : (
          <NotFoundItem />
        )}
      </>
    );
  }

  if (type === FILTER_SEARCH.WORKSPACE) {
    return (
      <>
        {isArray(results.workspaces) && results.workspaces.length > 0 ? (
          results.workspaces.map(result => (
            <WorkspaceResultItem key={result.id} result={result} />
          ))
        ) : (
          <NotFoundItem />
        )}
      </>
    );
  }

  if (type === FILTER_SEARCH.ALL) {
    return (
      <React.Fragment>
        {countResultType(results, FILTER_SEARCH.ALL) > 0 ? (
          <>
            <>
              {isArray(results.users) &&
                results.users.map(result => (
                  <UserResultItem key={result.id} result={result} />
                ))}
            </>

            <>
              {isArray(results.tasks) &&
                results.tasks.map(result => (
                  <TaskResultItem key={result.id} result={result} />
                ))}
            </>

            <>
              {isArray(results.workspaces) &&
                results.workspaces.map(result => (
                  <WorkspaceResultItem key={result.id} result={result} />
                ))}
            </>
          </>
        ) : (
          <NotFoundItem />
        )}
      </React.Fragment>
    );
  }
}

function UserResultItem({ result }) {
  const { id, fullname, avatar, email } = result;
  const navigate = useNavigate();

  function navigateToUser() {
    navigate(`${routes.account.path}/${id}/profile`);
  }

  return (
    <div className='search__result-item' onClick={navigateToUser}>
      <img src={avatar} alt='avatar' className='search__result-item-image' />

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

const NotFoundItem = () => {
  return (
    <div>
      <p>No results found</p>
    </div>
  );
};
