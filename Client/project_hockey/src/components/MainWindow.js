import React from 'react';
import CalendarBlock from './CalendarBlock';
import SearchResults from './SearchResults';

class MainWindow extends React.Component {

  render()
      { 
        return (
          <div>
            <h1>Man window man </h1>
            <div>
              <CalendarBlock UserInfo={this.props.UserInfo} />
            </div>
            <div>
              <div>
                <SearchResults />
            </div>
            </div>
          </div>
        )
      }
  
}

export default MainWindow;