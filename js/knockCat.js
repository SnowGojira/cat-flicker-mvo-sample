let initialCats = [
    {   name: "Mimi",
        src:"image/mimi.jpg",
        clicker: 0
    },
    {   name:"Meme",
        src:"image/meme.jpg",
        clicker: 0
    },
    {   name:"Lulu",
        src:"image/lulu.jpg",
        clicker: 0
    },
    {   name:"Jojo",
        src:"image/jojo.jpeg",
        clicker: 0
    },
    {
        name: "Dada",
        src: "image/dada.jpeg",
        clicker: 0
    }
];

let cat = function(data){
    //======the model part=========//
    this.name = ko.observable(data.name);
    this.src = ko.observable(data.src);
    this.clicker = ko.observable(data.clicker);
    this.nickName = ko.observableArray(data.nicknames);

    this.age = ko.computed(function(){
        let lifeStage;
        if(this.clicker() < 10){
            lifeStage = 'baby';
        }else if(this.clicker()>=10 && this.clicker()<30){
            lifeStage = 'child';
        }else if(this.clicker()>=30 && this.clicker()<60){
            lifeStage = 'teen';
        }else if(this.clicker()>=60 && this.clicker()<110){
            lifeStage = 'adult';
        }else {
            lifeStage = 'angel';
        }

        return lifeStage;
    },this);
};

let ViewModel = function() {
    let self = this;
    this.catList = ko.observableArray([]);
    initialCats.forEach((item)=>{
        self.catList.push(new cat(item));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.addClicker = function(){
        //with is really tricky :with = currentCat
        self.currentCat().clicker(self.currentCat().clicker()+1);
    };

    self.selectCat = function (cat) {
        //param cat: function will default pass the element you clicked
        self.currentCat(cat);
    }
}

ko.applyBindings(new ViewModel());