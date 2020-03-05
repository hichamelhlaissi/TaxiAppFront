import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet , View, Image , TouchableOpacity , Dimensions , Alert} from 'react-native';
import { Spinner } from 'native-base';
import * as Taxi from './ChooseTaxi';
import Taxiinfo from './Taxiinfo';
export default class Carouseltaxis extends Component{

    state ={
        currentlocation:{},
        idtaxiselected:0,
        coordinates: Taxi.Taxi,
        listTaxi:[], 
        listwait:[1,2]
    }
    clientP = "";
    Taxis = ""; 
    constructor(props){
        super(props); 
        if(this.props.departinfo){
        this.clientP = this.props.departinfo.lat+","+this.props.departinfo.lng;
         this.getallTaxi = Taxi.getTaxis.bind(this);
         this.getallTaxi();
        }
        
    }
    getallTaxi(){
  
    }
    componentDidUpdate(prevProps , prevState) {
        // Utilisation classique (pensez bien à comparer les props) :
        if (this.props.departinfo !== prevProps.departinfo) {
          this.clientP = this.props.departinfo.lat+","+this.props.departinfo.lng;
          this.setState({listTaxi:[]})
          this.getallTaxi();
          console.log("okiikikiki")
        }

      }
    selectTaxialert=(item)=>{ 
        Alert.alert("You have select a taxi", item.ownername, [
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
    selectTaxi=(taxiinfo)=>{
      
      new Promise((res, rej)=>{
      this.setState({idtaxiselected:taxiinfo.id}); 
      let infoOrder={
        From:this.props.departinfo,
        To:this.props.destinationinfo,
        Taxiinfo:taxiinfo
      };
      res(infoOrder);
      }).then(data=>{
        this.props.confirmOrder(data);
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
    renderCarouselItem = ({ item }) =>{
        if(this.state.listTaxi){
        return <Taxiinfo cancel={this.cancelselection} idtaxiselected={this.state.idtaxiselected} item={item} selectedTaxi={this.selectTaxialert}></Taxiinfo>
        }else{
            console.log("okk")
        return   <Spinner color='black' />
        }
    };
    affcondition=()=>{
        if(this.state.listTaxi.length > 0){ 
            return( 
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.listTaxi} 
            containerCustomStyle={styles.carousel}
            renderItem={this.renderCarouselItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.props.onCarouselItemChange(index)}
        />)
            }else{
            return   (
          <Carousel
                data={this.state.listwait} 
                containerCustomStyle={styles.carousel}
                renderItem={()=><Spinner color='black' />}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                removeClippedSubviews={false}
               
            />)
            }
    }
    render()
      {  return( 
        <>
              {
                this.affcondition()  
              } 
        </>
           
        )}
    

}
const styles = StyleSheet.create({
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 48
    }
})