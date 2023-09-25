const Sequelize = require('sequelize');
const xlsxFile = require('read-excel-file/node');


// TABLE USERS (For Creating in MYSQL)

/*
 CREATE TABLE `user` (
 `id` int NOT NULL,
 `name` varchar(255) NOT NULL,
 `address` varchar(255) NOT NULL,
 `age` int DEFAULT NULL,
 `dob` date DEFAULT NULL
 );
*/
const sequelize = new Sequelize(keys.dbName, keys.dbUser, keys.dbPassword, {
    host: keys.dbHost,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    logging: true,
    pool: {
      max: 100,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  });

// MODEL FOR USER


const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);



// CODE

  try {
    const filePath = req.file.path;

    if (!filePath) {

      throw new Error('File Not Found');
    }
    else {
      var users;

      await xlsxFile(filePath)
        .then((rows) => {
          const columnNames = rows.shift();
          console.log("column...", columnNames); // Separate first row with column names
          const objs = rows.map((row) => { // Map the rest of the rows into objects
            const object = {}; // Create object literal for current row
            row.forEach((cell, i) => {
              object[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
            });
            console.log("obj...", obj);
            return object;

            // console.log(objs); // Display the array of objects on the console
          });
          console.log("objsLength.....", objs.length);
          if (objs.length == 0) {
            throw new Error('Excel Sheet  is empty');

          }
          for (var index = 0; index < objs.length; index++) {
            var obj = objs[index];
            console.log('obj.....................', obj);
            let name = obj.name;
            let address = obj.address;
            let age = obj.age;
            let dob = obj.dob;

            users = {
              name: name,
              address: address,
              age: age,
              dob: dob
            }


            
              if (users.name == null || users.address == null || users.age == null || users.dob == null) {
          
               throw new Error('Value is missing');

              }

              var isANumber = isNaN(users.age) === false;
              if (isANumber == false) {
                throw new Error('Age Should be a number');
              }

              var strLength = users.address.length;
              if (strLength < 25) {
            
                throw new Error('Address should have atleast 25 characters');
              }

              if (!(users.dob instanceof Date)) {
                throw new Error('DOB must be in date format');
              }
              
              
               User.create({
                name :users.name,
                address : users.address,
                age : users.age,
                dob : users.dob
            });
            


          }
        });
  
    }
  

  } catch (error) {
    error.statusCode = 500;
  
  }



