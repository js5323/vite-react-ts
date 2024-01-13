import { useClickAway } from "ahooks";
import { useState, useRef } from "react";
import {
  SelectSingleEventHandler,
  DayPicker as ReactDayPicker,
} from "react-day-picker";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

export interface IDayPickerProps {
  name?: string;
  id?: string;
  value?: Date;
  onChange: (value?: Date) => void;
}

export default function DayPicker({
  name,
  id,
  value,
  onChange,
}: IDayPickerProps) {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    onChange.call(null, date);
    closePopper();
  };

  useClickAway(() => closePopper(), wrapperRef);

  return (
    <div ref={wrapperRef} className='day-picker__wrap' id={id}>
      <input
        type='text'
        name={`${name}__input`}
        id={`${name}__input`}
        readOnly
        className='form-control'
        defaultValue={value ? format(value, "yyyy-MM-dd") : ""}
        onClick={() => setIsPopperOpen(true)}
      />

      {isPopperOpen && (
        <div className='position-relative'>
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className='dialog-sheet shadow'
            {...popper.attributes.popper}
            ref={setPopperElement}
            role='dialog'
            aria-label='DayPicker calendar'
          >
            <ReactDayPicker
              initialFocus={isPopperOpen}
              mode='single'
              selected={value}
              onSelect={handleDaySelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}
