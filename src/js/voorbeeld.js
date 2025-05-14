class Tank {
    ammo
    constructor(){
      this.ammo = 5
    }
    shoot(){
      this.ammo--
      if (this.ammo < 0) {
        console.log(` out of ammo`)
      } else {
        console.log(`boom! i have ${this.ammo} bullets left`)
      }
    }
    reload(){
      this.ammo = 5
    }
  }
  
  let myTank = new Tank()
  myTank.shoot()
  myTank.shoot()
  myTank.shoot()
  myTank.shoot()
  myTank.shoot()
  myTank.shoot()


  
  let anotherTank = new tank()
  