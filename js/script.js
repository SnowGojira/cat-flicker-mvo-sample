
$(function(){
    let model = {
        currentCat:null,
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
        render(){
            let cat = octopus.getCurrentCat();
            this.$catImage.attr('src',cat.src);
            this.$clickNumer.text(cat.clicker);
            this.$catName.text(cat.name);
        }

    };

    let ListView ={
        init:function(){
            this.$listContainer = $(".list-container");

            this.render();
        },
        render:function() {
            let cats = octopus.getAllCats();

            for (let i = 0; i < cats.length; i++) {
                let elem = document.createElement('li');
                elem.textContent = cats[i].name;

                if(i===0) elem.classList.add("selected");

                this.$listContainer.append(elem);

                elem.addEventListener("click",(function (cat) {
                    return function () {
                        $('li').removeClass("selected");
                        $(this).addClass("selected");
                        octopus.setCurrentCat(cat);
                        ImageView.render();
                    }

                })(cats[i]));

            }

        }
    };

    let adminView = {
        init:function(){
            $inputName = $("#input-name");
            $inputClicker = $("#input-clicker");
            $buttonSave = $("#save");
            $buttonCancel = $("#cancel");

            let cat = octopus.getCurrentCat();
            $inputName.val(cat.name);
            $inputClicker.val(cat.clicker);

            $buttonCancel.click(function(e){
                $inputName.val(cat.name);
                $inputClicker.val(cat.clicker);
            })

            $buttonSave.click(function (e) {

                cat.name = $inputName.val();
                cat.clicker = $inputClicker.val();

                octopus.adminUpdate(cat);
                console.log(octopus.getAllCats());
                //todo submit and vanish the view
            });

        }
    }

    let octopus = {
        getAllCats:function(){
            return model.data;
        },
        adminUpdate: function(cat){
            this.setCurrentCat(cat);
            ImageView.render();
        },
        addClicker:function(){
             ++model.currentCat.clicker;
             ImageView.render();
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat:function(cat){
            model.currentCat = cat;
        },
        init:function () {
            this.setCurrentCat(model.data[0]);
            ListView.init();
            ImageView.init();
            adminView.init();
        }
    };

    octopus.init();
});