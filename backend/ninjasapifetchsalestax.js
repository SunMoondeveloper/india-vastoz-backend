require("dotenv").config();

const productData = require("./data/products");
const { connectDB } = require("./config/db");
const Product = require("./models/Product");
const Salestax = require("./models/Salestax");
const axios = require("axios");

const categoryData = require("./data/category");
const Category = require("./models/Category");

connectDB();

const importData = async () => {
  try {
    // await Product.deleteMany({})

    // await Product.insertMany(productData)

    // await Category.deleteMany({})
    // await Category.insertMany(categoryData)

    // await Salestax.deleteMany({})
    // await Salestax.insertMany(salestaxData)
    // https://codigo-postal.co/en-us/usa/
    // 	Alabama 35004 to 36925
    // Alaska  99501 to 99950
    //Arizona 	85001 to 86556
    //	Arkansas 	71601 to 72959
    // 	California  90001 to 96162  -- 94604 ( 4064)
    // 	Colorado 80001 to 81658
    // Connecticut		06001 to 06928	438
    //Delaware	Dover	19701 to 19980
    //Florida	Tallahassee	32003 to 34997	1490 
    //Georgia	Atlanta	30002 to 39901	973
    //	Hawaii	Honolulu	96701 to 96898	139 P39902
//	Idaho	Boise	83201 to 83877	325
// Illinois	Springfield	60001 to 62999	1588  61803
//	Indiana	Indianapolis	46001 to 47997	987
//Iowa	Des Moines	50001 to 52809	1063
// 	Kansas	Topeka	66002 to 67954	756
//Kentucky	Frankfort	40003 to 42788	962 42047
//	Louisiana	Baton Rouge	70001 to 71497	725
//	Maine	Augusta	03901 to 04992	488
// Maryland	Annapolis	20588 to 21930	622
// 	Massachusetts	Boston	01001 to 05544	703
// Michigan	Lansing	48001 to 49971	1170
// Minnesota	Saint Paul	55001 to 56763	1031
// 	Mississippi	Jackson	38601 to 39776	533
// Missouri	Jefferson City	63001 to 65899	1171
//Montana	Helena	59001 to 59937	405
// Nebraska	Lincoln	68001 to 69367	620   69211
//	Nevada	Carson City	88901 to 89883	254
// New Hampshire	Concord	03031 to 03897	284  -- last
// New Jersey	Trenton	07001 to 08989	731
// 	New Mexico	Santa Fe	87001 to 88439	426
// NY	New York	Albany	00501 to 14925	2208 -- later
// 	North Carolina	Raleigh	27006 to 28909	1090
//North Dakota	Bismarck	58001 to 58856	407
// OH	Ohio	Columbus	43001 to 45999	1447 -- doubt
//  OR	Oregon	Salem	97001 to 97920	486
// 	Pennsylvania	Harrisburg	15001 to 19640	2213 
//Rhode Island	Providence	02801 to 02940	91
// South Carolina	Columbia	29001 to 29945	539 
// 	South Dakota	Pierre	57001 to 57799	394
// 	TN	Tennessee	Nashville	37010 to 38589	796 
// 	Texas	Austin	73301 to 88595	2655  - 83287
// Utah	Salt Lake City	84001 to 84791	347
// Vermont	Montpelier	05001 to 05907	309
// Virginia	Richmond	20101 to 24658	1241 -- p
// Washington	Olympia	98001 to 99403	733  -- 99260 
// 	West Virginia	Charleston	24701 to 26886	856 
// Wisconsin	Madison	53001 to 54990	898 -- p
// 	Wyoming	Cheyenne	82001 to 83414	195

    let start = 	20101;
    let end = 24658;
    let inc = 1;

    for (let i = start; i <= end; i++) {
      const number = start; // Replace with your number
      const nString = number.toString().padStart(5, "0");
      // console.log(nString); // This will print '00042'
      const url = "https://api.api-ninjas.com/v1/salestax?zip_code=" + nString;
      try {
        const restaxrate = await axios.get(url, {
          headers: {
            // "X-Api-Key": "X5LfkERpjwlKqN9SiDT6Rw==J6lfwHXUhRzPKS8e",
            // "X-Api-Key": "3GHjNWnym0vudRqvcKHb2Q==N6hUuZ5kbghkJe5L",
            // "X-Api-Key": "YW2LGUitWx4v8uqTiSSLMA==XU4vUdcjKnhGgdsE",
            "X-Api-Key": "EJsimks/iLScMb3POz3x2Q==xmpzIfbgRVIjAlTP",
            
            
          },
        });
        // =
        const data = restaxrate.data[0];
        console.log(data);
        start += inc;
        if (!data.error) {
          let zip_code = nString;
          let total_rate = data.total_rate;
          let state_rate = data.state_rate;
          let city_rate = data.city_rate;
          let county_rate = data.county_rate;
          let additional_rate = data.additional_rate;
          // await Salestax.create({, data.total_rate,data.state_rate,data.city_rate,data.county_rate,data.additional_rate})
          await Salestax.create({
            zip_code,
            total_rate,
            state_rate,
            city_rate,
            county_rate,
            additional_rate,
          });
        }
      } catch (err) {
        start += inc;
      }
    }

    console.log(start);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
