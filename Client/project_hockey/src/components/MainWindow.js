import React from 'react';
import CalendarBlock from './CalendarBlock';

class MainWindow extends React.Component {
  render()
      { 
        return (
          <div>
            <h1>Man window man</h1>
            <div>
              <CalendarBlock />
            </div>
          </div>
        )
      }
  
}

export default MainWindow;