const stationData = require('../utility/data/station-data.js')
let  stationCachedData =  require('../utility/cached-data.js')
const {dijkstra,minDistance} = require('../utility/utility.js')

exports.addStationDetails = async ()=> {
    try {
        stationCachedData = {}
        const db = await  client.db('test');
        const collection = db.collection('station_details');
            
          await collection.insertMany(stationData);
      } 
      catch (err){
        console.log(err)
      }
     
}

exports.getStationsDetails = async (city) => {
    try {
        // await client.connect();
        const db = await client.db('test');
        const upper_case_city = city.toUpperCase();
        const collection = db.collection('station_details');
        const station_fetched_data =   await collection.find({city:upper_case_city}).toArray();
        console.log(station_fetched_data,"STATIONSSSSSSSSSSSSSSs");
        return station_fetched_data;
      } 
      catch (err){
        console.log(err)
        return []
      }
}

exports.ticketFareCalculator = async (src,dest,city)=> {
    try {
        // this section can be shortend by creating a variable for city
        if(city.toUpperCase() === "DELHI") {
        if(Object.keys(stationCachedData.delhi).length > 0 ) {
            console.log("Inside CACHED DAtA")
            if(stationCachedData.delhi[src][dest] <= 3) {
                return {fare: 10,via:""}
            }
            else if(stationCachedData.delhi[src][dest] >3 && stationCachedData.delhi[src][dest] <=8) {
                return {fare: 15,via:""}
            }
            else if(stationCachedData.delhi[src][dest] >8 && stationCachedData.delhi[src][dest] <=15) {
                return {fare: 20,via:""}
            }
    
            else if(stationCachedData.delhi[src][dest] >15 && stationCachedData.delhi[src][dest] <=22) {
                return {fare: 25,via:""}
            }
            else {
                return {fare: 30,via:""}
            }
            
        } 
        else {
        // await client.connect();
        const db = await client.db('test');
        const collection = db.collection('station_details');
            
        const station_fetched_data =   await collection.find({city: city.toUpperCase()}).toArray();
        // console.log(station_fetched_data,"FETCHEDDDDDDD")
        const bi_directional_graph = {}
        station_fetched_data.forEach((data,index)=>{   
            bi_directional_graph[data['station_id']] = data['linked_station']
        })

        // console.log('Adjacency matrix stored in MongoDB.', bi_directional_graph);
        Object.keys(bi_directional_graph).forEach(key=>{
            stationCachedData.delhi[key] =  dijkstra(bi_directional_graph,key,minDistance)
        })
        console.log(stationCachedData.delhi[src][dest])
        
        if(stationCachedData.delhi[src][dest] <= 3) {
            return {fare: 10,via:""}
        }
        else if(stationCachedData.delhi[src][dest] >3 && stationCachedData.delhi[src][dest] <=8) {
            return {fare: 15,via:""}
        }
        else if(stationCachedData.delhi[src][dest] >8 && stationCachedData.delhi[src][dest] <=15) {
            return {fare: 20,via:""}
        }

        else if(stationCachedData.delhi[src][dest] >15 && stationCachedData.delhi[src][dest] <=22) {
            return {fare: 25,via:""}
        }
        else {
            return {fare: 30,via:""}
        }
      }
    }
    else {
        if(Object.keys(stationCachedData.mumbai).length > 0 ) {
            const db = await client.db('test');
            const collection = db.collection('station_details');
            let via = ""
            const source_dest_station_details =   await collection.find({station_id: {$in: [src,dest]}}).toArray();
            console.log(source_dest_station_details,"INSIDE TICKET PRICE")
            if(source_dest_station_details[0].linked_station[0][2] === source_dest_station_details[1].linked_station[0][2] ) {
                via = ""
            }
            else {
                if(source_dest_station_details[0].linked_station[0][2] === "blue") {
                    via = "JB Nagar"
                }
                else {
                    via = "Gundavali"
                }
            }
            // console.log("Inside CACHED DAtA",stationCachedData.mumbai,stationCachedData.mumbai[src][dest])
            if(stationCachedData.mumbai[src][dest] <= 3) {
                return {fare: 10,via: via};
            }
            else if(stationCachedData.mumbai[src][dest] >3 && stationCachedData.mumbai[src][dest] <=8) {
               return  {fare: 15,via: via}
            }
            else if(stationCachedData.mumbai[src][dest] >8 && stationCachedData.mumbai[src][dest] <=15) {
                return {fare: 20,via: via}
            }
    
            else if(stationCachedData.mumbai[src][dest] >15 && stationCachedData.mumbai[src][dest] <=22) {
                return {fare: 25,via: via}
            }
            else {
                return {fare: 30,via: via}
            }
            
        } 
        else {
        // await client.connect();
        let via = ""
        const db = await client.db('test');
        const collection = db.collection('station_details');
        const source_dest_station_details =   await collection.find({station_id: {$in: [src,dest]}}).toArray();
        console.log(source_dest_station_details[0].linked_station[0][2] , source_dest_station_details[1].linked_station[0][2],"INSIDE TICKET PRICE")
        if(source_dest_station_details[0].linked_station[0][2] === source_dest_station_details[1].linked_station[0][2] ) {
            via = ""
        }
        else {
            if(source_dest_station_details[0].linked_station[0][2] === "blue") {
                via = "JB Nagar"
            }
            else {
                via = "Gundavali"
            }
        }
        const station_fetched_data =   await collection.find({city: city.toUpperCase()}).toArray();
        // console.log(station_fetched_data,"FETCHEDDDDDDD")
        const bi_directional_graph = {}
        station_fetched_data.forEach((data,index)=>{   
            bi_directional_graph[data['station_id']] = data['linked_station']
        })

        // console.log('Adjacency matrix stored in MongoDB.', bi_directional_graph);
        Object.keys(bi_directional_graph).forEach(key=>{
            stationCachedData.mumbai[key] =  dijkstra(bi_directional_graph,key,minDistance)
        })
        // console.log(stationCachedData.mumbai[src][dest],"DISTANCEEEEEeeeeeeeeeeeEEEEE")
        
        if(stationCachedData.mumbai[src][dest] <= 3) {
            return {fare: 10,via: via};
        }
        else if(stationCachedData.mumbai[src][dest] >3 && stationCachedData.mumbai[src][dest] <=8) {
           return  {fare: 15,via: via}
        }
        else if(stationCachedData.mumbai[src][dest] >8 && stationCachedData.mumbai[src][dest] <=15) {
            return {fare: 20,via: via}
        }

        else if(stationCachedData.mumbai[src][dest] >15 && stationCachedData.mumbai[src][dest] <=22) {
            return {fare: 25,via: via}
        }
        else {
            return {fare: 30,via: via}
        }
      }
    } 
    }
      catch (err){
        console.log(err)
      }
     
}