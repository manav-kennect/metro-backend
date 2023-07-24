let stationData = [
    {station_name: 'Versova', station_id: '1234', linked_station: [['1111', 2,"blue"]],city: "MUMBAI"}
    ,{station_name: 'DN Nagar', station_id: '1111', linked_station: [['1234', 2,"blue"],['2264', 3,"blue"]] ,city: "MUMBAI"}
    ,{station_name: 'Azad nagar', station_id: '2264', linked_station: [['2265', 4,"blue"],['1111', 3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Andheri', station_id: '2265', linked_station: [['2264', 4,"blue"],['2267', 2,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Western Express Highway', station_id: '2267', linked_station: [['2265', 2,"blue"],['2266',1,"blue"]],city: "MUMBAI"}
    ,{station_name: 'JB Nagar', station_id: '2266', linked_station: [['2267', 1,"blue"],['2268',3,"blue"],['222268',1,"red"]],city: "MUMBAI"}
    ,{station_name: 'Airport Road', station_id: '2268', linked_station: [['2269', 1,"blue"],['2266',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Marol Naka', station_id: '2269', linked_station: [['2268', 1,"blue"],['2270',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Marol Naka', station_id: '2270', linked_station: [['2271', 1,"blue"],['2269',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Saki Naka', station_id: '2271', linked_station: [['2270', 1,"blue"],['2272',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Asalpha', station_id: '2272', linked_station: [['2273', 5,"blue"],['2271',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Jagurti Nagar', station_id: '2273', linked_station: [['2272', 5,"blue"],['2274',3,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Ghatgopar', station_id: '2274', linked_station: [['2273',3,"blue"]],city: "MUMBAI"}
    ,
    {station_name: 'Gundavali', station_id: '222268', linked_station: [['21111', 2,"red"],['2266', 1,"blue"]],city: "MUMBAI"}
    ,{station_name: 'Mogra', station_id: '21111', linked_station: [['222268', 2,"red"],['22264', 3,"red"]] ,city: "MUMBAI"}
    ,{station_name: 'Jogeshwari(E)', station_id: '22264', linked_station: [['22265', 4,"red"],['21111', 3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Goregaon(E)', station_id: '22265', linked_station: [['22264', 4,"red"],['22267', 2,"red"]],city: "MUMBAI"}
    ,{station_name: 'Aarey', station_id: '22267', linked_station: [['22265', 2,"red"],['22266',1,"red"]],city: "MUMBAI"}
    ,{station_name: 'Dindoshi', station_id: '22266', linked_station: [['22267', 1,"red"],['22268',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Kurar', station_id: '22268', linked_station: [['22269', 1,"red"],['22266',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Akurli', station_id: '22269', linked_station: [['22268', 1,"red"],['22270',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Poisor', station_id: '22270', linked_station: [['22271', 1,"red"],['22269',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Magathane', station_id: '22271', linked_station: [['22270', 1,"red"],['22272',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Devipada', station_id: '22272', linked_station: [['22273', 5,"red"],['22271',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Rashtriya Udhyan', station_id: '22273', linked_station: [['22272', 5,"red"],['22274',3,"red"]],city: "MUMBAI"}
    ,{station_name: 'Ovari Pada', station_id: '22274', linked_station: [['22273',3,"red"]],city: "MUMBAI"}
    ,
    {station_name: 'Rajiv Chowk', station_id: '11234', linked_station: [['11111', 2,"blue"]],city: "DELHI"}
    ,{station_name: 'BaraKhambha', station_id: '11111', linked_station: [['11234', 2,"blue"],['12264', 3,"blue"]] ,city: "DELHI"}
    ,{station_name: 'Mandi House', station_id: '12264', linked_station: [['12265', 4,"blue"],['11111', 3,"blue"]],city: "DELHI"}
    ,{station_name: 'Supreme Court', station_id: '12265', linked_station: [['12264', 4,"blue"],['12267', 2,"blue"]],city: "DELHI"}
    ,{station_name: 'Indrapastha', station_id: '12267', linked_station: [['12265', 2,"blue"],['12266',1,"blue"]],city: "DELHI"}
    ,{station_name: 'Yamuna Bank', station_id: '12266', linked_station: [['12267', 1,"blue"],['12268',3,"blue"]],city: "DELHI"}
    ,{station_name: 'Laxmi Nagar', station_id: '12268', linked_station: [['12269', 1,"blue"],['12266',3,"blue"]],city: "DELHI"}
    ,{station_name: 'Nirmal Nagar', station_id: '12269', linked_station: [['12268', 1,"blue"],['12270',3,"blue"]],city: "DELHI"}
    ,{station_name: 'Preet Vihar', station_id: '12270', linked_station: [['12271', 1,"blue"],['12269',3,"blue"]],city: "DELHI"}
    ,{station_name: 'KarKar Duma Court', station_id: '12271', linked_station: [['12270', 1,"blue"],['12272',3,"blue"]],city: "DELHI"}
    ,{station_name: 'KarKar Duma', station_id: '12272', linked_station: [['12273', 5,"blue"],['12271',3,"blue"]],city: "DELHI"}
    ,{station_name: 'Anand Vihar', station_id: '12273', linked_station: [['12272', 5,"blue"],['12274',3,"blue"]],city: "DELHI"}
    ,{station_name: 'Vaishali', station_id: '12274', linked_station: [['12273',3,"blue"]],city: "DELHI"}
    
    
    
    
    
    
    
]

module.exports = stationData