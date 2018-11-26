import { h, render } from 'preact';

import './Filter.scss';

function Filters({
  includeLazyModules,
  fileTypes,
  handleIncludeLazyModules,
  handleFileTypeChange
}) {
  return (
    <div className='filters row around-xs'>
      <div className='col-xs-11'>
        <div className='filters__header'>Filter</div>

        <div className='row'>
          <div className='filter filter-checkbox'>
            <label>
              <input
                name='includeLazyModules'
                type='checkbox'
                checked={includeLazyModules}
                onChange={handleIncludeLazyModules}
              />
              <span className='filter-checkbox__item'>
                Include lazy loaded modules
              </span>
            </label>
          </div>

          <div className='filter filter-radio-group'>
            <label>
              <input
                type='radio'
                name='fileTypes'
                value='js'
                checked={fileTypes === 'js'}
                onChange={handleFileTypeChange}
              />
              <span className='filter-radio-group__item'>Scripts</span>
            </label>
            <label>
              <input
                type='radio'
                name='fileTypes'
                value='css'
                checked={fileTypes === 'css'}
                onChange={handleFileTypeChange}
              />
              <span className='filter-radio-group__item'>Styles</span>
            </label>
            <label>
              <input
                type='radio'
                name='fileTypes'
                value='all'
                checked={fileTypes === 'all'}
                onChange={handleFileTypeChange}
              />
              <span className='filter-radio-group__item'>All</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
