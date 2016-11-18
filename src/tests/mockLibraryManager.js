function getMockLibraryManager() {
  return {
    calledMethods: [],
    previouslyCalledMethod(m){
      if (!this.calledMethods.includes(m)) {
        this.calledMethods.push(m);
      }
    },
    setLibraryHandler(){
      this.previouslyCalledMethod('setLibraryHandler');
    },
    search(){
      this.previouslyCalledMethod('search');
    },
    create(){
      this.previouslyCalledMethod('create');
    },
    delete(){
      this.previouslyCalledMethod('delete');
    },
    getAttr(attr){
      this.previouslyCalledMethod('getAttr');
      return {
        "id": 0,
        "email": "abc@yahoo.sample.com",
        "name": "Mock 1",
        "public": true,
        "paradigms": [],
        "programminglanguages": [],
        "havings": []
      }[attr];
    },
    addPL(){
      this.previouslyCalledMethod('addPL')
    },
    editPL(){
      this.previouslyCalledMethod('editPL')
    },
    getPL(){
      this.previouslyCalledMethod('getPL')
    },
    deletePL(){
      this.previouslyCalledMethod('deletePL')
    },
    getRelatedPDs(){
      this.previouslyCalledMethod('getRelatedPDs')
    },
    getPDID(){
      this.previouslyCalledMethod('getPDID')
    },
    addPD(){
      this.previouslyCalledMethod('addPD')
    },
    editPD(){
      this.previouslyCalledMethod('editPD')
    },
    getPD(){
      this.previouslyCalledMethod('getPD')
    },
    deletePD(){
      this.previouslyCalledMethod('deletePD')
    },
    libraryIsAvailable: true
  };
}

export {getMockLibraryManager};