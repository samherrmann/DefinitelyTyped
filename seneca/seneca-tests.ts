/// <reference path="seneca.d.ts" />

import senecaModule = require('seneca');
var seneca = senecaModule();

/////////////////////////////////////////////////////
// act 
/////////////////////////////////////////////////////

seneca.act( { generate:'id' },
	    (err, result) => {
	      seneca.log.error(JSON.stringify(result))
    });
	
/////////////////////////////////////////////////////
// add
/////////////////////////////////////////////////////	
	
seneca.add({ generate: 'id' }, (message, done) => {
		done(null, { id:''+ Math.random() })
	});
	
/////////////////////////////////////////////////////
// client
/////////////////////////////////////////////////////	

seneca.client({ 
	host:'192.168.1.2', 
	port:80 
});
	
/////////////////////////////////////////////////////
// close
/////////////////////////////////////////////////////		

seneca.close((err: any) => {
	if(err) {
		seneca.log.error('Could not close database.');
	}
});

/////////////////////////////////////////////////////
// export
/////////////////////////////////////////////////////

interface SenecaWeb {
	// ... //
}

var senecaWeb: SenecaWeb = seneca.export<SenecaWeb>('web');

/////////////////////////////////////////////////////
// listen
/////////////////////////////////////////////////////

seneca.listen(3000);
	
/////////////////////////////////////////////////////
// log
/////////////////////////////////////////////////////

seneca.log.debug('a', 'b', 'c');
seneca.log.info('a', 'b', 'c');
seneca.log.warn('a', 'b', 'c');
seneca.log.error('a', 'b', 'c');
seneca.log.fatal('a', 'b', 'c');
	
/////////////////////////////////////////////////////
// make
/////////////////////////////////////////////////////	

interface Product {
	name: string;
	price: number;
	code: string;
}

var products: seneca.IEntity<Product> = seneca.make<Product>('product', {
															    name:'apple',
															    price:11,
															    code:'app01'
															});

products.remove$(1234, (err) => {
	if(err) {
		console.log('Could not delete entity');
	}
});

/////////////////////////////////////////////////////
// pin
/////////////////////////////////////////////////////

interface Users {
	register: (user: User) => void;
}

interface User {
	nick: string;
	name: string;
	email: string;
	password: string;
	active: boolean;
	admin?: boolean;
}

var u = seneca.pin<Users>({role:'user',cmd:'*'});
u.register({nick:'u1',name:'nu1',email:'u1@example.com',password:'u1',active:true})
u.register({nick:'u2',name:'nu2',email:'u2@example.com',password:'u2',active:true})
u.register({nick:'a1',name:'na1',email:'a1@example.com',password:'a1',active:true, admin:true});

/////////////////////////////////////////////////////
// ready
/////////////////////////////////////////////////////

seneca.ready((err) => {
  		if( err ) return console.log(err);
	});

/////////////////////////////////////////////////////
// use
/////////////////////////////////////////////////////

seneca.use('mem-store', {web: {dump: true}});