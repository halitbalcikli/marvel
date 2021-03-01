import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './style.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.iScroll = React.createRef();
        this.state = {
            marvel: [],
            currentMarvel: [],
            loadingState: false
        }
    }

    marvelCharacters = async () => {
        const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2c375dccf4ddab8379e201e07cff321b&hash=197d88701fdd45ed6ed89b3cfd2b3e98`);
        const json = await response.json();

        const currentMarvel = json.data.results.slice(0, 10);
        this.setState({marvel: json.data.results, currentMarvel: currentMarvel})
    };

    componentDidMount() {
        this.marvelCharacters();

        this.iScroll.current.addEventListener("scroll", () => {
            if (this.iScroll.current.scrollTop + this.iScroll.current.clientHeight >= this.iScroll.current.scrollHeight - 20) {
                this.loadMoreItems();
            }
        });
    }

    loadMoreItems() {
        if (this.state.loadingState) {
            return;
        }

        this.setState({loadingState: true});
        setTimeout(() => {
            let add = 5;
            this.setState({currentMarvel: this.state.marvel.slice(0, add + this.state.currentMarvel.length), loadingState: false});
        }, 1000);
    }

    detailPage = (data) => {
        let path = `/detail-page/${data.id}`;
        this.props.history.push({
            pathname: path,
        })
    };

    render() {
        localStorage.setItem("data", JSON.stringify(this.state.marvel));

        return (
            <div ref={this.iScroll} style={{height: "100vh", overflow: "auto"}} className={"container"}>
                {this.state.currentMarvel ? this.state.currentMarvel.map((data, index) => {
                    return (
                        <React.Fragment key={data.id}>
                            <div className={"row elementSelector"}
                                 onClick={() => this.detailPage(data)}>
                                <div className={"col-md-3 col-sm-6 small-device"}>
                                    <img
                                        src={data.thumbnail.path + "/portrait_xlarge." + data.thumbnail.extension}
                                        alt={"marvel-img"}
                                        className={"img-fluid"}
                                    />
                                </div>
                                <div className={"col-md-9 col-sm-6"}>
                                    <div className={"character-name"}>{data.name}</div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }) : null}
            </div>
        );
    }
}

export default withRouter(MainPage);
