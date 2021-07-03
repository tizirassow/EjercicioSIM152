class RungeKutta {
    constructor(h, To, Y1_inicial, Y2_inicial) {
        this.h = parseFloat(h);
        this.T = parseFloat(To);
        this.Y1 = parseFloat(Y1_inicial);
        this.Y2 = parseFloat(Y2_inicial);
        this.k1 = 0;
        this.k2 = 0;
        this.k3 = 0;
        this.k4 = 0;
        this.l1 = 0;
        this.l2 = 0;
        this.l3 = 0;
        this.l4 = 0;
        this.Y1prox;
        this.Y2prox;
    
    }
    //Calculo Runge Kutta
    calcularProxY1() {
        this.Y1prox = (this.Y1 + ((this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4)/6)).toFixed(4);
        this.Y1prox = parseFloat(this.Y1prox);
    }
    calcularProxY2() {
        this.Y2prox = (this.Y2 + ((this.l1 + 2 * this.l2 + 2 * this.l3 + this.l4)/6)).toFixed(4);
        this.Y2prox = parseFloat(this.Y2prox);
    }

    
    //Calculo las K
    calcularKiLi() {
        //K1 = h * Y2
        this.k1 = this.calculark1(this.h, this.Y2);

        // l1= h*(3*Y2 - 2*Y1)
        this.l1 = this.calcularl1(this.h, this.Y2, this.Y1);

        //k2 = h * (Y2+0.5*l1) {coef. l asociados a las variables x2}
        this.k2 = this.calculark2(this.h,this.getY2(),this.l1);

        //L2= h*(3*(Y2+0,5*L1)-2*(X1+0,5*K1))
        this.l2 = this.calcularl2(this.h, this.getY2(),this.getY1(),this.l1,this.k1);

        //k3 = h * (x2 + 0.5*l2)
        this.k3 = this.calculark3(this.h, this.getY2(),this.l2);

        //L3= h*(3*(Y2+0,5*L2)-2*(Y1+0,5*K2))
        this.l3 = this.calcularl3(this.h,this.getY2,this.l2,this.getY1(),this.k2);

        //k4 = h*(Y2+l3)
        this.k4 = this.calculark4(this.h, this.getY2(), this.l3);

        //L4= h*(3*(Y2+L3)-2*(Y1+K3))
        this.l4 = this.calcularl4(this.h,this.getY2(),this.l3,this.getY1(),this.k3);

        this.k1 = parseFloat(this.k1);
        this.k2 = parseFloat(this.k2);
        this.k3 = parseFloat(this.k3);
        this.k4 = parseFloat(this.k4);
        this.l1 = parseFloat(this.l1);
        this.l2 = parseFloat(this.l2);
        this.l3 = parseFloat(this.l3);
        this.l4 = parseFloat(this.l4);

    }

    calculark1(h,Y2){
        return h*Y2;
    }

    calcularl1(h,Y2, Y1){
        return h*(3*Y2 - 2*Y1);
    }

    calculark2(h,Y2,l1){
        return h*(Y2+0,5*l1);
    }

    calcularl2(h, Y2,Y1,l1,k1){
        return h*(3*(Y2+0,5*l1)-2*(Y1+0,5*k1));
    }

    calculark3(h,Y2,l2){
        return h * (Y2 + 0.5*l2);
    }

    calcularl3(h,Y2,l2,Y1,k2){
        return h*(3*(Y2+0,5*l2)-2*(Y1+0,5*k2));
    }

    calculark4(h,Y2,l3){
        return h*(Y2+l3);
    }

    calcularl4(h,Y2,l3,Y1,k3){
        return  h*(3*(Y2+l3)-2*(Y1+k3));
    }


    

    setT(T) {
        this.T = T;
    }
    setY1(Y1) {
        this.Y1 = Y1;
    }
    setY2(Y2) {
        this.Y2 = Y2;
    }
    getK1() {
        return this.k1;
    }
    getK2() {
        return this.k2;
    }
    getK3() {
        return this.k3;
    }
    getK4() {
        return this.k4;
    }
    getL1() {
        return this.l1;
    }
    getL2() {
        return this.l2;
    }
    getL3() {
        return this.l3;
    }
    getL4() {
        return this.l4;
    }
    getH() {
        return this.h;
    }
    getT() {
        return this.T;
    }
    getY1() {
        return this.Y1;
    }
    getProxY1() {
        return this.Y1prox;
    }
    getY2() {
        return this.Y2;
    }
    getProxY2() {
        return this.Y2prox;
    }
}








