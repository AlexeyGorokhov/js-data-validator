import stampit from 'stampit';

// interface RequirableStamp extends stampit.Stamp<any> {
//   isRequired: boolean;
//   isRequiredMsg: string;
//   required: (this: RequirableStamp, msg?: string) => stampit.Stamp<any>;
// }

interface Requirable {
  isRequired: boolean;
  isRequiredMsg: string;
  required: (this: stampit.Stamp<Requirable>, msg?: string) => stampit.Stamp<any>;
}

const requirable: stampit.Stamp<Requirable> = stampit()
  .props({
    isRequired: false,
    isRequiredMsg: '',
  })
  // .methods({
  //   required
  // });
  .methods({
    required(this: Requirable, msg = ''): stampit.Stamp<any> {
      this.isRequired = true;
      this.isRequiredMsg = msg;
      return this;
    }
  });

export default requirable;

// function required(this:  stampit.Stamp<Requirable>, msg = ''): stampit.Stamp<any> {
//   this.isRequired = true;
//   this.isRequiredMsg = msg;
//   return this;
// }
