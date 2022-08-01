import '../../../styles/components/listViewNewCard.css';

function ListViewNewCard({ title, onClick }) {
  function handleOnClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <>
      <div
        className='list-view-new-card disable-user-select'
        onClick={handleOnClick}
      >
        {title}
      </div>
    </>
  );
}

export default ListViewNewCard;
