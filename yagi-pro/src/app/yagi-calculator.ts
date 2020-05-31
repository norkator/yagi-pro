export class YagiCalculator {

  public frequency = 800;  // MHz
  public elements = 22;   //
  public gain = 0;    // dBd
  public boomLength = 0;    // mm
  public parasitic = 0;    // mm
  public boom = 0;    // mm


  public increaseElements(): void {
    this.elements++;
    this.elements = (this.elements < 25 ? this.elements++ : this.elements);
    this.dimRest();
  }

  public decreaseElements(): void {
    this.elements--;
    this.elements = (this.elements > 3 ? this.elements-- : this.elements);
    this.dimRest();
  }


  private dimRest(): void {
    let lambda;
    lambda = 300000 / this.frequency;
    const lengthLambda = (this.elements - 1) / 5;
    let g1, g2, g3;

    // Gain by David VK3AUU
    g1 = 3.39 * Math.log(lengthLambda) + 9.15;

    // Gain by Ring WA2PHW
    g2 = 10 * Math.log(5.4075 * lengthLambda + 4.25) / Math.log(10);

    // Gain by Rainer Bertelsmaier DBJ9BV
    g3 = 7.773 * Math.log(lengthLambda) / Math.log(10) + 9.28;

    this.boomLength = Math.round(0.2 * (this.elements - 1) * lambda);
    this.gain = Math.round(33 + 33.33333333 * (g1 + g2 + g3)) / 100;
  }


  public yagiCalculate(): void {
    let lambda;
    let lengthLambda;
    let boomThicknessLambda = 0;
    let directorLambda = 0;

    let distance = [];
    let dimension = [];

    lambda = 300000 / this.frequency;

    for (let j = 0; j <= 21; j = j + 1) {
      distance[j] = Math.round(0.2 * lambda * j);
    }
    if (this.elements == 3) {
      dimension
        [0] = 3;
      dimension
        [1] = 0.482;
      dimension
        [2] = 0.4752;
      dimension
        [3] = 0.442;
    }
    if (this.elements === 5) {
      dimension[0] = 5;
      dimension[1] = 0.482;
      dimension[2] = 0.4752;
      dimension[3] = 0.428;
      dimension[4] = 0.424;
      dimension[5] = 0.428;
    }

    if (this.elements === 7) {
      dimension[0] = 7;
      dimension[1] = 0.482;
      dimension[2] = 0.4752;
      dimension[3] = 0.428;
      dimension[4] = 0.420;
      dimension[5] = 0.420;
      dimension[6] = 0.428;
    }

    if (this.elements === 7) {
      dimension[0] = 7;
      dimension[1] = 0.482;
      dimension[2] = 0.4752;
      dimension[3] = 0.428;
      dimension[4] = 0.420;
      dimension[5] = 0.420;
      dimension[6] = 0.428;
    }


    boomThicknessLambda = this.boom / lambda;
    if (boomThicknessLambda <= 0.002) {
      boomThicknessLambda = 0.002;
      this.boom = lambda * 0.002
    }

    if (boomThicknessLambda >= 0.04) {
      boomThicknessLambda = 0.04;
      this.boom = lambda * 0.04
    }

    directorLambda = this.parasitic / lambda;
    if (directorLambda <= 0.001) {
      directorLambda = 0.001;
      this.parasitic = lambda * 0.001
    }
    if (directorLambda >= 0.04) {
      directorLambda = 0.04;
      this.parasitic = lambda * 0.04
    }

    console.info("**** YAGI UDA ANTENNA ****" + '\n');
    console.info("Design by www.changpuak.ch" + '\n');
    console.info("---------------------------------------------------" + '\n');
    console.info("Frequency  :  " + this.frequency + "  MHz" + '\n');
    console.info("Wavelength :  " + Math.round(1000 * lambda) / 1000 + "  mm" + '\n');
    console.info("d/lambda   :  " + Math.round(1000 * directorLambda) / 1000 + "    ( min.: 0.001 , max.: 0.04 )" + '\n');
    console.info("D/lambda   :  " + Math.round(1000 * boomThicknessLambda) / 1000 + "    ( min.: 0.002 , max.: 0.04 )" + '\n');

    let dl;
    dl = directorLambda;

    lengthLambda = (this.elements - 1) * 0.2;

    console.info("Boomlength :  " + Math.round((this.elements - 1) * 0.2 * lambda) + "  mm" + '\n');


    console.info("Elements   :  " + this.elements + '\n');
    console.info("Gain       :  " + this.gain + "  dB    (approx.)" + '\n');
    console.info("---------------------------------------------------" + '\n');

    distance[0] = 0;
    dimension[0] = lambda * (0.4593 - 0.005 * Math.log(dl));   // REFLECTOR
    console.info("Reflector Length [mm] : " + Math.round(dimension[0]) + '\n');
    console.info("Reflector Position [mm] : " + Math.round(distance[0]) + '\n');

    distance[1] = 0.2 * lambda;
    dimension[1] = 0.482 * lambda;   // DIPOLE
    console.info("---------------------------------" + '\n');
    console.info("Dipole Length [mm] : " + Math.round(dimension[1]) + '\n');
    console.info("Dipole Position [mm] : " + Math.round(distance[1]) + '\n');

    let j = 1;
    this.elements = this.elements - 2;

    while (this.elements > 0) {
      j++;
      distance[j] = 0.2 * j * lambda;
      dimension[j] = lambda * (-44674 * dl * dl * dl * dl + 2008.3 * dl * dl * dl + 23.178 * dl * dl - 3.1463 * dl + 0.4675);
      dimension[j] = dimension[j] + lambda * (0.5 * boomThicknessLambda + 0.002);
      console.info("---------------------------------" + '\n');
      console.info("Director Length [mm] : " + Math.round(dimension[j]) + '\n');
      console.info("Director Position [mm] : " + Math.round(distance[j]) + '\n');

      this.elements = this.elements - 1;

    }


    console.info("---------------------------------" + '\n');
    console.info("Calculations based on NBS TECHNICAL NOTE 688" + '\n');
    console.info("Length might be slightly too long." + '\n');


    console.info("Manufacturing Tolerances : < " + Math.round(0.002 * lambda) + "  mm " + '\n' + '\n' + '\n'

    );

    this.boomLength = Math.round(1000 * this.boomLength) / 1000;
    this.parasitic = Math.round(100 * this.parasitic) / 100;
    this.boom = Math.round(100 * this.boom) / 100;
  }


}
