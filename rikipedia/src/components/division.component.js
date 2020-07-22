import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table} from 'react-bootstrap';

const RikishiRow = props => (
    <tr>
        <td>
            <Link to={"Profile/"+ props.east._id}>
                {props.east.name}
            </Link>
        </td>
        <td>{props.east.rank}</td>
        <td>
            <Link to={"Profile/"+ props.west._id}>
                {props.west.name}
            </Link>
        </td>
    </tr>
    )

export default class SumoList extends Component {
    constructor(props){
        super(props);

        this.listSumo = this.listSumo.bind(this);

        this.state = {
            division: this.props.division,
            sumos: []
        };
    } 

    async componentDidMount(){
        var divisionPath;
        if (this.state.division == null){
            this.setState({division: 'Makuuchi'});
            divisionPath = 'Makuuchi';
        } else {
            divisionPath = this.state.division;
        }

        await axios.get('http://localhost:5000/rikishi/' + divisionPath)
            .then(response => {
                this.setState({sumos: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    listSumo(){

        if (this.state.sumos.length > 0){
            let rikilist = [];

            var i;
            for (i = 0; i < 21; i++){
                var r = this.state.sumos.filter(x=>x.rankId === parseInt(i));
                if (r.length > 0){
                    var east = r.filter(x => x.rank2 === "East");
                    var west = r.filter(x => x.rank2 === "West");
                    console.log(west[0]);
                    rikilist.push(<RikishiRow east={east[0]} west={west[0]} key={parseInt(i)}/>)
                }
            }

            return rikilist;
        }

    }

    dummyRows(){
        let dummy = [];
        for (var i = 0; i < 21; i++){
            dummy.push(
                <tr>
                    <td><br/></td>
                    <td/>
                    <td/>
                </tr>
            )
        }
        return dummy
    }

    render(){
        if (this.state.sumos.length == 0) {
            return (
                <div className="col-md-8 col-xl-6 text-left" style={{float: 'none', margin: '0 auto'}}>
                    <h1>{this.state.division}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>East (東)</th>
                                <th>Rank</th>
                                <th>West (西)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dummyRows()}
                        </tbody>
                    </Table>
                </div>
            )
        }

        return(
            <div className="col-md-8 col-xl-6 text-left" style={{float: 'none', margin: '0 auto'}}>
                <h1>{this.state.division}</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>East (東)</th>
                            <th>Rank</th>
                            <th>West (西)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.listSumo()}
                    </tbody>
                </Table>
            </div>
        )

    }
}