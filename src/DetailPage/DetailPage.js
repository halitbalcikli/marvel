import React, {Component} from 'react';

class DetailPage extends Component {
    render() {
        let characterData = this.props.location.state.data;

        let comics = characterData.comics.items.map((item, index) => {
            let name = item.name.indexOf("(");
            let year = parseInt(item.name.substr(name + 1, 4));
            let comic = {
                id: index,
                name: item.name,
                year: year
            };
            return comic;
        });

        let greaterThan2005YearsData = comics.filter(item => {
            return item.year > 2005;
        });
        const sortFromNewestToOldest =  greaterThan2005YearsData.sort((a, b) => b.year - a.year);
        let size = 10;
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-3 col-sm-6"}>
                        <img
                            src={characterData.thumbnail.path + "/portrait_xlarge." + characterData.thumbnail.extension}
                            alt={"marvel-img"}
                        />
                    </div>
                    <div className={"col-md-9 col-sm-6"}>
                        {characterData.name}
                    </div>
                </div>
                <div className={"row"}>
                    {characterData.description}
                </div>
                <div className={"row"}>
                    {sortFromNewestToOldest.slice(0, size).map((item, index) => {
                        return <div key={index} className={"col-md-12"}>{item.name}</div>
                    })}
                </div>
            </div>
        );
    }

}

export default DetailPage;
