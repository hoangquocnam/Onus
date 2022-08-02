import { useContext, useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import '../../styles/components/listView.css';
import { randInt } from '../../utils/common';
import ListViewCardLoading from './listViewCardLoading';

export default function ListView({ title, children, isLoading = false }) {
  const numberOfCardsLoading = useRef(randInt(1, 5));

  return (
    <div className='list-view'>
      <h2 className='list-view__title'>{title}</h2>

      <div className='list-view__items'>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          scrollContainerClassName='list-view__scroll-container'
        >
          {isLoading
            ? Array(numberOfCardsLoading.current)
                .fill(0)
                .map((_, index) => <ListViewCardLoading key={index} />)
            : children}
        </ScrollMenu>
      </div>
    </div>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, items } =
    useContext(VisibilityContext);

  return (
    <div className='list-view__arrow-wrapper'>
      <button
        type='button'
        disabled={items.size === 0 || isFirstItemVisible}
        className='list-view__arrow'
        onClick={() => scrollPrev()}
      >
        <AiOutlineArrowLeft size={20} />
      </button>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext, items } =
    useContext(VisibilityContext);

  return (
    <div className='list-view__arrow-wrapper'>
      <button
        type='button'
        disabled={items.size === 0 || isLastItemVisible}
        className='list-view__arrow'
        onClick={() => scrollNext()}
      >
        <AiOutlineArrowRight size={20} />
      </button>
    </div>
  );
}
