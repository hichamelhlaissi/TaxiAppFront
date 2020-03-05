import React, { Component } from 'react';
import { View , Text} from 'native-base';
import { StyleSheet , FlatList , Alert} from 'react-native';
import { Button , Spinner , Icon} from 'native-base';
import Taxiinfo from './Taxiinfo';
import * as service from '../service';
 export const Taxi=[

       
]
export function getTaxis(){
    new Promise(function(res , rej) {
        if(Taxi.length == 0){
            service.alltaxis()
            .then((response) => response.json())
            .then(
                data=>{
                    // Taxi = data;
                    for (const cord of data) {
                        cord.lat_long = cord.latitude+","+cord.longitude;
                        Taxi.push(cord);
                    } 
                    // for (const cord of Taxi) {
                    //     cord.lat_long = cord.latitude+","+cord.longitude;
                    // } 

                    res(data);
                }
            )
            .then(
                (data)=>{

                }
            )
        }else{
            for (const cord of Taxi) {
                cord.lat_long = cord.latitude+","+cord.longitude;
            } 
            res(Taxi);
        }
        })
        .then(data =>{
          for(let index = 0; index < Taxi.length; index++) {
             this.Taxis += Taxi[index].lat_long;
             if(index != Taxi.length-1){
                this.Taxis +="|"   
             }             
           }  
        }).finally(
            data=>{

                // this.getdistance() 
                // this.setState({Taxis:this.Taxis})
        fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.clientP+'&destinations='+this.Taxis+'&key=AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg')
        .then((response) => response.json())
        .then((data)=>{
              for (const dd of data.rows) {
                  let i =0;
                  for (const element of dd.elements) {
                    if(element.status == "OK"){
                        Taxi[i].distance = element.duration.text;
                        // Taxi[i].distance = element.distance.text;
                        Taxi[i].distance = Taxi[i].distance.replace(/\s/g, '');
                    // console.log(Taxi[i].distance.replace(/\s/g, '')) 
                    } 
                    i++;
                  }
              } 
          }).catch(er=>{
            // console.log(er)
          })
          .finally(data=>{
            Taxi.sort((a, b) => (parseInt(a.distance) > parseInt(b.distance)) ? 1 : -1); 
            this.setState({ listTaxi:Taxi}); 
          })
            }
        ) 
}
export default class ChooseTaxi extends Component  {
   
    constructor(props){
        super(props);
        const {state} = props.navigation;
        this.clientP = state.params.localisation;
        this.destinationinfo = state.params.destinationinfo;
        this.departinfo = state.params.departinfo;
        
        this.state={
           idtaxiselected:0
        } 
        // Taxi.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
        
        // setTimeout(()=>{ this.setState({ listTaxi:Taxi}) }, 1000);  
        // this.getdistance();

        // this.getcord() 

        let getcordoo  = getTaxis.bind(this);
        getcordoo(); 
    }
    clientP = "";
    Taxis = "";
    destinationinfo = {};
    departinfo = {};
    
    // getcord =()=>{
    //    new Promise(function(res , rej) {
    //     for (const cord of Taxi) {
    //         cord.lat_long = cord.latitude+","+cord.longitude;
    //     } 
    //     res(Taxi);
    //     })
    //     .then(data =>{
    //       for(let index = 0; index < Taxi.length; index++) {
    //          this.Taxis += Taxi[index].lat_long;
    //          if(index != Taxi.length-1){
    //             this.Taxis +="|"   
    //          }             
    //        }  
    //     }).finally(
    //         data=>{
    //             // console.log(this.Taxis)
    //             this.getdistance()
    //             // this.setState({Taxis:this.Taxis})
    //         }
    //     )        
    // }
    componentDidUpdate(prevState){
        // if (this.state !== prevState) {
        //     console.log(this.Taxis)
        //   }
       
    }
    getdistance=()=>{
        // console.log(this.Taxis)
        // fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.clientP+'&destinations='+this.Taxis+'&key=AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg')
        // .then((response) => response.json())
        // .then((data)=>{
        //       for (const dd of data.rows) {
        //           let i =0;
        //           for (const element of dd.elements) {
        //             if(element.status == "OK"){
        //                 Taxi[i].distance = element.distance.text;
        //                 Taxi[i].distance = Taxi[i].distance.replace(/\s/g, '');
        //             // console.log(Taxi[i].distance.replace(/\s/g, '')) 
        //             } 
        //             i++;
        //           }
        //       } 
        //   }).catch(er=>{
        //     // console.log(er)
        //   })
        //   .finally(data=>{
        //     Taxi.sort((a, b) => (parseInt(a.distance) > parseInt(b.distance)) ? 1 : -1); 
        //     this.setState({ listTaxi:Taxi}); 
        //   })
    }
    renderRow=({item})=> {

        return ( 
        <Taxiinfo cancel={this.cancelselection} idtaxiselected={this.state.idtaxiselected} item={item} selectedTaxi={this.selectTaxialert}></Taxiinfo>   
        
        );
    }
    selectTaxialert=(item)=>{ 
        Alert.alert("You have select a taxi", item.name, [
            { 
              text: 'Confirm',
              onPress: () => this.selectTaxi(item),
              style: 'cancel',
            }, 
            {
                text: 'Cancel',
                style: 'cancel',
              },
          ]);
    }
    // selectTaxi(id){
    //   this.setState({idtaxiselected:id})
    // }
    selectTaxi=(taxiinfo)=>{
      
        new Promise((res, rej)=>{
        this.setState({idtaxiselected:taxiinfo.id}); 
        let infoOrder={
          From:this.departinfo,
          To:this.destinationinfo,
          Taxiinfo:taxiinfo
        };
        res(infoOrder);
        }).then(data=>{
        //   this.props.confirmOrder(data);
        console.log(data)
        })
      }
    cancelselection=()=>{
        Alert.alert("Are you Sure you want to cancel?", "", [
            { 
              text: 'Confirm',
              onPress: () => this.setState({idtaxiselected:0}),
              style: 'cancel',
            }, 
            {
                text: 'Cancel',
                style: 'cancel',
              },
          ]);
        
    }
    listorspinner(){
        if(this.state.listTaxi){
         return  <FlatList
                data = {this.state.listTaxi}
                renderItem = {this.renderRow}
                keyExtractor={item => item.id}
            />
        }else{
         return <Spinner color='black' />
        }
    }
    render() {
        return(
            <>
          <Text style={styles.title}>Nearby Drivers</Text>
          {
              this.listorspinner()
          }
           
            </>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        padding:10,
        fontSize:30,
        fontWeight: 'bold'
    }
})