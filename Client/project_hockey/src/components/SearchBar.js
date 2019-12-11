import React, { Component } from 'react'

export default class SearchBar extends Component {
        constructor(props)
        {
          super(props);
          this.state = {
            searchText: [],
            searchResults: []
          };
        }  
    

    filterResults = (event) => {
        let searchResults = this.state.searchText;
        searchResults = searchResults.filter((searchresult) => {
          return searchresult.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({searchResults: searchResults});
        console.log(searchResults)
      }

    componentDidMount = () => {
        this.setState({
            searchText: this.props.content,
            searchResults: this.props.content
        })
     }   

    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Search" onChange={this.filterResults}/>
                </form>
            <div>
                {
                this.state.searchResults.map(function(searchresult) {
                    return <div key={searchresult}>{searchresult}</div>
                })
                }
                </div>
            </div>  
        )
    }
}

/*               <div>
{
    this.state.searchResults.map(function(searchresult) {
        return <div key={searchresult}>{searchresult}</div>
    })
}
</div>*/