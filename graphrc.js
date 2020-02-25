
const retardGraph = function (el){
    /*
     * @param array {list}
     * @param string {name}
     * @param string {color}
     * @public
     * @retrun boolean
     */
    this.add = function(list, name, color){
        if (
            (typeof list === "undefined") ||
            (typeof name === "undefined") ||
            (typeof color === "undefined") 
        )
            return false;
        lists[name] = {
            color : color,
            list : list,
            stat : {
               avarge:0,
               direction:0,
               lowest:0,
               highest:0,
               count:0,
               mass:0
            }
        };
        return true;
    }
    /*
     * @param string {name}
     * @public
     * @retrun boolean || object
     */
    this.getStat = function(name){
        if(typeof lists[name] === "undefined")
            return false;
        return list[name].stat;

    }
    /*
     * @param HTMLobject {el}
     * @public
     * @return boolean
     */
    this.input = function (el){
        if(
            (typeof el === "undefined")&&
            (el === canv)
            
        )
            return false;
        console.log(lists);
        canv = el;
        ctx = canv.getContext("2d");
        w = canv.width;
        h = canv.height;
        init();
        render();
        return true;
    }
    /*
     * @var object
     */
    let t = this;
    /*
     * @var object 
     */
    let canv,ctx;
    /*
     * @var integer
     */
    let h,w,min,max;
    let length=0,
        globalI=0,
        listI=0,
        lists={};
    /* 
     * @private 
     * @return void
     */
    let init = function(){ // init
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.lineWidth=1;
        ctx.strokeStyle="#aaa";
        ctx.moveTo(10,10);
        ctx.lineTo(10, h-10);
        ctx.lineTo(w-10, h-10);
        ctx.stroke();
    }
    /* 
     * @private 
     * @return void
     */
    let mesuring = function (){
        length = (w-24)/(lists[listI].list.length-1);
        let count = 0;
        let avarge = 0;
        let highest = -32768;
        let lowest = 32767;
        let mass = 0;
        for (globalI = 0; lists[listI].list.length > globalI ; globalI++){
            if(isNaN(lists[listI].list[globalI]))
                continue;
            count++;
            mass += lists[listI].list[globalI];
            if (highest < lists[listI].list[globalI])
                highest = lists[listI].list[globalI];
            if(lowest > lists[listI].list[globalI])
                lowest = lists[listI].list[globalI];
        }
        avarge = mass/count;
        if (highest+2 > max)
            max = highest + 2;
        if (lowest-2 < min)
            min = lowest - 2;
        lists[listI].stat = {
            highest,
            lowest,
            count,
            avarge,
            mass
        }

    }
    /* 
     * @private 
     * @return void
     */
    let render = async function(){
        max = -32768;
        min = 32767;
        ctx.clearRect(12, 12, w-24, h-24); 
        for(listI in lists)
            mesuring();
        for(listI in lists)
            line();
    }
    /* 
     * @private 
     * @return void
     */
    let line = function(){
        ctx.moveTo(12,10);
        ctx.beginPath();
        ctx.strokeStyle=lists[listI].color;
        for (globalI = 0 ; lists[listI].list.length > globalI; globalI++)
            to();
        ctx.stroke();
    }
    /*
     * @private
     * @return float
     */
    let to = function(){ // line section to
       ctx.lineTo((length*globalI)+12, positionMath());
    }
    /*
     * @private
     * @return float
     */
    let positionMath = function(){
        return ((max-(lists[listI].list[globalI]))*((h-40)/(max-min)))+20;
    }
    if(typeof el !== "undefined")
        t.input(el);
}

