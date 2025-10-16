 
      let autoplayidx = 0
      let autoplayitems = []
      let previousItem = {}


      let cascadeIdx = 0
      let cascadeItems = []

      let intervalCascade;
      let intervalFader = null
      let stopCascading = true;

      function getRollerItems(){
        return document.querySelectorAll(".auto-play")
      }

      function hidemall(){
          autoplayitems.forEach(function(item){
          item.style.display = "none"
          item.style.opacity = 0
        })
      }

      function autoplaynext(){
        if(stopCascading){
          clearInterval(intervalCascade)
        }

        if(previousItem !== undefined && previousItem.classList !== undefined){
          previousItem.classList.remove("fade-in-out")
          previousItem.style.display = "none"
          if(previousItem.classList.contains("cascade")){ 
            if(cascadeItems.length !== 0){
              cascadeItems.forEach(function(i){
                i.classList.remove("cascadeanim")
                i.style.display = "none"
                i.style.opacity = "0"
              })
            }
          }
          
        }

        if(autoplayidx === autoplayitems.length) autoplayidx = 0;
        const item =  autoplayitems[autoplayidx]
        
        item.style.display = "block"

        let availableHeight = document.querySelector(".business-card").clientHeight;
        //let itemHeight = item.clientHeight;
        //ypos =  (availableHeight - itemHeight) * 0.5
     //   item.style.marginTop = ypos + "px"

        let ypos =  availableHeight * 0.2
        item.style.marginTop = ypos + "px"
        item.classList.add("fade-in-out")

        if(item.classList.contains("cascade")){ 
          cascadeIdx = 0
          cascadeItems = item.querySelectorAll("li")
          cascadeItems.forEach(function(i){
            i.style.display = "inline-block"
          }) 
          stopCascading = false
          cascador()
        }
        previousItem = item
        autoplayidx++
      }

      function cascador(){
        intervalCascade = setInterval(function(){
            cascadeItem()
            cascadeIdx++
        },100)
      }

      function cascadeItem(){
        if(cascadeIdx < cascadeItems.length){
          const cascadeitem = cascadeItems[cascadeIdx]
          if(cascadeitem !== undefined && cascadeitem.style !== undefined){

            cascadeitem.style.display = "inline-block"
            cascadeitem.style.opacity = "1"
            cascadeitem.classList.add("cascadeanim")
          }
        }else{
          stopCascading = true;
        }
      }

      function initRoller(){
        autoplayitems = getRollerItems()
        hidemall()
        intervalFader = setInterval(function(){
          autoplaynext()
        },4000
      )
        autoplaynext()
      }

      function initPops(){
        const pops = document.querySelectorAll(".game-holder")
        pops.forEach(function(pop){
          pop.addEventListener('click', function(){
            alert("pop")
            
            const myModal = new bootstrap.Modal('#modal', {
              keyboard: false
            })

          })
        })
     
      }

      window.addEventListener('load', function () { 
        initRoller();
        initPops();
      });