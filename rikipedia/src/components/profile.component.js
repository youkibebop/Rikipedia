import React, {Component} from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

export default class SumoProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            kanji: "",
            division: "",
            rank: "",
            rank2: "",
            stable: "",
            dob: new Date(),
            debutDate: new Date(),
            birthplace: "",
            height: 0,
            weight: 0,
            favouriteTechnique: "",
            loaded: false,
        }
        
    }


    //automatically called before anything is displayed on the page
    componentDidMount(){

        if (this.props.match.params.id === "Random"){
            axios.get('http://localhost:5000/rikishi/')
            .then(res => {
                //this.randomRikishi(res.data);
                var randId = res.data[Math.floor(Math.random()*(res.data).length)]._id;
                axios.get('http://localhost:5000/rikishi/'+ randId)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        kanji: response.data.kanji,
                        division: response.data.division,
                        rank: response.data.rank,
                        rank2: response.data.rank2,
                        stable: response.data.stable,
                        dob: new Date(response.data.dob),
                        debutDate: new Date(response.data.debutDate),
                        birthplace: response.data.birthplace,
                        height: response.data.height,
                        weight: response.data.weight,
                        favouriteTechnique: response.data.favouriteTechnique,
                        loaded: true
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                
            })
            .catch((error) => {
                console.log(error);
            })

        } else {
            axios.get('http://localhost:5000/rikishi/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    kanji: response.data.kanji,
                    division: response.data.division,
                    rank: response.data.rank,
                    rank2: response.data.rank2,
                    stable: response.data.stable,
                    dob: new Date(response.data.dob),
                    debutDate: new Date(response.data.debutDate),
                    birthplace: response.data.birthplace,
                    height: response.data.height,
                    weight: response.data.weight,
                    favouriteTechnique: response.data.favouriteTechnique,
                    loaded: true
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        }

    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className="col-md-8 col-lg-8 col-xl-8 text-left" style={{float: 'none', margin: '0 auto'}} > 
                <div className="card mt-3">
                    <div className="card-header" style={{height: '110px'}}>

                    </div>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-lg-6">
                                <img src={ require('../img/hakuho.jpg') } className="rounded mx-auto d-block img-fluid" style={{maxWidth: '350px'}} alt="Fighter Photo" /> 
                            </div>
                            <div className="col-lg-6">
                                <table className="table" style={{width:"100%"}}>
                                    <tbody>
                                        <tr>
                                            <td >
                                                Heya
                                            </td>
                                            <td id="fighter-heya">{this.state.stable}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                        </tr>
                                        <tr>
                                            <td>Rank</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth</td>
                                        </tr>
                                        <tr>
                                            <td>Place of Birth</td>
                                        </tr>
                                        <tr>
                                            <td>Height</td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                        </tr>
                                        <tr>
                                            <td>Favourite Grip/Techniques</td>
                                        </tr>
                                    </tbody>
                                </table>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div className="col-md-8 col-lg-8 col-xl-8 text-left" style={{float: 'none', margin: '0 auto'}} > 
                <div className="card mt-3">
                    <div className="card-header">
                        <h1 id="fighter-name">{this.state.name + " (" +  this.state.kanji + ")"}</h1>
                        <h4 className="card-subtitle mb-2 text-muted">{this.state.rank}</h4>
                    </div>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6">
                                <Image src={require("../img/hakuho.jpg")} fluid rounded className="mx-auto d-block" style={{maxWidth:"100%", maxHeight:"500px"}} /> 
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <table className="table" style={{width: "100%"}}>
                                    <colgroup>
                                        <col span="1" style={{width: "40%"}}/>
                                        <col span="1" style={{width: "60%"}}/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td >
                                                Heya
                                            </td>
                                            <td id="fighter-heya">{this.state.stable}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td id="fighter-name">{this.state.name + " (" +  this.state.kanji + ")"}</td>
                                        </tr>
                                        <tr>
                                            <td>Rank</td>
                                            <td id="fighter-rank">{this.state.rank + " (" + this.state.rank2 + ")"}</td>
                                        </tr>
                                        <tr>
                                            <td>Date of Birth</td>
                                            <td id="fighter-dob">placeholder</td>
                                        </tr>
                                        <tr>
                                            <td>Place of Birth</td>
                                            <td id="fighter-origin">{this.state.birthplace}</td>
                                        </tr>
                                        <tr>
                                            <td>Height</td>
                                            <td id="fighter-height">{this.state.height + " cm"}</td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                            <td id="fighter-weight">{this.state.weight + " kg"}</td>
                                        </tr>

                                
                                    </tbody>
                                </table>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
      }
}