import { forwardRef } from 'react';
import { Popover } from 'react-bootstrap';
import { RiCloseLine } from 'react-icons/ri';
import '../../styles/components/popover.css';

export function PopoverSeparator() {
  return <div className='popover__separator' />;
}

export function PopoverButton({
  children,
  onClick,
  className,
  variant = 'primary',
  align = 'left',
  closedOnClick = false,
}) {
  return (
    <button
      type='button'
      onClick={() => {
        if (onClick) {
          onClick();
        }

        if (closedOnClick) {
          document.body.click();
        }
      }}
      className={`popover-btn ${className} popover-btn--${variant}`}
      style={{
        textAlign: align,
      }}
    >
      {children}
    </button>
  );
}

export const PopoverContainer = forwardRef((props, ref) => {
  const { title, children, ...popoverProps } = props;

  function handleOnClose() {
    document.body.click();
  }

  return (
    <Popover ref={ref} {...popoverProps}>
      <div className='popover__container'>
        <div className='popover__header'>
          <h3 className='popover__title'>{title}</h3>

          <button
            type='button'
            className='popover__close-btn'
            onClick={handleOnClose}
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        <PopoverSeparator />

        <div className='popover__body'>{children}</div>
      </div>
    </Popover>
  );
});
