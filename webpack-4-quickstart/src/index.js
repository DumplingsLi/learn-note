import style from './main.css'

class A{
  constructor(x){
    this.x = x
  }

  getX(){
    console.log(this.x)
  }
}

new A(1)
