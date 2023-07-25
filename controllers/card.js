const moment = require("moment");
let stationCachedData = require("../utility/cached-data.js");
const { minDistance,dijkstra } = require("../utility/utility.js");

exports.addCard = async (cardData) => {
  try {
    // await client.connect();
    const db = await client.db("test");
    const collection = db.collection("carddetails");
    const res = await collection.insertOne(cardData);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

exports.getCard = async (user) => {
  try {
    console.log("INside get card");
    // await client.connect();
    const db = await client.db("test");
    const collection = db.collection("carddetails");
    const res = await collection.findOne(
      { user: user },
      { projection: { cardnumber: 1, user: 1, amount: 1, status: 1 } }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

exports.cardCheckIn = async (cardnumber, city) => {
  try {
    // await client.connect();
    const db = client.db("test");
    const collection = db.collection("carddetails");
    const currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    await collection.updateOne(
      { cardnumber: cardnumber },
      { $set: { status: ["checkedin", city, currentTime] } }
    );
    return { ok: true, result: "Successfully Checked In" };
  } catch (err) {
    console.log(err);
    return { ok: false, details: "Unabke to CheckIn" };
  }
};

exports.cardCheckOut = async (cardnumber, city, dest) => {
  try {
    // await client.connect();
    const db = await client.db("test");
    const collection = db.collection("carddetails");
    const currentCardCheckInDetails = await collection.findOne(
      { cardnumber: cardnumber },
      { projection: { amount: 1, status: 1 } }
    );
    console.log(
      "CUREENT CHECK IN NNNN DETAILSSSSSSSSS",
      currentCardCheckInDetails
    );
    if (
      currentCardCheckInDetails.status[0] === "checkedin" &&
      currentCardCheckInDetails.amount >= 10
    ) {
      console.log("CUREENT CHECK IN NNNN DETAILSSSSSSSSS");
      let src = currentCardCheckInDetails.status[1];
      let fare = 0;
      try {
        if (city.toUpperCase() === "DELHI") {
          if (Object.keys(stationCachedData.delhi).length > 0) {
            console.log(
              "Inside CACHED DAtA00000000000000000000000000000000000000000000"
            );
            if (stationCachedData.delhi[src][dest] <= 3) {
              return 10;
            } else if (
              stationCachedData.delhi[src][dest] > 3 &&
              stationCachedData.delhi[src][dest] <= 8
            ) {
              return 15;
            } else if (
              stationCachedData.delhi[src][dest] > 8 &&
              stationCachedData.delhi[src][dest] <= 15
            ) {
              return 20;
            } else if (
              stationCachedData.delhi[src][dest] > 15 &&
              stationCachedData.delhi[src][dest] <= 22
            ) {
              return 25;
            } else {
              return 30;
            }
          } else {
            // await client.connect();
            const db = await client.db("test");
            const collection = db.collection("station_details");

            const station_fetched_data = await collection
              .find({ city: city.toUpperCase() })
              .toArray();
            const bi_directional_graph = {};
            station_fetched_data.forEach((data, index) => {
              bi_directional_graph[data["station_id"]] = data["linked_station"];
            });

            console.log(
              "Adjacency matrix stored in MongoDB.",
              bi_directional_graph
            );
            Object.keys(bi_directional_graph).forEach((key) => {
              stationCachedData.delhi[key] = dijkstra(
                bi_directional_graph,
                key,
                minDistance
              );
            });
            console.log(stationCachedData.delhi[src][dest]);

            if (stationCachedData.delhi[src][dest] <= 3) {
              fare = 10;
            } else if (
              stationCachedData.delhi[src][dest] > 3 &&
              stationCachedData.delhi[src][dest] <= 8
            ) {
              fare = 15;
            } else if (
              stationCachedData.delhi[src][dest] > 8 &&
              stationCachedData.delhi[src][dest] <= 15
            ) {
              fare = 20;
            } else if (
              stationCachedData.delhi[src][dest] > 15 &&
              stationCachedData.delhi[src][dest] <= 22
            ) {
              fare = 25;
            } else {
              fare = 30;
            }
          }
        } else {
          if (Object.keys(stationCachedData.mumbai).length > 0) {
            console.log("Inside CACHED DAtA","MUMABIAA",src,dest,stationCachedData.mumbai[src][dest]);
            if (stationCachedData.mumbai[src][dest] <= 3) {
              fare = 10;
            } else if (
              stationCachedData.mumbai[src][dest] > 3 &&
              stationCachedData.mumbai[src][dest] <= 8
            ) {
              fare = 15;
            } else if (
              stationCachedData.mumbai[src][dest] > 8 &&
              stationCachedData.mumbai[src][dest] <= 15
            ) {
              fare = 20;
            } else if (
              stationCachedData.mumbai[src][dest] > 15 &&
              stationCachedData.mumbai[src][dest] <= 22
            ) {
              fare = 25;
            } else {
              fare = 30;
            }
          } else {
            // await client.connect();
            const db = await client.db("test");
            const collection = db.collection("station_details");

            const station_fetched_data = await collection
              .find({ city: city.toUpperCase() })
              .toArray();
            // console.log(station_fetched_data,"FETCHEDDDDDDD")
            const bi_directional_graph = {};
            station_fetched_data.forEach((data, index) => {
              bi_directional_graph[data["station_id"]] = data["linked_station"];
            });

            console.log(
              "Adjacency matrix stored in MongoDB.",
              bi_directional_graph
            );
            Object.keys(bi_directional_graph).forEach((key) => {
              stationCachedData.mumbai[key] = dijkstra(
                bi_directional_graph,
                key,minDistance
              );
            });
            console.log(stationCachedData.mumbai[src][dest]);

            if (stationCachedData.mumbai[src][dest] <= 3) {
              fare = 10;
            } else if (
              stationCachedData.mumbai[src][dest] > 3 &&
              stationCachedData.mumbai[src][dest] <= 8
            ) {
              fare = 15;
            } else if (
              stationCachedData.mumbai[src][dest] > 8 &&
              stationCachedData.mumbai[src][dest] <= 15
            ) {
              fare = 20;
            } else if (
              stationCachedData.mumbai[src][dest] > 15 &&
              stationCachedData.mumbai[src][dest] <= 22
            ) {
              fare = 25;
            } else {
              fare = 30;
            }
          }
        }
        const cardAmount = currentCardCheckInDetails.amount - fare;
        await collection.updateOne(
          { cardnumber: cardnumber },
          { $set: { status: ["active"], amount: cardAmount } }
        );
        return { ok: true, result: "Successfully Checked Out" };
      } catch (err) {
        return { ok: false, result: "Please Try Again " };
      }
    } else {
      return {
        ok: false,
        result: "Please Check In First And Check you card balance",
      };
    }
  } catch (err) {
    console.log(err);
    return { ok: false, details: "Unabke to CheckOut Please try again" };
  }
};
