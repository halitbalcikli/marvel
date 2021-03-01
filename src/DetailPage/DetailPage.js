import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import '../components/style.css';

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comics: [],
        }
    }

    componentDidMount() {
        this.id = this.props.match.params['id'];

        fetch(`http://gateway.marvel.com/v1/public/characters/${this.id}/comics?ts=1&apikey=2c375dccf4ddab8379e201e07cff321b&hash=197d88701fdd45ed6ed89b3cfd2b3e98`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        comics: result.data.results
                    });
                });
    }

    render() {
        let characterData = this.state.comics;
        this.id = parseInt(this.props.match.params['id']);

        let getDataFromStorage = JSON.parse(localStorage.getItem("data"));
        let getCurrentValue = getDataFromStorage.filter(item => item.id === this.id);

        let comics = characterData.map((item, index) => {
            let name = item.series.name.indexOf("(");
            let year = parseInt(item.series.name.substr(name + 1, 4));
            return {
                id: index,
                name: item.series.name,
                year: year
            };
        });

        let greaterThan2005YearsData = comics.filter(item => {
            return item.year > 2005;
        });

        const sortFromNewestToOldest = greaterThan2005YearsData.sort((a, b) => b.year - a.year);
        let size = 10;

        return (
            <div className={"container"}>
                <div className={"row elementSelector"}>
                    <div className={"col-md-3 col-sm-6 small-device"}>
                        <img
                            src={getCurrentValue[0].thumbnail.path + "/portrait_xlarge." + getCurrentValue[0].thumbnail.extension}
                            alt={"marvel-img"}
                            className={"img-fluid"}
                        />
                    </div>
                    <div className={"col-md-9 col-sm-6"}>
                        <div className="character-name">{getCurrentValue[0].name}</div>
                    </div>
                </div>
                <div className={"row detail-section"}>
                    <div className={"title"}>Description</div>
                    <div className={"col-md-12"}>
                        {getCurrentValue[0].description ? <div className={"description"}>{getCurrentValue[0].description} </div> :
                            <div className={"no-description"}>There is no description for this character</div>}
                    </div>
                </div>
                <div className={"row"}>
                    {sortFromNewestToOldest.slice(0, size).map((item, index) => {
                        return <div key={index} className={"col-md-12 ul-element"}>{item.name}</div>
                    })}
                </div>
            </div>
        );
    }

}

export default withRouter(DetailPage);
