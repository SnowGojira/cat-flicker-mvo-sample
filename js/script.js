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
            this.$buttonSave = $("#save");
            this.$buttonCancel = $("#cancel");
            this.$buttonAdmin = $("#admin");
            this.$adminContainer = $(".admin-container");

            this.render();
        },

        render:function(){
            let cat;
            let $inputName = $("#input-name");
            let $inputClicker = $("#input-clicker");

            this.$buttonAdmin.click(function (e) {
                cat = octopus.getCurrentCat();
                octopus.toggleAdmin();

                $inputName.val(cat.name);
                $inputClicker.val(cat.clicker);
            });

            this.$buttonCancel.click(function(e){
                octopus.setAdminLabel(true);
                octopus.toggleAdmin();
            });

            this.$buttonSave.click(function (e) {

                cat.name = $inputName.val();
                cat.clicker =$inputClicker.val();

                octopus.setCurrentCat(cat);
                ImageView.render();
                ListView.render();

                octopus.setAdminLabel(true);
                octopus.toggleAdmin();
            });
        },
        toggle:function (label) {

            if(label){
                this.$adminContainer.addClass('none');
            }else{
                this.$adminContainer.removeClass('none');
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
                        //toggle admin
                        octopus.setAdminLabel(true);
                        octopus.toggleAdmin();

                        ImageView.render();
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