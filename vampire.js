class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let vampire = this;
    while (vampire.creator) {
      count ++;
      vampire = vampire.creator;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    //if this vampire and input vampire are the same
    if (this.name === vampire.name) {
      return this;
    }
    //if one of the vampires is already the root node
    if (this.creator === null || vampire.creator === null) {
      return this.creator ? vampire : this;
    }
    //if this vampire and input vampire are from the same generation
    if (this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal) {
      let thisCreator = this.creator;
      let inputVampireCreator = vampire.creator;
      while (thisCreator.name !== inputVampireCreator.name) {
        thisCreator = thisCreator.creator;
        inputVampireCreator = inputVampireCreator.creator;
      }
      return thisCreator;
    }
    //if this vampire is more senior than input vampire, check if this vampire is the common ancestor.
    if (this.isMoreSeniorThan(vampire)) {
      let x = vampire.creator;
      while (x) {
        if (x.name === this.name) {
          return this;
        }
        x = x.creator;
      }
    }
    // if input vampire is more senior than this vampire, check if input vampire is the common ancestor.
    if (vampire.isMoreSeniorThan(this)) {
      let x = this.creator;
      while (x) {
        if (x.name === vampire.name) {
          return vampire;
        }
        x = x.creator;
      }
    }
    //if this vampire is more senior than input vampire, and this vampire is NOT the common ancestor.
    if (this.isMoreSeniorThan(vampire)) {
      let a = vampire;
      while (a.numberOfVampiresFromOriginal !== this.numberOfVampiresFromOriginal) {
        a = a.creator;
      }
      let thisCreator = this.creator;
      while (a.creator.name !== thisCreator.name) {
        a = a.creator;
        thisCreator = thisCreator.creator;
      }
      return thisCreator;
    }
    //if input vampire is more senior than this vampire, and input vampire is NOT the common ancestor.
    if (vampire.isMoreSeniorThan(this)) {
      let x = this;
      while (x.numberOfVampiresFromOriginal !== vampire.numberOfVampiresFromOriginal) {
        x = x.creator;
      }
      let z = vampire;
      while (x.creator.name !== z.creator.name) {
        x = x.creator;
        z = z.creator;
      }
      return z.creator;
    }
  }
}

module.exports = Vampire;

