
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
               color : color,
               name:name,
               last:0,
               first:0,
               avarge:0,
               direction:0,
               difference:0,
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
        return lists[name].stat;

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
        let direction = 0;
        let highest = -32768;
        let lowest = 32767;
        let mass = 0;
        let first = NaN;
        let last = 0;
        let difference =0;
        let percante =0;
        let name = listI.toString();
        let color = lists[listI].color.toString();
        for (globalI = 0; lists[listI].list.length > globalI ; globalI++){
            let current = lists[listI].list[globalI];
            if(isNaN(current))
                continue;
            count++;
            if (isNaN(first))
                first = parseInt(current);
            last = parseInt(current);
            mass += current;
            if (highest < current)
                highest = current;
            if(lowest > current)
                lowest = current;
        }
        avarge = mass/count;
        if (highest+2 > max)
            max = highest + 2;
        if (lowest-2 < min)
            min = lowest - 2;
        if(first > last){
            direction = 1;
        }else if(last > first){
            direction = -1;
        }
        difference = first - last;
        percante = Math.abs(difference/first).toFixed(4);
        lists[listI].stat = {
            color,
            name,
            last,
            first,
            direction,
            difference,
            percante,
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

