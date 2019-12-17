import React from 'react';
import VSBlock from './VSBlock';
import StatsBlock from './StatsBlock';


class MainWindow extends React.Component {

  render()
      { 
        return (
          <div>
            <h1>Man window man </h1>
            <div>
              <VSBlock UserInfo={this.props.UserInfo} />
            </div>
            <div>
              <StatsBlock />
            </div>
          </div>
        )
      }
  
}

export default MainWindow;