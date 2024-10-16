import React, { type FormEvent, useState } from 'react';
import Modal from './modal';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { weatherSlice } from '../../store/reducers/weather.slice';

const Header = () => {
  const { type } = useAppSelector(state => state.weatherReducer);
  const { changeWeatherType, search, showErrorModal } = weatherSlice.actions;
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(search(searchQuery));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="header-search">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update the state on input change
              />
              <button type="submit">Search city</button>
            </form>
          </div>

          <div className="header-right">
            <div>
              <input type="radio" name="type"
                     onChange={() => dispatch(changeWeatherType('celsius'))}/>
              C
            </div>
            <div>
              <input type="radio" name="type" checked={type === 'fahrenheit'}
                     onChange={() => dispatch(changeWeatherType('fahrenheit'))}/>
              F
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;