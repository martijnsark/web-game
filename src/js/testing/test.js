

class Animal {
    constructor() {

    }
}

class Fish extends Animal {
    constructor() {
        super()
    }
}


class Aquarium {
    constructor() {
        let a = new Fish()
        let b = new Fish()
        let c = new Fish()
        this.fishes = [a, b, c]
    }
}

class Store {
  constructor() {
        let d = new Aquarium()
        let amount1 = d.fishes.length
        
        let e = new Aquarium()
        let amount2 = e.fishes.length
        
        let f = new Aquarium()
        let amount3 = f.fishes.length
        
        let fishesinshop = ammount1 + ammount2 + ammount3
        console.log(`this shop has ${this.fishcounter} `)
    }
}

class City {
   constructor() {
        let fishCounter = 0
     
        let g = new Store()
        let h = new Store()
        let i = new Store()
        this.fishcounter = g.fishcounter + h.fishcounter + i.fishcounter
        console.log(`there are ${this.fishcounter}`)
    }
}

let end = new City()


