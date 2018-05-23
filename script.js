var M = {}, V = {}, C = {};
M = {
    data: {
    	formdata: {},
    	resultdata: {},
    	required_fields: ["sum","accidents","days","BM0","name"],
    	settings: {"N":772056,"X":1233,"stdev":120,"Ca":1},
    	matrix: {"17" : {"1":12,"2":9,"3":3,"4":1},"16" : {"1":11,"2":8,"3":3,"4":1},"15" : {"1":11,"2":8,"3":3,"4":1},"14" : {"1":10,"2":7,"3":3,"4":1},"13" : {"1":9,"2":7,"3":3,"4":1},"12" : {"1":8,"2":6,"3":2,"4":1},"11" : {"1":8,"2":6,"3":2,"4":1},"10" : {"1":7,"2":5,"3":2,"4":1},"9" :  {"1":6,"2":5,"3":2,"4":1},"8" :  {"1":6,"2":4,"3":2,"4":1},"7" :  {"1":5,"2":4,"3":1,"4":1},"6" :  {"1":4,"2":3,"3":1,"4":1},"5" :  {"1":4,"2":3,"3":1,"4":1},"4" :  {"1":3,"2":2,"3":1,"4":1},"3" :  {"1":2,"2":2,"3":1,"4":1},"2" :  {"1":1,"2":1,"3":1,"4":1},"1" :  {"1":1,"2":1,"3":1,"4":1}},
        msg1: 'visiem laukiem ir jābūt aizpildītiem!',
        msg2: 'Ok!',
        state: 0
    }, 
    setData : function(d){
        this.data.userName = d.userName;
        this.data.userNumber = d.userNumber;
    },
    getData : function(){
        return data;
    }
}

V = {
    form : document.getElementById('form'),
    resultblock : document.getElementById('result'),
   	statistikablock : document.getElementById('statistika'),
    update: function(M){
    	if (M.data.state == 1) {
    		V.resultblock.style.display = 'block';
    		let data = M.data.formdata;
    		let result = M.data.resultdata;
    		this.resultblock.querySelector('#result1').innerHTML = data.name;
    		this.resultblock.querySelector('#result2').innerHTML = result.bm1;
    		this.resultblock.querySelector('#result3').innerHTML = result.bma;
    	}

    	this.statistikablock.querySelector('#stat1').innerHTML = M.data.settings.N;
    	this.statistikablock.querySelector('#stat2').innerHTML = M.data.settings.X;
    	this.statistikablock.querySelector('#stat3').innerHTML = M.data.settings.stdev;
    	this.statistikablock.querySelector('#stat4').innerHTML = M.data.settings.Ca;
    }
}

//{"sum":"b","accidents":"b","days":"a","BM0":"a","name":"a"}

C = {
    model: M,
    view: V,
    handler: function(){
        this.view.update(this.model);
    },
    validate: function(){
    	let form = document.getElementById('form');
    	let length = form.length;
    	let data = {};
    	for (var i = form.length - 1; i >= 0; i--) {
    		let name = ""+form[i].name;
    		let value = ""+form[i].value;
    		if (value.length > 0) {
    			data[name] = value;
    		}
    	}
    	for (let field of M.data.required_fields) {
    		if(data[field] === undefined){
    			alert(M.data.msg1);
    			return false;
    		}
    	}
		M.data.formdata = data;
		M.data.resultdata = this.calculate(data,M.data.settings);
		M.data.state = 1;
		return this.view.update(this.model);
    },
    randomize: function(){
    	this.model.data.settings.N = Math.floor(Math.random()*(39000-33000+1)+33000);
    	this.model.data.settings.X = Math.floor(Math.random()*(2100-1100+1)+1100);
    	this.model.data.settings.stdev = Math.floor(Math.random()*(340-166+1)+166);
    	this.view.update(this.model);
    },
    calculate: function(data,settings){
    	let matrix = this.model.data.matrix;
    	let accidents = 1 * data.accidents;
    	let avg = data.sum/accidents;
    	console.log(data);
    	let bm1,bma;

    	if (accidents == 0) {
    		bm1 = 1 * data.BM0 + 1;
    		if (bm1 > 17) {
    			bm1 = 17;
    		}
    	}

    	if (accidents >= 4) {
    		bm1 = 1;
    	}

    	if (accidents < 4 && accidents != 0) {
    		bm1 = matrix[data.BM0][data.accidents];
    	}
    	console.log(avg);

    	//avg    	settings.stdev;

    	if (avg < settings.X - settings.stdev) {
    		bma = "L";
    	}else if(avg > settings.X + settings.stdev) {
    		bma = "S";
    	} else if (avg >= (settings.X - settings.stdev) || avg <= (settings.X + settings.stdev) ) {
    		bma = "N";
    	}
    	return {bm1:bm1,bma:bma};
    }
}

// document.querySelector(".submitBtn").addEventListener("click", function(){
//     C.handler.call(C);
// }); 

document.getElementById('button1').addEventListener("click", function(){
	C.validate();
}); 

document.getElementById('randomize').addEventListener("click", function(){
	C.randomize();
}); 



// Controller (C) listens on some kind of interaction/event stream. In this case it's the page's loading event.

// Model (M) is an abstraction of a data source.

// View (V) knows how to render data from the Model.

