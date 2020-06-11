import {YagiElementInterface, YagiInterface} from "./interfaces";

export class YagiCalculator {

  constructor() {
  }


  // noinspection JSMethodCanBeStatic
  public yagiCalculate(yagi: YagiInterface): void {
    let freq = yagi.frequency;
    let elements = yagi.elements;
    let parasiticDiameter = yagi.parasiticDiameter;
    let boomDiameter = yagi.boomDiameter;				//	in [mm]
    let parasiticDiameterD = yagi.parasiticDiameter;

    // Clear earlier elements
    yagi.yagiElements = [];

    let lambda = 300000 / freq;
    let distance = [];
    let q = 0.041446332341;

    distance[0] = 0.240; // Reflector - Dipole
    distance[1] = 0.075;	// Director #1 - Dipole
    distance[2] = 0.180;	// Director #2 - Director #1
    distance[3] = 0.215;	// Director #3 - Director #2
    distance[4] = 0.250;	// usw
    distance[5] = 0.280;
    distance[6] = 0.300;
    distance[7] = 0.315;
    distance[8] = 0.330;
    distance[9] = 0.345;
    distance[10] = 0.360;
    distance[11] = 0.375;
    distance[12] = 0.385;
    distance[13] = 0.390;
    distance[14] = 0.395;
    distance[15] = 0.400;
    distance[16] = 0.400;
    distance[17] = 0.400;
    distance[18] = 0.400;
    distance[19] = 0.400;
    distance[20] = 0.400;

    let max = [];
    let min = [];

    for (let j = 1; j <= 20; j++) {
      max[j] = -7E-6 * j * j * j + 0.0003 * j * j - 0.0073 * j + 0.433;
      min[j] = -3E-6 * j * j * j + 0.0002 * j * j - 0.0049 * j + 0.4595;
    }

    let lengthLambda = 0;

    for (let j = 0; j < (elements - 1); j++) {
      lengthLambda = lengthLambda + distance[j];
    }


    let boomLength = Math.round(lengthLambda * lambda) / 1000;

    boomLength = boomLength + (2 * parasiticDiameter / 1000);
    yagi.boomLength = Number(boomLength.toFixed(3));

    // GAIN
    let gain, length;
    length = lengthLambda - distance[0];  // MEASURED FROM DIPOLE
    gain = 3.39 * Math.log(lengthLambda) + 9.15;
    // -------------------------------------------------------------------------
    yagi.gain = gain.toFixed(2);

    let result = "";
    result = result + "-------------------------------------------------------------" + '\n';
    result = result + "Frequency     :  " + freq + "  MHz" + '\n';
    result = result + "Wavelength    :  " + Math.round(lambda) + "  mm" + '\n';
    result = result + "Rod Diameter  :  " + parasiticDiameterD + "  mm" + '\n';
    result = result + "Boom Diameter :  " + boomDiameter + "  mm" + '\n';
    result = result + "Boom Length   :  " + Math.round(1000 * boomLength) + "  mm" + '\n';

    let boom_dicke_lambda;
    let directorLambda = 0;


    boom_dicke_lambda = boomDiameter / lambda;
    if (boom_dicke_lambda <= 0.01) {
      boom_dicke_lambda = 0.01;
      boomDiameter = lambda * 0.01
    }

    if (boom_dicke_lambda >= 0.05) {
      boom_dicke_lambda = 0.05;
      boomDiameter = lambda * 0.05
    }


    let correlation = -416.86 * boom_dicke_lambda * boom_dicke_lambda * boom_dicke_lambda + 46.183 * boom_dicke_lambda * boom_dicke_lambda - 0.6834 * boom_dicke_lambda + 0.0059;


    directorLambda = parasiticDiameter / lambda;
    if (directorLambda <= 0.001) {
      directorLambda = 0.001;
      parasiticDiameter = lambda * 0.001
    }

    if (directorLambda >= 0.04) {
      directorLambda = 0.04;
      parasiticDiameter = lambda * 0.04
    }


    result = result + "d/lambda      :  " + (Math.round(1000 * directorLambda) / 1000).toFixed(3) + "    ( min.: 0.002 , max.: 0.01 )" + '\n';
    result = result + "D/lambda      :  " + (Math.round(1000 * boom_dicke_lambda) / 1000).toFixed(3) + "    ( min.: 0.01 , max.: 0.05 )" + '\n';
    result = result + "Elements      :  " + elements + '\n';
    result = result + "Gain          :  " + gain.toFixed(2) + " dBd (approx.)" + '\n';
    result = result + "-------------------------------------------------------------" + '\n';

    let reflectorLength = 0.482;

    reflectorLength = (yagi.boomIsolated ? reflectorLength : reflectorLength + correlation);

    const reflectorLen = Math.round(reflectorLength * lambda);
    result = result + ("Reflector Length   : " + reflectorLen + " mm" + '\n');
    result = result + ("Reflector Position :  0 mm" + '\n');
    result = result + "-------------------------------------------------------------" + '\n';
    yagi.yagiElements.push(<YagiElementInterface>{
      name: 'Reflector',
      distance: null,
      length: reflectorLen,
      position: 0
    });

    const dipolePos = Math.round(distance[0] * lambda);
    result = result + ("Dipole Position    : " + dipolePos + " mm" + '\n');
    result = result + "-------------------------------------------------------------" + '\n';
    yagi.yagiElements.push(<YagiElementInterface>{
      name: 'Dipole',
      distance: null,
      length: reflectorLen / 2,
      position: dipolePos
    });

    let cum_length = distance[0] * lambda;
    let direX;

    for (let j = 1; j < (elements - 1); j++) {
      cum_length = cum_length + distance[j] * lambda;

      direX = (yagi.boomIsolated ? lambda * (min[j] + (max[j] - min[j]) * directorLambda) : lambda * (correlation + min[j] + (max[j] - min[j]) * directorLambda));

      let yagiElement = <YagiElementInterface>{name: 'Director'};

      const directorPos = Math.round(cum_length);
      const directorLength = Math.round(direX);
      result = result + "Director #" + j + " Position : " + directorPos + " mm ,  Length : " + directorLength + " mm" + '\n';
      yagiElement.position = directorPos;
      yagiElement.length = directorLength;
      if (j == 1) {
        const dis = Math.round(distance[j] * lambda);
        yagiElement.distance = dis;
        result = result + "Distance Dipole - Dir. #1 : " + dis + " mm " + '\n';
      }

      if (j > 1) {
        const dis = Math.round(distance[j] * lambda);
        yagiElement.distance = dis;
        result = result + "Distance Dir. #" + (j - 1) + " - Dir. #" + j + " : " + dis + " mm " + '\n';
      }

      yagiElement.number = j;

      result = result + "-------------------------------------------------------------" + '\n';
      yagi.yagiElements.push(yagiElement);
    }


    if (yagi.boomIsolated) {
      result = result + "Directors / Parasitics are isolated." + '\n' + "Please choose an isolator thicker than : " + Math.round(boomDiameter / 2) + " mm" + '\n';
    } else {
      result = result + "Directors / Parasitics are not isolated." + '\n' + "The length has been increased to compensate." + '\n';
    }

    console.info(result);
    console.info('Yagi elements length: ' + yagi.yagiElements.length)
  }


}
