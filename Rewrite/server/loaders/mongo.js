import mongodb from 'mongoose'; 

export default (url)=>{

	mongodb.connect(url, {useNewUrlParser:true, useFindAndModify: false, useUnifiedTopology:true}, (err, conn)=>{

		if(err) throw new Error(err);

		return conn.connection.db;

	});
};