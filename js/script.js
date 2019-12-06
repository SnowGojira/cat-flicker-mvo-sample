
$(function(){
    let model = {
        currentCat:null,
        adminVisibility: false,
        data:[
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
        ]
    };

    let ImageView ={
        init:function(){
            this.$catImage = $(".cat-image");
            this.$clickNumer=$(".click-number");
            this.$catName = $(".cat-name");


            this.$catImage.click(function(e){
                 octopus.addClicker();
            });

            this.render();
        },
        render:function() {
            let cat = octopus.getCurrentCat();
            this.$catImage.attr('src', cat.src);
            this.$clickNumer.text(cat.clicker);
            this.$catName.text(cat.name);
        }
    };
    let AdminView = {
        init:function(){
            $inputName = $("#input-name");
            $inputClicker = $("#input-clicker");
            $buttonSave = $("#save");
            $buttonCancel = $("#cancel");
            $buttonAdmin = $("#admin");

            this.render();
        },
        render:function(){
            let cat = octopus.getCurrentCat();

            //admin view functions
            console.log("cats",octopus.getAllCats());

            $buttonAdmin.click(function (e) {
                octopus.toggleAdmin();
            });

            $buttonCancel.click(function(e){
                octopus.setAdminLabel(true);
                octopus.toggleAdmin();
            });

            //todo always have been more extra times
            $buttonSave.click(function (e) {

                let inputName = $inputName.val(),
                    inputClicker = $inputClicker.val();

                cat.name = inputName;
                cat.clicker = inputClicker;

                octopus.setCurrentCat(cat);
                console.log("cat_item",octopus.getAllCats());
                
                octopus.setAdminLabel(true);
                octopus.toggleAdmin();
            });
        },
        toggle:function (label) {
            $adminContainer = $(".admin-container");
            if(label){
                $adminContainer.addClass('none');
            }else{
                $adminContainer.removeClass('none');
            }
        }
    };

    let ListView ={
        init:function(){
            this.$listContainer = $(".list-container");

            this.render();
        },
        render:function() {
            let cats = octopus.getAllCats();
            this.$listContainer.empty();

            for (let i = 0; i < cats.length; i++) {
                let elem = document.createElement('li');
                elem.textContent = cats[i].name;

                elem.addEventListener("click",(function (cat) {
                    return function () {
                        octopus.setCurrentCat(cat);
                        ImageView.render();
                        AdminView.render();
                    }

                })(cats[i]));

                this.$listContainer.append(elem);

            }

        }
    };


    let octopus = {
        getAllCats:function(){
            return model.data;
        },

        adminUpdate: function(cat){
            this.setCurrentCat(cat);
            ImageView.render();
            ListView.render();
        },

        addClicker:function(){
             model.currentCat.clicker++;
             ImageView.render();
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat:function(cat){
            model.currentCat = cat;
        },

        toggleAdmin:function(){
            if(!model.adminVisibility){
                AdminView.toggle(model.adminVisibility);
                return model.adminVisibility = true;
            }else{
                AdminView.toggle(model.adminVisibility);
                return model.adminVisibility = false;
            }
        },
        setAdminLabel:function(label){
            model.adminVisibility = label;
        },
        init:function () {
            model.currentCat=model.data[0];
            ListView.init();
            ImageView.init();
            AdminView.init();

        }
    };

    octopus.init();
});