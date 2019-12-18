import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import "./SearchBarStyle.css";

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
        var searchResults = this.state.searchText;
        searchResults = searchResults.filter((searchresult) => {
          return searchresult.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({searchResults: searchResults});
        
      }
    
    componentDidMount = () => {
        this.setState({
            searchText: this.props.content,
            searchResults: this.props.content
        })
     }  
     
     searchToggle = () =>
     {
        var elements = document.getElementsByClassName("searchresult");
        var bar = document.getElementById("searchbar_id");

        if (bar.value == "")
        {
            for (var i=0;i<elements.length;i+=1)
            {
                elements[i].style.display = 'none';
            }
        }
        else
        {
            for (var i=0;i<elements.length;i+=1)
            {
                elements[i].style.display = 'flex';
            }
        }
     }
     
    render() {
        return (
            <div>
                <div>
                <form>
                    <input className="searchbar" type="text" placeholder="Search" id="searchbar_id"
                    onKeyUp={this.searchToggle} onKeyDown={this.searchToggle} onChange={this.filterResults}/>
                </form>
                    <div className="searchResults">
                        {
                        this.state.searchResults.map((x,i)=> 
                        <li className="searchresult" key={i}><Link to="MyMatches">{x}</Link></li>)
                        }
                    </div>
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