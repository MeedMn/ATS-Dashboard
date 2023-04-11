export function makeCode(licence) {
    let result = '';
    let counter = 0;
    while (counter < licence.length) {
      result += licence.charAt(Math.floor(Math.random() * licence.length));
      counter += 1;
    }
    return "ATS-"+result;
}