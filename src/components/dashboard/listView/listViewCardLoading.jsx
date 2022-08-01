import { Placeholder } from 'react-bootstrap';
import '../../../styles/components/listViewCardLoading.css';

function ListViewCardLoading() {
  return (
    <div className='list-view-card-loading'>
      <Placeholder as='h3' animation='glow'>
        <Placeholder xs={9} />
      </Placeholder>

      <Placeholder as='p' animation='glow'>
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
        <Placeholder xs={6} /> <Placeholder xs={8} />
      </Placeholder>
    </div>
  );
}

export default ListViewCardLoading;
