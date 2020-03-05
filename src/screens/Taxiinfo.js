import React, { Component } from 'react';
import { View , Text} from 'native-base';
import { StyleSheet , Alert } from 'react-native';
import { Button , Spinner , Icon} from 'native-base';


export default class Taxiinfo extends Component{

    constructor(props){
        super(props);
    }

    Buttonselect =(item , av)=>{
        if(this.props.idtaxiselected == 0){ 
        if(av){
        return <Button bordered dark  rounded style={styles.select} onPress={()=>{this.props.selectedTaxi(item)}}><Text>Select</Text></Button> 
        }else{
        return <Button bordered dark  disabled rounded style={styles.select} onPress={()=>{console.log(item.id)}}><Text>Select</Text></Button>
        }   
        }else{
        if(item.id == this.props.idtaxiselected){
        return <View style={styles.selected}><Text style={styles.statutP}>Statut :Pending</Text><Button icon bordered danger small  onPress={()=>{this.props.cancel()}}><Icon name='trash' /></Button></View>
        }else{
        return <Button bordered dark  disabled rounded style={styles.select} onPress={()=>{console.log(item.id)}}><Text>Select</Text></Button>
        }   
        }     
    }
    available = (av)=>{
        if (av == 1) {
            return <Text style={styles.av}>available</Text>
        } else {
           return <Text style={styles.noav}>No available</Text>
        }
       }

    render(){
        return(
        <View style={styles.taxiinfo}>
          <View style={styles.textHeader}>
          <Text style={styles.drivername}>{this.props.item.ownername}</Text>  
          <Text style={styles.marque}>{this.props.item.taxiname}</Text>    
          </View> 
        
          <View style={styles.lastrow}>
            <View style={styles.flex1}>
            <View>{this.available(this.props.item.is_available)}</View>
            <Text style={styles.av}>{this.props.item.distance}</Text>  
            </View>  
            <View style={styles.flex2}>
            {this.Buttonselect(this.props.item , this.props.item.is_available)}
            </View> 
          </View>   
        </View> 
        )
    }


}
const styles = StyleSheet.create({
    title:{
        padding:10,
        fontSize:30,
        fontWeight: 'bold'
    },
    taxiinfo:{
       height:100,
       backgroundColor:'#ffffff',
       borderBottomColor:'#9e9e9efc',
       borderBottomWidth:0.5,
       padding:10
    },
    textHeader:{
        flexDirection:'row'
    },
    drivername:{
        flex:1,
        fontSize:15,
        fontWeight: 'bold'
    },
    marque:{
        flex:1.5,
        fontSize:15,
        color:"#92979cc7"
    },
    av:{
        fontSize:15,
        color:"#92979cc7",
        marginTop:5

    },
    noav:{
        fontSize:15,
        color:"#f443368f",
        marginTop:5
    },
    lastrow:{ 
     flexDirection:"row"
    },
    flex1:{
        flex:1
    },
    flex2:{
        flex:1,
        alignItems:"flex-end",
        alignSelf:"center"
    },
    select:{
        width:80,
        height:"65%"

    },
    selected:{
        flexDirection:"row",
        marginTop:20
    },
    statutP:{
        marginEnd:50,
        marginTop:20,
        fontSize:15,
        color:'#5586748c'
    }
})