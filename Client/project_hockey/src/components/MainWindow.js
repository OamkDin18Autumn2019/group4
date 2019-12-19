import React from 'react';
import VSBlock from './VSBlock';
import StatsBlock from './StatsBlock';


class MainWindow extends React.Component {

  render()
      { 
        return (
          <div>
            <div>
              <VSBlock />
            </div>
            <div>
              <StatsBlock />
            </div>
          </div>
        )
      }
  
}

export default MainWindow;