function minDistance(dist,sptSet,V)
{
    let min = Number.MAX_VALUE;
    let min_key = undefined;
    Object.keys(sptSet).forEach((key) => {
        if (sptSet[key] == false && dist[key] <= min) {
            {
                min = dist[key];
                min_key = key;
            }
        }
    });
    return min_key;
}




dijkstra = (graph,src,minDistance)=>
{
    let dist = {};
    let sptSet = {};
    let V = Object.keys(graph).length
    // console.log(graph,"GRAphhhhhhhhhhhhhhhhhhhhh")
    Object.keys(graph).forEach((key) =>{
        dist[key] = Number.MAX_VALUE;
        sptSet[key] = false;
    })
    // console.log(dist,"PRINT DISTTTTT")
     
    dist[src] = 0;
    // console.log(dist,"INDIFINFINFIIFJIJFIJJIFJIFJ")
    // console.log("LOCALYTION FOR DJISKRA ALGO")

    for(let count = 0; count < V-1; count++)
    {
        let u = minDistance(dist, sptSet);
        console.log(u)
        sptSet[u] = true;
        for (let j = 0; j < graph[u].length; j++) {
            let v = graph[u][j][0];
            let weight = graph[u][j][1];
            // let path = graph[u][j][2]
            // let previous = graph[u][j-1][2]
            // console.log(path,previous,"VIAAAAAAAAAAAAAAAAAAAAAAAAAa")
            // if(!dist[u]['path']) {
            //     // console.log("INSISEEE")
            //     dist[u]['path'] = path;
            //   }
            // 
            //   else {
            //     dist[v]['path'] = path
            //   }
            if (!sptSet[v] && dist[u] < Infinity && (dist[u] + weight) < dist[v]) {
              dist[v] = (dist[u] + weight);
            }
        }
    }
    console.log(dist,"DISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSss")

    return dist
     
}

module.exports = {dijkstra,minDistance}