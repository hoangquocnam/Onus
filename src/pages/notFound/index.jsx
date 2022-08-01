import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/pages/notFound.css';

function NotFoundPage() {
  return (
    <div className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>Oops!</h1>
        <p className='not-found__description'>404 - Page not found</p>
        <Link to='/' className='not-found__home-link'>
          <FaHome className='not-found__home-icon' />
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
