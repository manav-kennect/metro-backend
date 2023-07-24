const stationData = require('../utility/data/station-data.js')
let  stationCachedData =  require('../utility/cached-data.js')
const {dijkstra,minDistance} = require('../utility/utility.js')

exports.addStationDetails = async ()=> {
    try {
        stationCachedData = {}
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('station_details');
            
          await collection.insertMany(stationData);
    
        const databasesList = await client.db().admin().listDatabases();
 
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
      } 
      catch (err){
        console.log(err)
      }
     
}

exports.getStationsDetails = async (city) => {
    try {
        await client.connect();
        const db = client.db('metro');
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
        if(city.toUpperCase() === "DELHI") {
        if(Object.keys(stationCachedData.delhi).length > 0 ) {
            console.log("Inside CACHED DAtA")
            if(stationCachedData[src][dest] <= 3) {
                return 10;
            }
            else if(stationCachedData[src][dest] >3 && stationCachedData[src][dest] <=8) {
                return 15
            }
            else if(stationCachedData[src][dest] >8 && stationCachedData[src][dest] <=15) {
                return 20
            }
    
            else if(stationCachedData[src][dest] >15 && stationCachedData[src][dest] <=22) {
                return 25
            }
            else {
                return 30
            }
            
        } 
        else {
        await client.connect();
        const db = client.db('metro');
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
            return 10;
        }
        else if(stationCachedData.delhi[src][dest] >3 && stationCachedData.delhi[src][dest] <=8) {
            return 15
        }
        else if(stationCachedData.delhi[src][dest] >8 && stationCachedData.delhi[src][dest] <=15) {
            return 20
        }

        else if(stationCachedData.delhi[src][dest] >15 && stationCachedData.delhi[src][dest] <=22) {
            return 25
        }
        else {
            return 30
        }
      }
    }
    else {
        if(Object.keys(stationCachedData.mumbai).length > 0 ) {
            console.log("Inside CACHED DAtA",stationCachedData.mumbai,stationCachedData.mumbai[src][dest])
            if(stationCachedData.mumbai[src][dest] <= 3) {
                return 10;
            }
            else if(stationCachedData.mumbai[src][dest] >3 && stationCachedData.mumbai[src][dest] <=8) {
                return 15
            }
            else if(stationCachedData.mumbai[src][dest] >8 && stationCachedData.mumbai[src][dest] <=15) {
                return 20
            }
    
            else if(stationCachedData.mumbai[src][dest] >15 && stationCachedData.mumbai[src][dest] <=22) {
                return 25
            }
            else {
                return 30
            }
            
        } 
        else {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('station_details');
            
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
        console.log(stationCachedData.mumbai[src][dest],"DISTANCEEEEEeeeeeeeeeeeEEEEE")
        
        if(stationCachedData.mumbai[src][dest] <= 3) {
            return 10;
        }
        else if(stationCachedData.mumbai[src][dest] >3 && stationCachedData.mumbai[src][dest] <=8) {
            return 15
        }
        else if(stationCachedData.mumbai[src][dest] >8 && stationCachedData.mumbai[src][dest] <=15) {
            return 20
        }

        else if(stationCachedData.mumbai[src][dest] >15 && stationCachedData.mumbai[src][dest] <=22) {
            return 25
        }
        else {
            return 30
        }
      }
    } 
    }
      catch (err){
        console.log(err)
      }
     
}